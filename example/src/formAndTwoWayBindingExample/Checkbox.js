import React from "react";
import createContainerComponent from "../core/createContainerComponent";
import BaseBehaviour from "../core/BaseBehaviour";

export class CheckboxAdapterToModelBinding extends BaseBehaviour {
  init(component, props, initData) {
    super.init(component, props, initData);

    this.defaultState = { value: props?.value || false};
    this.passedToRender = {
      onChange: e => {
        this.setState({ value: e.target.checked });
        props?.onChange?.(e, e.target.checked); // pass additional parameter for using with ModelBindingBehaviour
      }
    };
  }
}

export default createContainerComponent("Checkbox", {
  behaviours: [{ behaviour: CheckboxAdapterToModelBinding }],
  render: ({ props, value, onChange }) => (
    <input {...props} type="checkbox" checked={value} onChange={onChange} />
  )
});
