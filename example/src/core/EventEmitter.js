import { LifeCycleEvents, LifeCycleEventsArray } from './LifeCycleEvents';

class AbstractEventEmitter {
  callMethodInAllBehaviours(funcName, args = []) {
    console.error('Not implemented');
  }

  // only for event emitters that stored events.
  addBehaviourMethodsToEventsLists() {

  }

  emitToOneBehaviour = (event, behaviourInstance) => {
    const behaviourMethod = behaviourInstance[ event ];
    if (behaviourMethod) {
      behaviourMethod.call(behaviourInstance);
    }
  };

}

class SimpleEventEmitter extends AbstractEventEmitter {
  callMethodInAllBehaviours(funcName, args = []) {
    this.behaviourList.forEach(beh => {
      if (beh[funcName]) {
        beh[funcName](...args);
      }
    });
  }

}

class EventEmitter extends AbstractEventEmitter {
  _events = [];

  callMethodInAllBehaviours = (methodName, args = []) => {
    const methodsList = this._events[ methodName ];
    methodsList.forEach(idMethodPair => {
      idMethodPair.method(...args);
    });
  };

   addBehaviourMethodsToEventsLists = (newBehaviour) => {
    for (const eventName of LifeCycleEventsArray) {
      const behaviourMethod = newBehaviour[ eventName ];
      if (behaviourMethod) {
        this._events[ eventName ].push({
          id: newBehaviour.name,
          method: behaviourMethod.bind(newBehaviour),
        });
      }
    }
  };
}
