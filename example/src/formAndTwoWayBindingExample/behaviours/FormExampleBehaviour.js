import BaseBehaviour from "../../core/BaseBehaviour";

export default class FormExampleBehaviour extends BaseBehaviour {
  passedToRender = {
    handleSubmit: e => {
      e.preventDefault();
      const form = this.component.refs.form; // or can get form state: this.component.behs.modelBinding.state
      const formData = new FormData(form);
      const formDataString = JSON.stringify(Object.fromEntries(formData));
      this.setState({ formData: formDataString });
    }
  };
}
