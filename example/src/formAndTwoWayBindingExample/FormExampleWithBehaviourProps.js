import React from "react";
import createContainerComponent from "../core/createContainerComponent";
import ModelBinding from "./behaviours/ModelBinding";
import { formContentRender } from "./FormExample";
import FormExampleBehaviour from "./behaviours/FormExampleBehaviour";

/** Example of next features:
 * two way binding;
 * separated behaviour props (see ownProps in BaseBehaviour);
 * common render function for two components.
 */

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
