export class SimpleEventEmitter {
  _behaviourArray;

  init(behaviourArray) {
    this._behaviourArray = behaviourArray;
  }

  callMethodInBehaviour(methodName, behaviourInstance, args = []) {
    const behaviourMethod = behaviourInstance[methodName];
    if (behaviourMethod) {
      behaviourMethod.apply(behaviourInstance, args);
    }
  }

  callMethodInAllBehaviours(methodName, args = []) {
    this._behaviourArray.forEach(beh => {
      if (beh[methodName]) {
        beh[methodName](...args);
      }
    });
  }
}
