import { useBehaviours } from "../../core/useBehaviours";
import { CheckboxAdapterToModelBinding } from '../Checkbox';

const CheckboxWithHooks = (props) => {
  const renderData = useBehaviours({
      behaviours: [{ behaviour: CheckboxAdapterToModelBinding }],
    },
    props,
  );
  console.log(renderData);
  return (
    <>
      <input {...props} type="checkbox" checked={renderData.value}
             onChange={renderData.onChange} />
    </>
  )
};

export default CheckboxWithHooks;
