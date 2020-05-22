import lowerFirst from "lodash/lowerFirst";

export default class BaseBehaviour {
  type = Object.getPrototypeOf(this).constructor.name;
  name = lowerFirst(Object.getPrototypeOf(this).constructor.name);

  // passedToRender - data and functions that will be passed in mapToRenderData function
  passedToRender = {};

  //init instead constructor - for using overrided child fields at initialization
  init(component, props, initData = {}) {
    this.component = component;
    if (initData.name) {
      this.name = initData.name;
    }

    if (initData.defaultState) {
      this.defaultState = initData.defaultState;
    }

    this.wrapRenderData = initData.wrapRenderData;
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

  // syntactic sugar like useState from react hooks
  useState(fieldName, setterFieldName, value, sendSetterToRender = false) {
    if (!this.defaultState) {
      this.defaultState = {};
    }
    if (fieldName) {
      this.defaultState[fieldName] = value;
    } else {
      this.defaultState = { ...this.defaultState, ...value };
    }

    const setterParentField = sendSetterToRender ? this.passedToRender : this;
    const setter = newValue => {
      if (fieldName) {
        this.setState({ [fieldName]: newValue });
      } else {
        this.setState({ ...this.state, ...newValue });
      }
    };
    setterParentField[setterFieldName] = setter;
  }

  // Return data and functions that will be passed in mapToRenderData of component and render functions.
  // wrapRenderData can be used for formatting data before passing in component
  mapToRenderData() {
    const renderData = {
      ...this.passedToRender,
      ...this.state
    };

    if (this.wrapRenderData) {
      return this.wrapRenderData(renderData);
    }
    return renderData;
  }

  behaviourWillRemoved() {
    this.setState(undefined); // clean state (it is need due to state emulation with using component state)
  }
}
