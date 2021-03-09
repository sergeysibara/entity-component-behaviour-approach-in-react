import { AbstractContainer } from '../AbstractContainer';

export class ContainerForClassComponent extends AbstractContainer {
  _component;

  get state() {
    return this._component.state;
  }

  get props() {
    return this._component.props;
  }

  setState = (stateOrUpdater) => {
    this._component.setState(stateOrUpdater);
  };

  init(config, props, component) {
    this._component = component;
    super.init(config, props);
  }
}
