import BaseBehaviour from "../../core/BaseBehaviour";
import { createRef } from 'react';

export default class FormExampleBehaviour extends BaseBehaviour {
  passedToRender = {
    formRef: createRef(),
    handleSubmit: e => {
      e.preventDefault();
      const form = this.passedToRender.formRef.current; // or can get form state: this.container.behs.modelBinding.state
      const formData = new FormData(form);
      const formDataString = JSON.stringify(Object.fromEntries(formData));
      this.setState({ formData: formDataString });
    }
  };
}
