import { createComponentWithContainer } from "../core/forClassComponent/createComponentWithContainer";
import { BaseBehaviour } from "../core/BaseBehaviour";

export class CheckboxAdapterToModelBinding extends BaseBehaviour {
  init(container, props, initData) {
    super.init(container, props, initData);

    this.defaultState = { value: props?.value || false};
    this.passedToRender = {
      onChange: e => {
        this.setState({ value: e.target.checked });
        props?.onChange?.(e, e.target.checked); // pass additional parameter for using with ModelBindingBehaviour
      }
    };
  }
}

export const Checkbox = createComponentWithContainer("Checkbox", {
  behaviours: [{ behaviour: CheckboxAdapterToModelBinding }],
  render: ({ props, value, onChange }) => (
    <input {...props} type="checkbox" checked={value} onChange={onChange} />
  )
});
