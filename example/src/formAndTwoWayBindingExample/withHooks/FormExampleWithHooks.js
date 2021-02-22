import React from "react";
import ModelBinding from "../behaviours/ModelBinding";
import Checkbox from "./CheckboxWithHooks";
import FormExampleBehaviourForHooks from "./FormExampleBehaviourForHooks";
import { useBehaviours } from '../../core/useBehaviours';

/** Example of next features:
 * two way binding;
 * using 'wrapRenderData' function in config; (in commented out code)
 */

const formContentRender = ({
                             firstName,
                             lastName,
                             confirm,
                             bindModel,
                             handleSubmit,
                             formData,
                             formRef,
                           }) => {
  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      <label>
        {`First Name (value = ${firstName}) `}
        <br />
        <input type="text" {...bindModel.firstName} />
        {/* "bindModel.firstName" return { value, name, onChange} object */}
        {/* Example of using multiple onChange handlers: */}
        {/* <input {...bind.text} onChange={(e)=>{bind.text.onChange(e); customOnChange(e);} />*/}
      </label>
      <br />
      <br />
      <label>
        {`Last Name (value = ${lastName}) `}
        <br />
        <input type="text" {...bindModel.lastName} />
      </label>
      <br />
      <br />
      <label>
        <Checkbox {...bindModel.confirm} />
        {`Confirm (value = ${confirm}) `}
      </label>
      <br />
      <br />
      <button type="submit">Output form Data</button>
      <p>{formData}</p>
    </form>
  );
};

const FormContentWithHooks = (props) => {
  const renderData = useBehaviours({
      behaviours: [
        {
          behaviour: ModelBinding,
          initData: {
            model: { firstName: '', lastName: '', confirm: true },
          },
          // WrapRenderData can be used for formatting data before passing in
          // component. wrapRenderData: (behRenderData)=>{ return
          // {...behRenderData, test: 123}; }
        },
        { behaviour: FormExampleBehaviourForHooks },
      ],
    },
    props,
  );
  console.log(renderData);
  return formContentRender(renderData);
};

const FormExampleWithHooks = () => (
  <>
    <h3>Form and two way binding example</h3>
    <FormContentWithHooks />
  </>
);

export default FormExampleWithHooks;
export { formContentRender };
