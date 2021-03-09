import React from "react";
import { LifeCycleEvents } from '../LifeCycleEvents';
import { ContainerForClassComponent } from './ContainerForClassComponent';

class ComponentWithContainer extends React.Component {
  _container;

  constructor(props, context, config) {
    super(props, context);
    this._container = new ContainerForClassComponent();
    this._container.init(config, props, this);
  }

  componentDidMount() {
    this._container.eventEmitter.callMethodInAllBehaviours(
      LifeCycleEvents.COMPONENT_DID_MOUNT,
    );
  }

  componentDidUpdate(...args) {
    this._container.eventEmitter.callMethodInAllBehaviours(
      LifeCycleEvents.COMPONENT_DID_UPDATE, args,
    );
  }

  componentWillUnmount() {
    this._container.eventEmitter.callMethodInAllBehaviours(
      LifeCycleEvents.BEHAVIOUR_WILL_REMOVED,
    );
    this._container.eventEmitter.callMethodInAllBehaviours(
      LifeCycleEvents.COMPONENT_WILL_UNMOUNT,
    );
  }

  render() {
    return this._container.render();
  }
}

// For reduce lines of code (without writing an excess constructor code)
export const createComponentWithContainer = (componentName, config) => {
  return class extends ComponentWithContainer {
    constructor(props, context) {
      super(props, context, config);
    }
    static displayName = componentName;
  };
};
