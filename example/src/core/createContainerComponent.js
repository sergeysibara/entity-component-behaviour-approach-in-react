import React from "react";
import { mapToMixedRenderData } from "./mapToRenderDataStrategies";

const LifeCycle = {
  COMPONENT_DID_INITIALIZED: "componentDidInitialized",
  COMPONENT_WILL_RENDER: "componentWillRender",
  COMPONENT_DID_MOUNT: "componentDidMount",
  BEHAVIOUR_DID_UPDATE: "componentDidUpdate",
  COMPONENT_WILL_UNMOUNT: "componentWillUnmount",
  BEHAVIOUR_WILL_REMOVED: "behaviourWillRemoved"

  // unused in the examples:
  // static getDerivedStateFromProps()
  // shouldComponentUpdate()
  // getSnapshotBeforeUpdate()
  // static getDerivedStateFromError()
  // componentDidCatch()
};

export class ContainerComponent extends React.Component {
  // List with all behaviours of component
  behaviourList = [];

  // Object with all behaviours of component. For simplify access to behaviour by name
  behs = {};

  // Object with pairs: [behaviourName]: beParamsObject
  behsParams = {};

  constructor(props, context, config) {
    super(props, context);
    this.config = config;
    const behParams = props.defaultBehaviours || config.behaviours || [];

    // create behaviours
    behParams.forEach(item => {
      this.addBehaviour(item.behaviour, props, item.initData, item.wrapRenderData);
    });

    this.callMethodInAllBehaviours(LifeCycle.COMPONENT_DID_INITIALIZED, [
      this.props
    ]);
  }

  addBehaviour(behaviour, props, initData, wrapRenderData) {
    const newBeh = new behaviour();
    newBeh.init(this, props, initData);
    this.behaviourList.push(newBeh);
    this.behs[newBeh.name] = newBeh;
    this.behsParams[newBeh.name] = { wrapRenderData };
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
      delete this.behsParams[behaviourInstance.name];
    } else {
      console.warn(
        `removeBehaviour error: ${behaviourInstance.name} not found`
      );
    }
  }

  getBehaviourRenderData = (behaviour) => {
    const renderData = behaviour.mapToRenderData();

    // wrapRenderData can be used for formatting data before passing in component
    const wrapRenderData = this.behsParams[behaviour.name].wrapRenderData;
    if (wrapRenderData) {
      return wrapRenderData(renderData);
    }
    return renderData;
  };

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
