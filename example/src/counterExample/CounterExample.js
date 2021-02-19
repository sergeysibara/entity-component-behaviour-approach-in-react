import React from "react";
import createContainerComponent from "../core/createContainerComponent";
import BaseBehaviour from "../core/BaseBehaviour";

class CounterBehaviour extends BaseBehaviour {
  defaultState = { count: 0 };
  passedToRender = {
    setCount: value => {
      this.setState({ count: value });
    }
  };
}

export default createContainerComponent("CounterExample", {
  behaviours: [{ behaviour: CounterBehaviour }],
  render: ({ count, setCount }) => (
    <>
      <h3>Counter Example</h3>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </>
  )
});
