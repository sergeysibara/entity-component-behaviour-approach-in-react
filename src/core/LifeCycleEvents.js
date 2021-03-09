// repository For enums used google style guide -
// https://google.github.io/styleguide/jsguide.html#naming-enum-names
export const LifeCycleEvents = {
  BEHAVIOUR_ADDED: 'behaviourAdded',
  COMPONENT_INITIALIZED: 'componentInitialized',

  COMPONENT_DID_MOUNT: 'componentDidMount',

  // Always call at begin of render function. In
  // componentWillRender can use any hooks.
  //COMPONENT_WILL_RENDER: 'componentWillRender',

  // For class component and for call synchronously in useLayoutEffect for
  // functional components
  COMPONENT_DID_UPDATE: 'componentDidUpdate',

  // Only for functional components for call asynchronously in useEffect.
  // It is preferable for functional components.
  COMPONENT_DID_UPDATE_EFFECT: 'componentDidUpdateEffect',

  BEHAVIOUR_WILL_REMOVED: 'behaviourWillRemoved',
  COMPONENT_WILL_UNMOUNT: 'componentWillUnmount',

  // unused in the examples:
  // static getDerivedStateFromProps()
  // shouldComponentUpdate()
  // getSnapshotBeforeUpdate()
  // static getDerivedStateFromError()
  // componentDidCatch()
};
