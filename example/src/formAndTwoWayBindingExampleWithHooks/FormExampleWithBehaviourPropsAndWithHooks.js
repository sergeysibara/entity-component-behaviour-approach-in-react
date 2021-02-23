import React from 'react';
import ModelBinding
  from '../formAndTwoWayBindingExample/behaviours/ModelBinding';
import { formContentRender } from './formContentRender';
import FormExampleBehaviour from './behaviours/FormExampleBehaviourForHooks';
import { useBehaviours } from '../core/useBehaviours';

const FormContentWithoutModelWithHooks = (props) => {
  return useBehaviours({
      behaviours: [
        { behaviour: ModelBinding },
        { behaviour: FormExampleBehaviour },
      ],
      render: formContentRender,
    },
    props
  );
};

const FormExampleWithBehaviourPropsWithHooks = () => (
  <>
    <h3>
      Form example with common render function and separated behaviour props )
    </h3>
    <FormContentWithoutModelWithHooks
      bh-modelBinding={{ firstName: '', lastName: '', confirm: true }}
    />
  </>
);

export default FormExampleWithBehaviourPropsWithHooks;
