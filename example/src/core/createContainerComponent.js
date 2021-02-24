import React from "react";
import { initContainer } from './containerMethods';
import { LifeCycleEvents } from './LifeCycleEvents';

export class ContainerComponent extends React.Component {
  constructor(props, context, config) {
    super(props, context);
    initContainer(this, config, props);
  }

  componentDidMount() {
    this.getEventEmitter().callMethodInAllBehaviours(
      LifeCycleEvents.COMPONENT_DID_MOUNT, this.behaviourList,
    );
  }

  componentDidUpdate(...args) {
    this.getEventEmitter().callMethodInAllBehaviours(
      LifeCycleEvents.COMPONENT_DID_UPDATE, this.behaviourList, args,
    );
  }

  componentWillUnmount() {
    this.getEventEmitter().callMethodInAllBehaviours(
      LifeCycleEvents.BEHAVIOUR_WILL_REMOVED, this.behaviourList,
    );
    this.getEventEmitter().callMethodInAllBehaviours(
      LifeCycleEvents.COMPONENT_WILL_UNMOUNT, this.behaviourList,
    );
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
