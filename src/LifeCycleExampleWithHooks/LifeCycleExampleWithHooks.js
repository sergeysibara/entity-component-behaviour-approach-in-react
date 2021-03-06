import { useMemo, useState, useCallback } from 'react';
import { useBehaviours } from '../core/forFunctionalComponent/useBehaviours';

function LifeCycleExampleWithHooksBehaviour() {
  return {
    type: 'LifeCycleExampleWithHooksBehaviour',
    name: 'lifeCycleExampleWithHooksBehaviour',

    behaviourAdded() {
      console.log('behaviourAdded')
    },

    componentInitialized() {
      console.log('componentInitialized')
    },

    componentDidMount() {
      console.log('componentDidMount')
    },

    componentDidUpdate() {
      console.log('componentDidUpdate')
    },

    componentDidUpdateEffect() {
      console.log('componentDidUpdateEffect')
    },

    behaviourWillRemoved() {
      console.log('behaviourWillRemoved')
    },

    componentWillUnmount() {
      console.log('componentWillUnmount')
    },

    mapToRenderData() {
      const [count, setCount] = useState(0);
      const setCountCallback = useCallback(() => {

          setCount(count + 1)
      }, [count]);

      const memoizedValue = useMemo(() => {
        return count * 2;
      }, [count]);

      return { memoizedValue, setCountCallback };
    }
  };
}

export const LifeCycleExampleWithHooks = ()=> (
  useBehaviours({
    behaviours: [{ behaviour: LifeCycleExampleWithHooksBehaviour }],
    useLayoutEffect: true,
    useState: false,
    render: ({ memoizedValue, setCountCallback }) => (
      <>
        <h3>Life cycle example with hooks</h3>
        <p>Memoized value: {memoizedValue}</p>
        <button onClick={setCountCallback}>Click me</button>
      </>
    ),
  })
);
