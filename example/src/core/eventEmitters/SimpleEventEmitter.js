import { AbstractEventEmitter } from './AbstractEventEmitter';

export class SimpleEventEmitter extends AbstractEventEmitter {
  callMethodInAllBehaviours(methodName, behaviourList, args = []) {
    behaviourList.forEach(beh => {
      if (beh[ methodName ]) {
        beh[ methodName ](...args);
      }
    });
  }
}
