import React from "react";
import ReactDOM from "react-dom";
import MultipleLogicEntitiesExample from "./multipleLogicEntitiesExample/MultipleLogicEntitiesExample";
import CounterExample from "./counterExample/CounterExample";
import createContainerComponent from "./core/createContainerComponent";
import FormExample from "./formAndTwoWayBindingExample/FormExample";
import FormExampleWithBehaviourProps from "./formAndTwoWayBindingExample/FormExampleWithBehaviourProps";

const App = createContainerComponent("App", {
  render: () => (
    <>
      <MultipleLogicEntitiesExample />
      <hr />
      <CounterExample />
      <hr />
      <FormExample />
      <hr />
      <FormExampleWithBehaviourProps />
    </>
  )
});

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);