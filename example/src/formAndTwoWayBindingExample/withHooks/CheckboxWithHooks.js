import { useBehaviours } from "../../core/useBehaviours";
import { CheckboxAdapterToModelBinding } from '../Checkbox';

// export default createContainerComponent("CheckboxWithHooks", {
//   behaviours: [{ behaviour: CheckboxAdapterToModelBinding }],
//   render: ({ props, value, onChange }) => (
//     <input {...props} type="checkbox" checked={value} onChange={onChange} />
//   )
// });

const CheckboxWithHooks = (props) => {
  const renderData = useBehaviours({
    behaviours: [{ behaviour: CheckboxAdapterToModelBinding }],
    props
  });
  console.log(renderData);
  return(
    <>
      <input {...props} type="checkbox" checked={renderData.value} onChange={renderData.onChange} />
    </>
  )
};

export default CheckboxWithHooks;
