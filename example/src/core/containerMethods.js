import { LifeCycleEvents, LifeCycleEventsArray } from './LifeCycleEvents';
import { mapToMixedRenderData } from './mapToRenderDataStrategies';

const addFieldAndMethodsToContainer = (container) => {
  // List with all behaviours of component
  container.behaviourList = [];

  // Object with all behaviours of component. For simplify
  // access to behaviour by name
  container.behs = {};

  // Object with pairs: [behaviourName]: behParamsObject
  container.behsParams = {};

  // For calls optimization:
  // containers for storing life cycle methods of
  // behaviours
  // events[LifeCycleEvent][{id1, method}, {id2, method}];
  // // id - behaviourId, method - concrete method of
  // concrete behaviour
  container.events = LifeCycleEventsArray.reduce((eventDictionary, current) => {
    eventDictionary[ current ] = [];
    return eventDictionary;
  }, {});

  // create container methods
  container.addBehaviour = addBehaviour.bind(null, container);
  container.removeBehaviour = removeBehaviour.bind(null, container);
  container.getBehaviourRenderData = getBehaviourRenderData.bind(null, container);
  container.callMethodInAllBehaviours = callMethodInAllBehaviours.bind(null, container);
  container.render = render.bind(null, container);
};

const addBehaviourMethodsToEventsLists = (events, newBehaviour) => {
  for (const eventName of LifeCycleEventsArray) {
    const behaviourMethod = newBehaviour[ eventName ];
    if (behaviourMethod) {
      events[ eventName ].push({
        id: newBehaviour.name,
        method: behaviourMethod.bind(newBehaviour),
      });
    }
  }
};

const addBehaviour = (container, behaviour, props, initData, behaviourParams = {}) => {
  const newBeh = new behaviour();
  container.behaviourList.push(newBeh);
  container.behs[ newBeh.name ] = newBeh;
  container.behsParams[ newBeh.name ] = behaviourParams;

  // adding behaviour methods to events lists of container
  addBehaviourMethodsToEventsLists(container.events, newBeh);

  newBeh.init(container, props, initData, behaviourParams);

  // call BEHAVIOUR_ADDED
  const behaviourAddedMethod = newBeh[ LifeCycleEvents.BEHAVIOUR_ADDED ];
  if (behaviourAddedMethod) {
    behaviourAddedMethod.call(newBeh);
  }
  return newBeh;
};

const getBehaviourRenderData = (container, behaviour) => {
  const renderData = behaviour.mapToRenderData();
  const wrapRenderData = container.behsParams[ behaviour.name ].wrapRenderData;
  if (wrapRenderData) {
    return wrapRenderData(renderData);
  }
  return renderData;
};

const callMethodInAllBehaviours = (container, methodName, args = []) => {
  const methodsList = container.events[ methodName ];
  methodsList.forEach(idMethodPair => {
    idMethodPair.method(...args);
  });
};

const initContainer = (container, config, props) => {
  addFieldAndMethodsToContainer(container);
  container.config = config;
  container.props = props;

  const defaultBehaviours = props?.defaultBehaviours;
  const allBehParams = defaultBehaviours || container.config.behaviours || [];

  // create behaviours
  allBehParams.forEach(oneBehParams => {
    const { behaviour, name, initData, ...passedBehParams } = oneBehParams;
    container.addBehaviour(behaviour, props, initData, passedBehParams);
  });

  container.callMethodInAllBehaviours(LifeCycleEvents.COMPONENT_INITIALIZED, [
    props,
  ]);
};

const removeBehaviour = (container, behaviourInstance) =>{
  const foundIndex = container.behaviourList.indexOf(behaviourInstance);
  if (foundIndex > -1) {
    const behaviourWillRemoved = behaviourInstance[LifeCycleEvents.BEHAVIOUR_WILL_REMOVED];
    if (behaviourWillRemoved) {
      behaviourWillRemoved.call(behaviourInstance);
    }

    // find behaviour methods in by id
    for (const eventKey in container.events) {
      const containerConcreteEventArray = container.events[ eventKey ];

      const foundIndex = containerConcreteEventArray.findIndex(idMethodPair => idMethodPair.id === behaviourInstance.name);
      if (foundIndex !== -1) {
        // console.log(`remove ${behaviourInstance.name} in ${eventKey} in ${foundIndex}`)
        // console.log(container.events);
       // containerConcreteEventArray.splice(foundIndex, 1);

      }
    }

    container.behaviourList.splice(foundIndex, 1);
    delete container.behs[behaviourInstance.name];
    delete container.behsParams[behaviourInstance.name];

  } else {
    console.warn(
      `removeBehaviour error: ${behaviourInstance.name} not found`
    );
  }
};

const render = (container) => {
  // container.callMethodInAllBehaviours(LifeCycleEvents.COMPONENT_WILL_RENDER, [
  //   container.props,
  // ]);
  const mapToRenderData = container.config.mapToRenderData || mapToMixedRenderData;

  // variant for return function to component
  const renderFunc = container.config.render
    ? container.config.render
    : ({ props }) => props?.children;

  return renderFunc({
    props: container.props,
    ...mapToRenderData(container)
  });

  // variant for returning data to functional component
  // return { ...mapToRenderData(container) };
};

export {
  initContainer,
};
