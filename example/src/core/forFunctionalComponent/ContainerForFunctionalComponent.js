import { AbstractContainer } from '../AbstractContainer';

export class ContainerForFunctionalComponent extends AbstractContainer {
  _props;

  _state;

  init(config, props, state, setState) {
    this._props = props; // only for functional components
    this._state = state; // only for functional components
    this.setState = setState;
    super.init(config, props);
  }

  get state() {
    return this._state;
  }

  set state(state) {
     this._state = state;
  }

  get props() {
    return this._props;
  }

  set props(props) {
    this._props = props;
  }
}
