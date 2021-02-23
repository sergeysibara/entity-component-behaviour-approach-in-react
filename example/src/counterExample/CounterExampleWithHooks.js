import {useMemo} from "react";
import createContainerComponent from "../core/createContainerComponent";
import BaseBehaviour from "../core/BaseBehaviour";
import { useBehaviours } from '../core/useBehaviours';

class CounterBehaviour extends BaseBehaviour {
  defaultState = { count: 0 };

  passedToRender = {
    setCount: value => {
      this.setState(() => ({
        count: value
      }));
    }
  };

  mapToRenderData() {
    const count = this.state.count;
    const memoizedValues = useMemo(() => {
      return count * 2;
    }, [count]);
    console.log('CounterBehaviour: componentWillRender. memoizedValues=' + memoizedValues);

    return super.mapToRenderData()
  }
}

const CounterExampleWithHooks = () => {
  const renderData = useBehaviours({
    behaviours: [{ behaviour: CounterBehaviour }],
  });

  return(
    <>
      <h3>Counter Example</h3>
      <p>You clicked {renderData.count} times</p>
      <button onClick={() => renderData.setCount(renderData.count + 1)}>Click me</button>
    </>
  )
};

export default CounterExampleWithHooks;
