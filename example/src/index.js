import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './styles.css';

import MultipleLogicEntitiesExample
  from './multipleLogicEntitiesExample/MultipleLogicEntitiesExample';
import CounterExample from './counterExample/CounterExample';
import FormExample from './formAndTwoWayBindingExample/FormExample';
import FormExampleWithBehaviourProps
  from './formAndTwoWayBindingExample/FormExampleWithBehaviourProps';

import MultipleLogicEntitiesExampleWithHooks
  from './multipleLogicEntitiesExampleWithHooks/MultipleLogicEntitiesExampleWithHooks';
import CounterExampleWithHooks
  from './counterExample/CounterExampleWithHooks';
import FormExampleWithHooks
  from './formAndTwoWayBindingExampleWithHooks/FormExampleWithHooks';
import FormExampleWithBehaviourPropsAndWithHooks
  from './formAndTwoWayBindingExampleWithHooks/FormExampleWithBehaviourPropsAndWithHooks';
import LifeCycleExampleWithHooks
  from './LifeCycleExampleWithHooks/LifeCycleExampleWithHooks';

// todo add object-behaviour - only with all life-cycle methods with logs, and  with hooks in render
const App = () => {
  const [visible, setVisible] = useState(true);
  return (
    <div className="grid">
      <div className="column-header" />
      <div className="column-header">
        Show hooks examples: <br />
        <input type="checkbox" checked={visible} onChange={() => {
          setVisible(!visible)
        }} />
      </div>

      <div>
        <MultipleLogicEntitiesExample />
        <hr />
        <CounterExample />
        <hr />
        <FormExample />
        <hr />
        <FormExampleWithBehaviourProps />
      </div>

      <div>
        {visible && <>
          <LifeCycleExampleWithHooks />
          <MultipleLogicEntitiesExampleWithHooks />
          <hr />
          <CounterExampleWithHooks />
          <hr />
          <FormExampleWithHooks />
          <hr />
          <FormExampleWithBehaviourPropsAndWithHooks />
        </>}
      </div>

    </div>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
