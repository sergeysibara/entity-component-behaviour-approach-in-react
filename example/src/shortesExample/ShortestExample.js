import React from "react";
import createContainerComponent from "../core/createContainerComponent";
import BaseBehaviour from "../core/BaseBehaviour";

export default createContainerComponent("CounterShortestBehaviour", {
  behaviours: [
    { behaviour: BaseBehaviour,
      defaultStateConfig: [{ count: 0, setCount: null}],
    }],
  render: ({ count, setCount }) => (
    <>
      <h3>Shortest Example</h3>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </>
  )
});
