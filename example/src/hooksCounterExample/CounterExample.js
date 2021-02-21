import React from "react";
import createContainerComponent from "../core/createContainerComponent";
import BaseBehaviour from "../core/BaseBehaviour";
import { useBehaviours } from '../core/useBehaviours';

class CounterBehaviour extends BaseBehaviour {
  defaultState = { count: 0 };
  passedToRender = {
    setCount: value => {
      console.log({ count: value });
      console.log(this.state)
      console.log(this.component)
      this.setState({ count: value });
    }
  };
}

const HooksCounterExample = () => {
  const renderData = useBehaviours({
    behaviours: [{ behaviour: CounterBehaviour }],
  });
  console.log(renderData);
  return(
    <>
      <h3>Counter Example</h3>
      <p>You clicked {renderData.count} times</p>
      <button onClick={() => renderData.setCount(renderData.count + 1)}>Click me</button>
    </>
  )
};

export default HooksCounterExample;
