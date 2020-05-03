import React from "react";
import { mapToMixedRenderData } from "./mapToRenderDataStrategies";

const LifeCycle = {
  COMPONENT_DID_INITIALIZED: "componentDidInitialized",
  COMPONENT_WILL_RENDER: "componentWillRender",
  COMPONENT_DID_MOUNT: "componentDidMount",
  BEHAVIOUR_DID_UPDATE: "componentDidUpdate",
  COMPONENT_WILL_UNMOUNT: "componentWillUnmount",
  BEHAVIOUR_WILL_REMOVED: "behaviourWillRemoved"
};

export class ContainerComponent extends React.Component {
  behaviourList = [];

  // Object with all behaviours of component. For simplify access to behaviour by name
  behs = {};

  constructor(props, context, config) {
    super(props, context);
    this.config = config;
    const behParams = props.defaultBehaviours || config.behaviours || [];

    // create behaviours
    behParams.forEach(item => {
      this.addBehaviour(item.behaviour, props, item.initData);
    });

    this.callMethodInAllBehaviours(LifeCycle.COMPONENT_DID_INITIALIZED, [
      this.props
    ]);
  }

  addBehaviour(behaviour, props, initData) {
    const newBeh = new behaviour();
    newBeh.init(this, props, initData);
    this.behaviourList.push(newBeh);
    this.behs[newBeh.name] = newBeh;
    if (newBeh.behaviourAdded) {
      newBeh.behaviourAdded();
    }
    return newBeh;
  }

  removeBehaviour(behaviourInstance) {
    const foundIndex = this.behaviourList.indexOf(behaviourInstance);
    if (foundIndex > -1) {
      if (behaviourInstance.behaviourWillRemoved) {
        behaviourInstance.behaviourWillRemoved();
      }
      this.behaviourList.splice(foundIndex, 1);
      delete this.behs[behaviourInstance.name];
    } else {
      console.warn(
        `removeBehaviour error: ${behaviourInstance.name} not found`
      );
    }
  }

  callMethodInAllBehaviours(funcName, args = []) {
    this.behaviourList.forEach(beh => {
      if (beh[funcName]) {
        beh[funcName](...args);
      }
    });
  }

  componentDidMount() {
    this.callMethodInAllBehaviours(LifeCycle.COMPONENT_DID_MOUNT);
  }

  componentDidUpdate(...args) {
    this.callMethodInAllBehaviours(LifeCycle.BEHAVIOUR_DID_UPDATE, args);
  }

  componentWillUnmount() {
    this.callMethodInAllBehaviours(LifeCycle.BEHAVIOUR_WILL_REMOVED);
    this.callMethodInAllBehaviours(LifeCycle.COMPONENT_WILL_UNMOUNT);
  }

  render() {
    this.callMethodInAllBehaviours(LifeCycle.COMPONENT_WILL_RENDER, [
      this.props
    ]);
    const mapToRenderData = this.config.mapToRenderData || mapToMixedRenderData;

    const renderFunc = this.config.render
      ? this.config.render
      : ({ props }) => props.children;

    return renderFunc({
      props: this.props,
      ...mapToRenderData(this)
    });
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
