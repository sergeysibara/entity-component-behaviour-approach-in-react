export class AbstractEventEmitter {
  callMethodInAllBehaviours(methodName, behaviourList, args = []) {
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
