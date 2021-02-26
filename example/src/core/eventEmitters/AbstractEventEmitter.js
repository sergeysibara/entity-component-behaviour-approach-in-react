export class AbstractEventEmitter {
  _container;

  get container() {
    return this._container;
  }

  constructor(container) {
    this._container = container;
  }

  callMethodInAllBehaviours = (methodName, args = []) => {
    console.error('Not implemented');
  };

  callMethodInBehaviour = (methodName, behaviourInstance, args = []) => {
    const behaviourMethod = behaviourInstance[ methodName ];
    if (behaviourMethod) {
      behaviourMethod.apply(behaviourInstance, args);
    }
  };

  // Methods only for event emitters that stored subscribers.
  addBehaviourMethodsToEventsLists = () => {

  };

  removeBehaviourMethodsFromEmitter = () => {

  };
}
