import { LifeCycleEvents, LifeCycleEventsArray } from './LifeCycleEvents';

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
};

const addBehaviourMethodsToEventsLists = (events, newBehaviour) => {
  for (const eventName of LifeCycleEventsArray) {
    const behaviourMethod = newBehaviour[ eventName ];
    if (behaviourMethod) {
      events[ eventName ].push({
        id: newBehaviour,
        method: behaviourMethod.bind(newBehaviour),
      });
    }
  }
};

const addBehaviour = (container, behaviour, props, initData, behaviourParams = {}) => {
  const newBeh = new behaviour();
  newBeh.init(container, props, initData, behaviourParams);

  container.behaviourList.push(newBeh);
  container.behs[ newBeh.name ] = newBeh;
  container.behsParams[ newBeh.name ] = behaviourParams;

  // adding behaviour methods to events lists of container
  addBehaviourMethodsToEventsLists(container.events, newBeh);

  // call BEHAVIOUR_ADDED
  const behaviourAddedMethod = newBeh[ LifeCycleEvents.BEHAVIOUR_ADDED ];
  if (behaviourAddedMethod) {
    behaviourAddedMethod();
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
    container.addBehaviour(oneBehParams.behaviour, props, oneBehParams.initData, passedBehParams);
  });

  callMethodInAllBehaviours(container, LifeCycleEvents.COMPONENT_INITIALIZED, [
    props,
  ]);
};

const removeBehaviour = (container, behaviourInstance) =>{
  const foundIndex = container.behaviourList.indexOf(behaviourInstance);
  if (foundIndex > -1) {
    const behaviourWillRemoved = behaviourInstance[LifeCycleEvents.BEHAVIOUR_WILL_REMOVED];
    if (behaviourWillRemoved) {
      behaviourWillRemoved();
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

export {
  addFieldAndMethodsToContainer,
  addBehaviourMethodsToEventsLists,
  initContainer,
  getBehaviourRenderData,
  addBehaviour,
  callMethodInAllBehaviours,
  removeBehaviour,
};
