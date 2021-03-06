import { CheckboxWithHooks } from './CheckboxWithHooks';

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
        <CheckboxWithHooks {...bindModel.confirm} />
        {`Confirm (value = ${confirm}) `}
      </label>
      <br />
      <br />
      <button type="submit">Output form Data</button>
      <p>{formData}</p>
    </form>
  );
};
