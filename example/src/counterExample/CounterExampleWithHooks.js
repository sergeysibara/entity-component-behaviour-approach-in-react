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

  componentWillUnmount() {
    console.log('componentWillUnmount')
  }

  mapToRenderData() {
    const count = this.state.count;
    const memoizedValues = useMemo(() => {
      return count * 2;
    }, [count]);
    // console.log('CounterBehaviour: componentWillRender. memoizedValues=' + memoizedValues);

    return super.mapToRenderData()
  }
}

const CounterExampleWithHooks = () => {
  return useBehaviours({
    behaviours: [{ behaviour: CounterBehaviour }],
    render: ({ count, setCount }) => (
      <>
        <h3>Counter Example</h3>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>Click me</button>
      </>
    ),
  });
};

export default CounterExampleWithHooks;
