import BaseBehaviour from "../../core/BaseBehaviour";
import cloneDeep from "lodash/cloneDeep";

export default class ModelBinding extends BaseBehaviour {
  passedToRender = {
    bindModel: {}
  };

  init(container, props, initData, config) {
    super.init(container, props, initData, config);
    const model = cloneDeep(this.ownProps || initData.model);
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
