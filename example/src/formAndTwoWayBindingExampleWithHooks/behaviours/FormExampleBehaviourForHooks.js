import BaseBehaviour from '../../core/BaseBehaviour';
import { useRef } from 'react';

export default class FormExampleBehaviourForHooks extends BaseBehaviour {
  passedToRender = {
    handleSubmit: e => {
      e.preventDefault();
      // short way:
      // const formData = this.container.behs.modelBinding.state;
      // const formDataString = JSON.stringify(formData);

      // example using ref
      const form = this.passedToRender.formRef.current;
      const formData = new FormData(form);
      const formDataString = JSON.stringify(Object.fromEntries(formData));

      this.setState({ formData: formDataString });
    },
    form: null,
  };

  mapToRenderData() {
    this.passedToRender.formRef = useRef(null);
    return super.mapToRenderData()
  }
}
