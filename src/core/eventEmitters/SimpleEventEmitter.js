import { AbstractEventEmitter } from './AbstractEventEmitter';

export class SimpleEventEmitter extends AbstractEventEmitter {
  callMethodInAllBehaviours(methodName, args = []) {
    this._behaviourArray.forEach(beh => {
      if (beh[ methodName ]) {
        beh[ methodName ](...args);
      }
    });
  }
}
