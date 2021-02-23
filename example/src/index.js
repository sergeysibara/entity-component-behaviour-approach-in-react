import React,{ useState }  from 'react';
import ReactDOM from 'react-dom';

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

// TODO: add render function to config and return render function in component
// и проверить, что так не создаются лишние компоненты-функции-обертки
// todo rename component to container in all behaviours
const App = () => {
  const [visible, setVisible] = useState(true);
  return (
    <>
      {/*<MultipleLogicEntitiesExample />*/}
      {/*<hr />*/}
      {/*<CounterExample />*/}
      {/*<hr />*/}
      {/*<FormExample />*/}
      {/*<hr />*/}
      {/*<FormExampleWithBehaviourProps />*/}
      <br/><br/>
      Show hooks examples: <br/>
      <input type="checkbox" checked={visible} onChange={()=>{setVisible(!visible)}} />
      <br/><br/>

      {visible && <MultipleLogicEntitiesExampleWithHooks />}
      {visible && <CounterExampleWithHooks />}
      {visible && <FormExampleWithHooks />}
      {visible && <FormExampleWithBehaviourPropsAndWithHooks />}
    </>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
