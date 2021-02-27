import Checkbox from './Checkbox';

export const formContentRender = ({
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
