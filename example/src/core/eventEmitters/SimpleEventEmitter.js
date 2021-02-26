import { AbstractEventEmitter } from './AbstractEventEmitter';

export class SimpleEventEmitter extends AbstractEventEmitter {
  callMethodInAllBehaviours(methodName, args = []) {
    this.container.behaviourArray.forEach(beh => {
      if (beh[ methodName ]) {
        beh[ methodName ](...args);
      }
    });
  }
}
