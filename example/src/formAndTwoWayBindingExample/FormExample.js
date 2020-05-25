import React from "react";
import createContainerComponent from "../core/createContainerComponent";
import ModelBinding from "./behaviours/ModelBinding";
import Checkbox from "./Checkbox";
import FormExampleBehaviour from "./behaviours/FormExampleBehaviour";

const formContentRender = ({
                             firstName,
                             lastName,
                             confirm,
                             bindModel,
                             handleSubmit,
                             formData
                           }) => {
  return (
    <form onSubmit={handleSubmit} ref="form">
      <label>
        {`First Name (value = ${firstName}) `}
        <br />
        <input type="text" {...bindModel.firstName} />
        {/* "bindModel.firstName" return an object { value, name, onChange} */}
        {/* using multiple onChange handlers: */}
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

const FormContent = createContainerComponent("FormContent", {
  behaviours: [
    {
      behaviour: ModelBinding,
      initData: {
        model: { firstName: "", lastName: "", confirm: true }
      },
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
export { formContentRender };
