import { LifeCycleEvents } from './LifeCycleEvents';
import { mapToMixedRenderData } from './mapToRenderDataStrategies';
import { EventEmitterWithDictionaryOfMethodArrays }
  from './eventEmitters/EventEmitterWithDictionaryOfMethodArrays';
import { SimpleEventEmitter } from './eventEmitters/SimpleEventEmitter';

export class AbstractContainer {
  _eventEmitter;

  _config;

  // Array with all behaviours of component
  behaviourArray = [];

  // Object (dictionary) with all behaviours of container. To simplify
  // access to behaviour by name
  behs = {};

  // Object (dictionary) with pairs: [behaviourName]: behParamsObject
  behsParams = {};

  init(config, props) {
    this._eventEmitter = new SimpleEventEmitter();
    this._eventEmitter.init(this.behaviourArray);
    this._config = config;

    this._createBehaviours(props);
  }

  _createBehaviours(props) {
    const defaultBehaviours = props?.defaultBehaviours;
    const allBehParams = defaultBehaviours || this.config.behaviours || [];

    // create behaviours
    allBehParams.forEach(oneBehParams => {
      const { behaviour, initData, ...passedBehParams } = oneBehParams;
      this.addBehaviour(behaviour, props, initData, passedBehParams);
    });

    this._eventEmitter.callMethodInAllBehaviours(
      LifeCycleEvents.COMPONENT_INITIALIZED,
      [props],
    );
  }

  get eventEmitter() {
    return this._eventEmitter;
  }

  get config() {
    return this._config;
  }

  get state() {
    console.error('container state getter is not implemented');
  }

  get props() {
    console.error('container props getter is not implemented');
  }

  setState(stateOrUpdater){
    console.error('container setState is not implemented');
  }

  addBehaviour(behaviour, props, initData, behaviourParams = {}) {
    const newBeh = new behaviour();
    this.behaviourArray.push(newBeh);

    this.behs[ newBeh.name ] = newBeh;
    this.behsParams[ newBeh.name ] = behaviourParams;

    this._eventEmitter.addBehaviourMethodsToEmitter(newBeh);
    if (newBeh.init) {
      newBeh.init(this, props, initData, behaviourParams);
    }

    this._eventEmitter.callMethodInBehaviour(LifeCycleEvents.BEHAVIOUR_ADDED, newBeh);
    return newBeh;
  }

  removeBehaviour(behaviourInstance) {
    const foundIndex = this.behaviourArray.indexOf(behaviourInstance);
    if (foundIndex > -1) {
      this._eventEmitter.callMethodInBehaviour(LifeCycleEvents.BEHAVIOUR_WILL_REMOVED, behaviourInstance);

      this._eventEmitter.removeBehaviourMethodsFromEmitter(behaviourInstance.name);

      this.behaviourArray.splice(foundIndex, 1);
      delete this.behs[behaviourInstance.name];
      delete this.behsParams[behaviourInstance.name];

    } else {
      console.warn(
        `removeBehaviour error: ${behaviourInstance.name} not found`
      );
    }
  }

  getBehaviourRenderData(behaviour) {
    const renderData = behaviour.mapToRenderData();
    const wrapRenderData = this.behsParams[ behaviour.name ].wrapRenderData;
    if (wrapRenderData) {
      return wrapRenderData(renderData);
    }
    return renderData;
  }

  render() {
    // container._eventEmitter.callMethodInAllBehaviours(
    //   LifeCycleEvents.COMPONENT_WILL_RENDER,
    // [container.props],
    // );

    const mapToRenderData = this.config.mapToRenderData || mapToMixedRenderData;

    // variant for return function to component
    const renderFunc = this.config.render
      ? this.config.render
      : ({ props }) => props?.children;

    return renderFunc({
      props: this.props,
      ...mapToRenderData(this)
    });

    // variant for returning data to functional component
    // return { ...mapToRenderData(container) };
  };
}
