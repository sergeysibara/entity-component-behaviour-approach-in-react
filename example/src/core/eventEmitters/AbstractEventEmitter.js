export class AbstractEventEmitter {
  _behaviourArray;

  init(behaviourArray) {
    this._behaviourArray = behaviourArray;
  }

  callMethodInAllBehaviours(methodName, args = []) {
    console.error('Not implemented');
  }

  callMethodInBehaviour(methodName, behaviourInstance, args = []) {
    const behaviourMethod = behaviourInstance[ methodName ];
    if (behaviourMethod) {
      behaviourMethod.apply(behaviourInstance, args);
    }
  }

  // Methods only for event emitters that stored subscribers.
  addBehaviourMethodsToEventsLists() {

  }

  removeBehaviourMethodsFromEmitter() {

  }
}
