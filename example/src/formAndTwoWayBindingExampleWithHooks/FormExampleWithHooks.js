import React from "react";
import ModelBinding from "../formAndTwoWayBindingExample/behaviours/ModelBinding";
import FormExampleBehaviourForHooks from "./behaviours/FormExampleBehaviourForHooks";
import { useBehaviours } from '../core/useBehaviours';
import { formContentRender } from './formContentRender';

const FormContentWithHooks = (props) => {
  const renderData = useBehaviours({
      behaviours: [
        {
          behaviour: ModelBinding,
          initData: {
            model: { firstName: '', lastName: '', confirm: true },
          },
        },
        { behaviour: FormExampleBehaviourForHooks },
      ],
    },
    props,
  );
  return formContentRender(renderData);
};

const FormExampleWithHooks = () => (
  <>
    <h3>Form and two way binding example</h3>
    <FormContentWithHooks />
  </>
);

export default FormExampleWithHooks;
