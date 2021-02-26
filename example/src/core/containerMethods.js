import { LifeCycleEvents } from './LifeCycleEvents';
import { mapToMixedRenderData } from './mapToRenderDataStrategies';
import { EventEmitterWithDictionaryOfMethodArrays }
  from './eventEmitters/EventEmitterWithDictionaryOfMethodArrays';
import { SimpleEventEmitter } from './eventEmitters/SimpleEventEmitter';

const addFieldAndMethodsToContainer = (container) => {
  // List with all behaviours of component
  container.behaviourArray = [];

  // Object with all behaviours of container. For simplify
  // access to behaviour by name
  container.behs = {};

  // Object with pairs: [behaviourName]: behParamsObject
  container.behsParams = {};

  // add methods
  container.addBehaviour = addBehaviour.bind(null, container);
  container.removeBehaviour = removeBehaviour.bind(null, container);
  container.getBehaviourRenderData = getBehaviourRenderData.bind(null, container);
  container.render = render.bind(null, container);
};

const addBehaviour = (container, behaviour, props, initData, behaviourParams = {}) => {
  const newBeh = new behaviour();
  container.behaviourArray.push(newBeh);
  container.behs[ newBeh.name ] = newBeh;
  container.behsParams[ newBeh.name ] = behaviourParams;

  container._eventEmitter.addBehaviourMethodsToEventsLists(newBeh);
  if (newBeh.init) {
    newBeh.init(container, props, initData, behaviourParams);
  }

  container._eventEmitter.emitToOneBehaviour(LifeCycleEvents.BEHAVIOUR_ADDED, newBeh);
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

const initContainer = (container, config, props) => {
  addFieldAndMethodsToContainer(container);
  container._eventEmitter = new SimpleEventEmitter(container);
  container.getEventEmitter = () => (container._eventEmitter);
  container.config = config;
  container.props = props;

  const defaultBehaviours = props?.defaultBehaviours;
  const allBehParams = defaultBehaviours || container.config.behaviours || [];

  // create behaviours
  allBehParams.forEach(oneBehParams => {
    const { behaviour, name, initData, ...passedBehParams } = oneBehParams;
    container.addBehaviour(behaviour, props, initData, passedBehParams);
  });

  container._eventEmitter.callMethodInAllBehaviours(
    LifeCycleEvents.COMPONENT_INITIALIZED,
    container.behaviourArray,
    [props],
  );
};

const removeBehaviour = (container, behaviourInstance) =>{
  const foundIndex = container.behaviourArray.indexOf(behaviourInstance);
  if (foundIndex > -1) {
    const behaviourWillRemoved = behaviourInstance[LifeCycleEvents.BEHAVIOUR_WILL_REMOVED];
    if (behaviourWillRemoved) {
      behaviourWillRemoved.call(behaviourInstance);
    }

    container._eventEmitter.removeEventsOfBehaviour(behaviourInstance.id);

    container.behaviourArray.splice(foundIndex, 1);
    delete container.behs[behaviourInstance.name];
    delete container.behsParams[behaviourInstance.name];

  } else {
    console.warn(
      `removeBehaviour error: ${behaviourInstance.name} not found`
    );
  }
};

const render = (container) => {
  // container._eventEmitter.callMethodInAllBehaviours(
  //   LifeCycleEvents.COMPONENT_WILL_RENDER,
  //   container.behaviourArray,
  // [container.props],
  // );

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
