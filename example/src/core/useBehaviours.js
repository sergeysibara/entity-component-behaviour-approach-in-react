import {
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
} from 'react';
import { mapToMixedRenderData } from './mapToRenderDataStrategies';


// не делать render отдельно для хуков, т.к. чтобы код былл
// одинаков как в случае простых компонентов, где только
// JSX, так и в случае сложных

// NOT RENAME standard class methods!!!
// names of events for effect hooks check in react
// repository For enums used google style guide -
// https://google.github.io/styleguide/jsguide.html#naming-enum-names
const LifeCycleEvents = {
  BEHAVIOUR_ADDED: 'behaviourAdded', // old - behaviourAdded
  COMPONENT_INITIALIZED: 'componentInitialized', // old -
                                                 // componentDidInitialized
  COMPONENT_DID_MOUNT: 'componentDidMount',

  // Always call at begin of render function. In
  // componentWillRender can use any hooks.
  //COMPONENT_WILL_RENDER: 'componentWillRender',
  COMPONENT_DID_UPDATE: 'componentDidUpdate',

  COMPONENT_WILL_UNMOUNT: 'componentWillUnmount',
  BEHAVIOUR_WILL_REMOVED: 'behaviourWillRemoved',

  // unused in the examples:
  // static getDerivedStateFromProps()
  // shouldComponentUpdate()
  // getSnapshotBeforeUpdate()
  // static getDerivedStateFromError()
  // componentDidCatch()
};

const LifeCycleEventsArray = [];
for (const eventKey in LifeCycleEvents) {
  LifeCycleEventsArray.push(LifeCycleEvents[ eventKey ])
}

const addFieldAndMethodsToContainer = (container) => {
  // List with all behaviours of component
  container.behaviourList = [];

  // Object with all behaviours of component. For simplify
  // access to behaviour by name
  container.behs = {};

  // Object with pairs: [behaviourName]: behParamsObject
  container.behsParams = {};

  // For calls optimization:
  // containers for storing life cycle methods of
  // behaviours
  // events[LifeCycleEvent][{id1, method}, {id2, method}];
  // // id - behaviourId, method - concrete method of
  // concrete behaviour
  container.events = {
    [ LifeCycleEvents.BEHAVIOUR_ADDED ]: [],
    [ LifeCycleEvents.COMPONENT_INITIALIZED ]: [],
    [ LifeCycleEvents.COMPONENT_DID_MOUNT ]: [],

    // [ LifeCycleEvents.COMPONENT_WILL_RENDER ]: [],
    [ LifeCycleEvents.COMPONENT_DID_UPDATE ]: [],

    [ LifeCycleEvents.COMPONENT_WILL_UNMOUNT ]: [],
    [ LifeCycleEvents.BEHAVIOUR_WILL_REMOVED ]: [],
  };

  // create container methods
  container.addBehaviour = addBehaviour.bind(null, container);
  container.getBehaviourRenderData = getBehaviourRenderData.bind(null, container);
  container.callMethodInAllBehaviours = callMethodInAllBehaviours.bind(null, container);
};

const addBehaviourMethodsToEventsLists = (events, newBehaviour) => {
  for (const eventName of LifeCycleEventsArray) {
    const behaviourMethod = newBehaviour[ eventName ];
    if (behaviourMethod) {
      events[ eventName ].push({
        id: newBehaviour,
        method: behaviourMethod.bind(newBehaviour),
      });
    }
  }
};

const addBehaviour = (container, behaviour, props, initData, behaviourParams = {}) => {
  const newBeh = new behaviour();
  newBeh.init(container, props, initData, behaviourParams);

  container.behaviourList.push(newBeh);
  container.behs[ newBeh.name ] = newBeh;
  container.behsParams[ newBeh.name ] = behaviourParams;

  // adding behaviour methods to events lists of container
  addBehaviourMethodsToEventsLists(container.events, newBeh);

  // call BEHAVIOUR_ADDED
  const behaviourAddedMethod = newBeh[ LifeCycleEvents.BEHAVIOUR_ADDED ];
  if (behaviourAddedMethod) {
    behaviourAddedMethod();
  }
  return newBeh;
};

const getBehaviourRenderData = (container, behaviour) => {
  const renderData = behaviour.mapToRenderData();
  const wrapRenderData = container.behsParams[ behaviour.name ].wrapRenderData;
  if (wrapRenderData) {
    return wrapRenderData(renderData);
  }
  return renderData;
};

const callMethodInAllBehaviours = (container, methodName, args = []) => {
  const methodsList = container.events[ methodName ];
  methodsList.forEach(idMethodPair => {
    idMethodPair.method(...args);
  });
};

const initContainer = (container, config, props) => {
  addFieldAndMethodsToContainer(container);
  container.config = config;
  container.props = props;

  const defaultBehaviours = props?.defaultBehaviours;
  const allBehParams = defaultBehaviours || container.config.behaviours || [];

  // create behaviours
  allBehParams.forEach(oneBehParams => {
    const { behaviour, name, initData, ...passedBehParams } = oneBehParams;
    container.addBehaviour(oneBehParams.behaviour, props, oneBehParams.initData, passedBehParams);
  });

  callMethodInAllBehaviours(container, LifeCycleEvents.COMPONENT_INITIALIZED, [
    props,
  ]);
};


const onRender = (container) => {
  // container.callMethodInAllBehaviours(LifeCycleEvents.COMPONENT_WILL_RENDER, [
  //   container.props,
  // ]);
  const mapToRenderData = container.config.mapToRenderData || mapToMixedRenderData;

  return { ...mapToRenderData(container) };
  // const renderFunc = container.config.render
  //   ? container.config.render
  //   : ({ props }) => props?.children;
  //
  // return renderFunc({
  //   props: container.props,
  //   ...mapToRenderData(container)
  // });
};

const defaultConfig = {
  behaviours: [],
  useState: true,
  useLayoutEffect: true,
};

function useBehaviours(config, props) {
  const ref = useRef();
  let state, setState;
console.log(props)
  // get exist or create initialConfig
  const initialConfig = ref.current
    ? ref.current.config
    : { ...defaultConfig, ...config };

  //create shared state
  if (initialConfig.useState === true) {
    [state, setState] = useState({});
  }

  if (!ref.current) {
    ref.current = {};
    ref.current.state = state;
    ref.current.setState = setState;
    initContainer(ref.current, initialConfig, props);
  } else {
    ref.current.state = state;
  }

  const container = ref.current;
  container.props = props;

  // call hooks
  if (initialConfig.useLayoutEffect === true) {
    useLayoutEffect(() => {
      console.log('useLayoutEffect on mount');
      return () => {
        console.log('useLayoutEffect on unMount');
      }
    }, []);
    //useLayoutEffectAfterEveryRenderEnd
    useLayoutEffect(() => {
      console.log('useLayoutEffect didUpdate');
    });
  }

  return onRender(container);
  //   for (const vmConfig of viewModelsConfigs) {
  //     ref.current.vms.push(new
  // vmConfig.vm(vmConfig.initialData)); } } else {
  // ref.current.props = props; }  useEffect( () => () => {
  // if (ref.current && typeof ref.current.clear ===
  // 'function') { ref.current.clear(); } }, [], );
  // //console.log(...ref.current.vms); return
  // ref.current.vms; // return render(props && {},
  // ...ref.current.vms);
}

// // вью-модель - мобиксовый стор
// class MyViewModel {
//   @observable text = '123';
//   constructor(data) {
//     this.text = data.text;
//     makeObservable(this);
//     //console.log('constructor data: ', data);
//   }
//   @action handleClick = (e) => {
//     this.text = this.text + '1';
//     console.log(this.text);
//     // что-то делаем
//   };
//   clear = () => {
//     /* тут можно какую-нибудь очистку,
//         например убиение таймеров */
//   };
// }

// использование мобиксового стора в компоненте
// @ts-ignore
// const MyComponent = observer((props) => {
//   //console.log('render');
//   // @ts-ignore
//   const [myModel] = useViewModelsWithRender(
//     [
//       // @ts-ignore
//       { vm: MyViewModel, initialData: { text: '12345' }
// }, ], // eslint-disable-next-line react/display-name //
// (props, model) => { //   console.log(model); //   return
// <div onClick={model.handleClick}>{model.text}</div>; //
// }, props, );  console.log(myModel); return <div
// onClick={myModel.handleClick}>{myModel.text}</div>; });

export { useBehaviours }

// useMemo, useCallback, useEffect можно запускать и в
// Behaviour, но в специальном методе

