import { BaseMousePositionInfo } from "./BaseMousePositionInfo";

export class MousePositionOnClick extends BaseMousePositionInfo {
  mouseEvent = "click";

  passedToRender = {
    mousePositionOnClick: true
  };
}
