import lowerFirst from "lodash/lowerFirst";

export default class BaseBehaviour {
  type = Object.getPrototypeOf(this).constructor.name;
  name = lowerFirst(this.type);
  // id = Symbol(this.type);

  // passedToRender - data and functions that will be passed in mapToRenderData function
  passedToRender = {};

  // instead constructor - for using overrided child fields at initialization
  init(container, props, initData = {}, config) {
    this.container = container;
    if (initData.defaultState) {
      this.defaultState = initData.defaultState;
    }
  }

  get ownProps() {
    const propBehaviourName = `bh-${this.name}`;
    return this.container.props?.[propBehaviourName];
  }

  // Emulation separated states (every behaviour has own state)
  // Current state will be passed into mapToRenderData method.
  get state() {
    const defaultValue = this.defaultState;
    return this.container.state
      ? this.container.state[this.name] || defaultValue
      : defaultValue;
  }

  /**
   * callback - only for class component
   */
  setState(stateOrUpdater, callback) {
    //!(typeof partialState === 'object' || typeof partialState === 'function'
    if (typeof stateOrUpdater === 'function') {
      const updater = stateOrUpdater;
      this.container.setState((prevState) => {
          return {
            ...prevState,
            [ this.name ]: updater(prevState[ this.name ])
          };
        },
        callback);
      return;
    }

    const newPartialState = stateOrUpdater;
    this.container.setState((prevState) => {
      return {
        ...prevState,
        [this.name]: newPartialState
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
