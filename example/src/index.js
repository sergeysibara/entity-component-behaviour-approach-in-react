import React,{ useState }  from 'react';
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
  from './formAndTwoWayBindingExampleWithHooks/FormExampleWithHooks';


// TODO: add render function to config and return render function in component
// и проверить, что так не создаются лишние компоненты-функции-обертки

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

      {visible && <CounterExampleWithHooks />}
      {visible && <FormExampleWithHooks />}
    </>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
