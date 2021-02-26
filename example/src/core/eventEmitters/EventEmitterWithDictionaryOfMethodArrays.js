import { LifeCycleEventsArray } from '../LifeCycleEvents';
import { AbstractEventEmitter } from './AbstractEventEmitter';

export class EventEmitterWithDictionaryOfMethodArrays extends AbstractEventEmitter {
  /**
   * For calls optimization:
   * Stores links to life cycle methods of behaviours
   * _eventDictionaryWithMethodArrays[LifeCycleEvent][{id1, method}, {id2, method}];
   * id - behaviourId, method - concrete method of concrete behaviour
   */
  _eventDictionaryWithMethodArrays = LifeCycleEventsArray.reduce((eventDictionary, current) => {
    eventDictionary[ current ] = [];
    return eventDictionary;
  }, {});

  callMethodInAllBehaviours = (methodName, args = []) => {
    const methodsList = this._eventDictionaryWithMethodArrays[ methodName ];
    methodsList.forEach(idMethodPair => {
      idMethodPair.method(...args);
    });
  };

  addBehaviourMethodsToEventsLists = (newBehaviour) => {
    for (const eventName of LifeCycleEventsArray) {
      const behaviourMethod = newBehaviour[ eventName ];
      if (behaviourMethod) {
        this._eventDictionaryWithMethodArrays[ eventName ].push({
          id: newBehaviour.id,
          method: behaviourMethod.bind(newBehaviour),
        });
      }
    }
  };

  // find behaviour methods by id in events and remove from events
  removeBehaviourMethodsFromEmitter = (behaviourId) => {
    for (const eventKey in this._eventDictionaryWithMethodArrays) {
      const methodArrayForConcreteEvent = this._eventDictionaryWithMethodArrays[ eventKey ];

      const foundIndex = methodArrayForConcreteEvent.findIndex(
        idMethodPair => idMethodPair.id === behaviourId);
      if (foundIndex !== -1) {
        methodArrayForConcreteEvent.splice(foundIndex, 1);
      }
    }
  }
}
