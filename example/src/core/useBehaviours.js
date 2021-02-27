import {
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
} from 'react';
import { LifeCycleEvents } from './LifeCycleEvents';
import { ContainerForFunctionalComponent } from './forFunctionalComponent/ContainerForFunctionalComponent';

const callLifeCycleEvents = (eventEmitter, initialConfig, isFirstRender) => {
  if (initialConfig.useEffect === true) {
    // on mount, unmount
    useEffect(() => {
      eventEmitter.callMethodInAllBehaviours(LifeCycleEvents.COMPONENT_DID_MOUNT);
      return () => {
        eventEmitter.callMethodInAllBehaviours(LifeCycleEvents.BEHAVIOUR_WILL_REMOVED);
        eventEmitter.callMethodInAllBehaviours(LifeCycleEvents.COMPONENT_WILL_UNMOUNT);
      }
    }, []);

    // on update
    useEffect(() => {
      if (!isFirstRender) {
        eventEmitter.callMethodInAllBehaviours(LifeCycleEvents.COMPONENT_DID_UPDATE_EFFECT);
      }
    });
  }

  if (initialConfig.useLayoutEffect === true) {
    // mount, unmount. Only if useEffect not used
    if (initialConfig.useEffect === false) {
      useLayoutEffect(() => {
        eventEmitter.callMethodInAllBehaviours(LifeCycleEvents.COMPONENT_DID_MOUNT);
        return () => {
          eventEmitter.callMethodInAllBehaviours(LifeCycleEvents.BEHAVIOUR_WILL_REMOVED);
          eventEmitter.callMethodInAllBehaviours(LifeCycleEvents.COMPONENT_WILL_UNMOUNT);
        }
      }, []);
    }

    // on update
    useLayoutEffect(() => {
      if (!isFirstRender) {
        eventEmitter.callMethodInAllBehaviours(LifeCycleEvents.COMPONENT_DID_UPDATE);
      }
    });
  }
};

const defaultConfig = {
  behaviours: [],
  useState: true,
  useEffect: true,
  useLayoutEffect: false,
};

function useBehaviours(config, props) {
  const ref = useRef();
  let state, setState;
  let isFirstRender = false;

  // get exist or create initialConfig
  const initialConfig = ref.current
    ? ref.current.config
    : { ...defaultConfig, ...config };

  // create shared state
  if (initialConfig.useState === true) {
    [state, setState] = useState({});
  }


  if (!ref.current) {
    ref.current = new ContainerForFunctionalComponent();
    ref.current.init(initialConfig, props, state, setState);
    isFirstRender = true;
  } else {
    // update state and props in container
    ref.current.state = state;
    ref.current.props = props;
  }
  const container = ref.current;

  callLifeCycleEvents(container.eventEmitter, initialConfig, isFirstRender);
  return container.render();
}

export { useBehaviours }
