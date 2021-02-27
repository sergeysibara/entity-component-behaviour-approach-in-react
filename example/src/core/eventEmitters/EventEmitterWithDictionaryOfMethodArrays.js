import { LifeCycleEventsArray } from '../LifeCycleEvents';
import { AbstractEventEmitter } from './AbstractEventEmitter';

export class EventEmitterWithDictionaryOfMethodArrays extends AbstractEventEmitter {
  /**
   * For calls optimization:
   * Stores links to life cycle methods of behaviours
   * _eventDictionaryWithMethodArrays[LifeCycleEvent][{behaviourNameA, method}, {behaviourNameB, method}];
   * name - behaviour name, method - concrete method of concrete behaviour
   */
  _eventDictionaryWithMethodArrays = LifeCycleEventsArray.reduce((eventDictionary, current) => {
    eventDictionary[ current ] = [];
    return eventDictionary;
  }, {});

  callMethodInAllBehaviours = (methodName, args = []) => {
    const methodsList = this._eventDictionaryWithMethodArrays[ methodName ];
    methodsList.forEach(keyMethodPair => {
      keyMethodPair.method(...args);
    });
  };

  addBehaviourMethodsToEventsLists = (newBehaviour) => {
    for (const eventName of LifeCycleEventsArray) {
      const behaviourMethod = newBehaviour[ eventName ];
      if (behaviourMethod) {
        this._eventDictionaryWithMethodArrays[ eventName ].push({
          behaviourName: newBehaviour.name,
          method: behaviourMethod.bind(newBehaviour),
        });
      }
    }
  };

  // find behaviour methods by id in events and remove from events
  removeBehaviourMethodsFromEmitter = (behaviourName) => {
    for (const eventKey in this._eventDictionaryWithMethodArrays) {
      const methodArrayForConcreteEvent = this._eventDictionaryWithMethodArrays[ eventKey ];

      const foundIndex = methodArrayForConcreteEvent.findIndex(
        keyMethodPair => keyMethodPair.behaviourName === behaviourName);
      if (foundIndex !== -1) {
        methodArrayForConcreteEvent.splice(foundIndex, 1);
      }
    }
  }
}
