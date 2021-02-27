import { BaseBehaviour } from "../core/BaseBehaviour";
import { useBehaviours } from '../core/forFunctionalComponent/useBehaviours';

class CounterBehaviour extends BaseBehaviour {
  defaultState = { count: 0 };
  passedToRender = {
    setCount: value => {
      this.setState({ count: value });
    }
  };
}

export const CounterExampleWithHooks = () => {
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
