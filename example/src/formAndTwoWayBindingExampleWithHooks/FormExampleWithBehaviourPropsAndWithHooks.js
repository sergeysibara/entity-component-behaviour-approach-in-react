import { ModelBinding }
  from '../formAndTwoWayBindingExample/behaviours/ModelBinding';
import { formContentRender } from './formContentRender';
import { FormExampleBehaviourForHooks } from './behaviours/FormExampleBehaviourForHooks';
import { useBehaviours } from '../core/forFunctionalComponent/useBehaviours';

const FormContentWithoutModelWithHooks = (props) => {
  return useBehaviours({
      behaviours: [
        { behaviour: ModelBinding },
        { behaviour: FormExampleBehaviourForHooks },
      ],
      render: formContentRender,
    },
    props
  );
};

export const FormExampleWithBehaviourPropsAndWithHooks = () => (
  <>
    <h3>
      Form example with common render function and separated behaviour props )
    </h3>
    <FormContentWithoutModelWithHooks
      bh-modelBinding={{ firstName: '', lastName: '', confirm: true }}
    />
  </>
);
