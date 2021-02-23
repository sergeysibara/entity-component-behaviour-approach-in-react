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
import FormExampleWithHooks
  from './formAndTwoWayBindingExample/withHooks/FormExampleWithHooks';


// TODO: add render function to config and return render function in component
// и проверить, что так не создаются лишние компоненты-функции-обертки

const App = () => {
  return (
    <>
      <CounterExample />
      <CounterExampleWithHooks />
      <FormExampleWithHooks />

      {/*<MultipleLogicEntitiesExample />*/}
      {/*<hr />*/}
      {/*<CounterExample />*/}
      {/*<hr />*/}
      {/*<FormExample />*/}
      {/*<hr />*/}
      {/*<FormExampleWithBehaviourProps />*/}
    </>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
