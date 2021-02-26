export class AbstractEventEmitter {
  _container;

  get container() {
    return this._container;
  }

  constructor(container) {
    this._container = container;
  }

  callMethodInAllBehaviours(methodName, behaviourArray, args = []) {
    console.error('Not implemented');
  }

  emitToOneBehaviour = (event, behaviourInstance, args = []) => {
    const behaviourMethod = behaviourInstance[ event ];
    if (behaviourMethod) {
      behaviourMethod.apply(behaviourInstance, args);
    }
  };

  // Methods only for event emitters that stored events.
  addBehaviourMethodsToEventsLists() {

  }

  removeEventsOfBehaviour() {

  }
}
