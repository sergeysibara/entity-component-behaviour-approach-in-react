import BaseBehaviour from "../../core/BaseBehaviour";
import otherUtils from "../../utils/otherUtils";

export default class ModelBinding extends BaseBehaviour {
  passedToRender = {
    bindModel: {}
  };

  init(component, props, initData) {
    super.init(component, props, initData);

    const model = otherUtils.deepClone(this.ownProps || initData.model);
    this.defaultState = model;

    Object.entries(model).forEach(([fieldName, value]) => {
      const bindItem = {
        name: fieldName,
        value,
        onChange: (e, value) => {
          // value - used in behaviour-adapters for passing value from checkbox, select into ModelMinding
          this.passedToRender.bindModel[fieldName].value = e.target.value;
          this.setState({
            ...this.state,
            [fieldName]: value === undefined ? e.target.value : value
          });
        }
      };

      this.passedToRender.bindModel[fieldName] = bindItem;
    });
  }
}
