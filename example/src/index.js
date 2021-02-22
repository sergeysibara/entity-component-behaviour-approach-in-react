import React from 'react';
import ReactDOM from 'react-dom';
import MultipleLogicEntitiesExample
  from './multipleLogicEntitiesExample/MultipleLogicEntitiesExample';
import CounterExample from './counterExample/CounterExample';
import createContainerComponent from './core/createContainerComponent';
import FormExample from './formAndTwoWayBindingExample/FormExample';
import FormExampleWithBehaviourProps
  from './formAndTwoWayBindingExample/FormExampleWithBehaviourProps';
import CounterExampleWithHooks
  from './counterExample/CounterExampleWithHooks';
import CheckboxWithHooks
  from './formAndTwoWayBindingExample/withHooks/CheckboxWithHooks';
import Checkbox
  from './formAndTwoWayBindingExample/Checkbox';
const App = createContainerComponent('App', {
  render: () => (
    <>
      <CounterExampleWithHooks />
      <CheckboxWithHooks />
      <Checkbox />

      {/*<MultipleLogicEntitiesExample />*/}
      {/*<hr />*/}
      {/*<CounterExample />*/}
      {/*<hr />*/}
      {/*<FormExample />*/}
      {/*<hr />*/}
      {/*<FormExampleWithBehaviourProps />*/}
    </>
  ),
});

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
