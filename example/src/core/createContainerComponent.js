import React from "react";
import { initContainer } from './containerMethods';
import { LifeCycleEvents } from './LifeCycleEvents';

class Container {
  _component;

  constructor(component) {
    this._component = component;
  }

  get state() {
    return this._component.state;
  }

  get props() {
    return this._component.props;
  }

  setState = (stateOrUpdater) =>{
    this._component.setState(stateOrUpdater);
  }
}

export class ContainerComponent extends React.Component {
  _container;

  constructor(props, context, config) {
    super(props, context);
    this._container = new Container(this);
    //initContainer(this._container, config, props);
  }

  componentDidMount() {
    this._container.getEventEmitter().callMethodInAllBehaviours(
      LifeCycleEvents.COMPONENT_DID_MOUNT, this.behaviourArray,
    );
  }

  componentDidUpdate(...args) {
    this._container.getEventEmitter().callMethodInAllBehaviours(
      LifeCycleEvents.COMPONENT_DID_UPDATE, this.behaviourArray, args,
    );
  }

  componentWillUnmount() {
    this._container.getEventEmitter().callMethodInAllBehaviours(
      LifeCycleEvents.BEHAVIOUR_WILL_REMOVED, this.behaviourArray,
    );
    this._container.getEventEmitter().callMethodInAllBehaviours(
      LifeCycleEvents.COMPONENT_WILL_UNMOUNT, this.behaviourArray,
    );
  }

  render() {
    return this._container.render();
  }
}

// For reduce lines of code (without writing an excess constructor code)
const createContainerComponent = (componentName, config) => {
  return class extends ContainerComponent {
    constructor(props, context) {
      super(props, context, config);
    }
    static displayName = componentName;
  };
};

export default createContainerComponent;
