import { useBehaviours } from "../core/useBehaviours";
import { CheckboxAdapterToModelBinding } from '../formAndTwoWayBindingExample/Checkbox';

const CheckboxWithHooks = (props) => {
  const renderData = useBehaviours({
      behaviours: [{ behaviour: CheckboxAdapterToModelBinding }],
    },
    props,
  );
  return (
    <>
      <input {...props} type="checkbox" checked={renderData.value}
             onChange={renderData.onChange} />
    </>
  )
};

export default CheckboxWithHooks;
