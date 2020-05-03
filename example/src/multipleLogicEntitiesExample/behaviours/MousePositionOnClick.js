import BaseMousePositionInfo from "./BaseMousePositionInfo";

export default class MousePositionOnClick extends BaseMousePositionInfo {
  mouseEvent = "click";

  passedToRender = {
    mousePositionOnClick: true
  };
}
