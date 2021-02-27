import React from 'react';
import ModelBinding
  from '../formAndTwoWayBindingExample/behaviours/ModelBinding';
import FormExampleBehaviourForHooks
  from './behaviours/FormExampleBehaviourForHooks';
import { useBehaviours } from '../core/forFunctionalComponent/useBehaviours';
import { formContentRender } from './formContentRender';

const FormContentWithHooks = (props) => {
  return useBehaviours({
      behaviours: [
        {
          behaviour: ModelBinding,
          initData: {
            model: { firstName: '', lastName: '', confirm: true },
          },
        },
        { behaviour: FormExampleBehaviourForHooks },
      ],
      render: formContentRender,
    },
    props,
  );
};

const FormExampleWithHooks = () => (
  <>
    <h3>Form and two way binding example</h3>
    <FormContentWithHooks />
  </>
);

export default FormExampleWithHooks;
