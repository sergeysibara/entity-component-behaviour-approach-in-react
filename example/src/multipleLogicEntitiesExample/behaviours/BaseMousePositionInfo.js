import BaseBehaviour from "../../core/BaseBehaviour";

// There is no need to use inheritance for this case and no need
// to create MousePositionOnClick, MousePositionOnMove behaviours.
// This is only for replacing behaviours example.

export default class BaseMousePositionInfo extends BaseBehaviour {
  name = "mousePositionInfo";
  mouseEvent = ""; // to set in child classes
  dummy = this.useState({ position: { x: 0, y: 0 }, setPosition: null }, false);
  // defaultState = { position: { x: 0, y: 0 }};

  update = mouseEvent => {
    this.setPosition({
      x: mouseEvent.pageX,
      y: mouseEvent.pageY
    });
  };

  behaviourAdded() {
    window.addEventListener(this.mouseEvent, this.update);
  }

  behaviourWillRemoved() {
    super.behaviourWillRemoved();
    window.removeEventListener(this.mouseEvent, this.update);
  }

  mapToRenderData() {
    return {
      ...this.state.position,
      ...this.passedToRender,
    };  }
}
