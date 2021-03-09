import { createComponentWithContainer } from '../core/forClassComponent/createComponentWithContainer';
import { BaseBehaviour } from '../core/BaseBehaviour';

class CounterBehaviour extends BaseBehaviour {
  defaultState = { count: 0 };
  passedToRender = {
    setCount: value => {
      this.setState({ count: value });
    },
  };
}

export const CounterExample = createComponentWithContainer('CounterExample', {
  behaviours: [{ behaviour: CounterBehaviour }],
  render: ({ count, setCount }) => (
    <>
      <h3>Counter Example</h3>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </>
  ),
});
