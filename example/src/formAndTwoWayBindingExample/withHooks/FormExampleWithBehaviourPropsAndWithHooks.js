import React from "react";
import createContainerComponent from "../core/createContainerComponent";
import ModelBinding from "./behaviours/ModelBinding";
import { formContentRender } from "./FormExample";
import FormExampleBehaviour from "./behaviours/FormExampleBehaviour";

/** Example of next features:
 * two way binding;
 * separated behaviour props ('bh-modelBinding'. See ownProps in BaseBehaviour);
 * using a common render function 'formContentRender' for multiple components;
 * using behaviours like vue directives. (in commented out code)
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
      // Example of using behaviours like vue directives (instead 'behaviours' declaration in config object of component):
      // defaultBehaviours={[{behaviour: ModelBinding}, {behaviour: FormExampleBehaviour}]}
    />
  </>
);

export default FormExampleWithBehaviourProps;
