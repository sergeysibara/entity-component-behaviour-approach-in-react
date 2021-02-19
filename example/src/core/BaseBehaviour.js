import lowerFirst from "lodash/lowerFirst";

export default class BaseBehaviour {
  type = Object.getPrototypeOf(this).constructor.name;
  name = lowerFirst(Object.getPrototypeOf(this).constructor.name);

  // passedToRender - data and functions that will be passed in mapToRenderData function
  passedToRender = {};

  // instead constructor - for using overrided child fields at initialization
  init(component, props, initData = {}, config) {
    this.component = component;
    if (initData.name) {
      this.name = initData.name;
    }

    if (initData.defaultState) {
      this.defaultState = initData.defaultState;
    }
  }

  get ownProps() {
    const propBehaviourName = `bh-${this.name}`;
    return this.component.props[propBehaviourName];
  }

  // Emulation separated states (every behaviour has own state)
  // Current state will be passed into mapToRenderData method.
  get state() {
    const defaultValue = this.defaultState;
    return this.component.state
      ? this.component.state[this.name] || defaultValue
      : defaultValue;
  }

  setState(stateObject) {
    this.component.setState(() => {
      return {
        ...this.component.state,
        [this.name]: stateObject
      };
    });
  }

  // Return data and functions that will be passed in mapToRenderData of component and render functions.
  mapToRenderData() {
    return {
      ...this.state,
      ...this.passedToRender,
    };
  }

  behaviourWillRemoved() {
    this.setState(undefined); // clearing state (it is need due to the state emulation with using component state)
  }
}
