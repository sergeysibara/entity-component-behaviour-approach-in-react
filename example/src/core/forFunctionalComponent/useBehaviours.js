import { useRef, useState, useEffect } from 'react';
import { LifeCycleEvents } from '../LifeCycleEvents';
import { ContainerForFunctionalComponent } from './ContainerForFunctionalComponent';

export const useBehaviours = (config = {behaviours: []}, props) =>{
  let isFirstRender = false;
  const ref = useRef();

  // create shared state
  let [state, setState] = useState({});

  // get exist or get new initialConfig
  const initialConfig = ref.current
    ? ref.current.config
    : config;

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
};

const callLifeCycleEvents = (eventEmitter, initialConfig, isFirstRender) => {
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
};
