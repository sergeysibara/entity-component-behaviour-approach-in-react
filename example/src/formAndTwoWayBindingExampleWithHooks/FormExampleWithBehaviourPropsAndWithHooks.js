import React from "react";
import createContainerComponent from "../core/createContainerComponent";
import ModelBinding from "../formAndTwoWayBindingExample/behaviours/ModelBinding";
import { formContentRender } from "./formContentRender";
import FormExampleBehaviour from "./behaviours/FormExampleBehaviourForHooks";

const FormContentWithoutModel = createContainerComponent(
  "FormContentWithoutModel",
  {
    behaviours: [
      { behaviour: ModelBinding },
      { behaviour: FormExampleBehaviour }
    ],
    render: formContentRender
  }
);

const FormExampleWithBehaviourProps = () => (
  <>
    <h3>
      Form example with common render function and separated behaviour props )
    </h3>
    <FormContentWithoutModel
      bh-modelBinding={{ firstName: "", lastName: "", confirm: true }}
    />
  </>
);

export default FormExampleWithBehaviourProps;
