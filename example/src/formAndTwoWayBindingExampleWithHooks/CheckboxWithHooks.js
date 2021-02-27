import { useBehaviours } from "../core/forFunctionalComponent/useBehaviours";
import { CheckboxAdapterToModelBinding } from '../formAndTwoWayBindingExample/Checkbox';

const CheckboxWithHooks = (props) => {
  return useBehaviours({
      behaviours: [{ behaviour: CheckboxAdapterToModelBinding }],
      render: ({ value, onChange }) => (
        <>
          <input {...props} type="checkbox" checked={value}
                 onChange={onChange} />
        </>
      ),
    },
    props,
  );
};

export default CheckboxWithHooks;
