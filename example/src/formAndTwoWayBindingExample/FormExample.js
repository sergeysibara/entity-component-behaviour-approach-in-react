import React from "react";
import createComponentWithContainer from "../core/forClassComponent/createComponentWithContainer";
import ModelBinding from "./behaviours/ModelBinding";
import FormExampleBehaviour from "./behaviours/FormExampleBehaviour";
import { formContentRender } from './formContentRender';

/** Example of next features:
 * two way binding;
 * using 'wrapRenderData' function in config; (in commented out code)
 */
const FormContent = createComponentWithContainer("FormContent", {
  behaviours: [
    {
      behaviour: ModelBinding,
      initData: {
        model: { firstName: "", lastName: "", confirm: true }
      },
      // WrapRenderData can be used for formatting data before passing in component.
      // wrapRenderData: (behRenderData)=>{
      //   return {...behRenderData, test: 123};
      // }
    },
    { behaviour: FormExampleBehaviour }
  ],
  render: formContentRender
});

const FormExample = () => (
  <>
    <h3>Form and two way binding example</h3>
    <FormContent />
  </>
);

export default FormExample;
