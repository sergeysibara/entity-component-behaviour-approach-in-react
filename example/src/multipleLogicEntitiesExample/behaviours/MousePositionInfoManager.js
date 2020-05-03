import BaseBehaviour from "../../core/BaseBehaviour";
import MousePositionOnMove from "./MousePositionOnMove";
import MousePositionOnClick from "./MousePositionOnClick";

export default class MousePositionInfoManager extends BaseBehaviour {
  passedToRender = {
    toggleMousePositionInfoBehaviour: () => {
      let beh = this.component.behs["mousePositionInfo"];
      if (beh && beh.type === "MousePositionOnMove") {
        this.component.removeBehaviour(beh);
        this.component.addBehaviour(MousePositionOnClick);
        this.setState(); // for call render
        return;
      }

      if (beh && beh.type === "MousePositionOnClick") {
        this.component.removeBehaviour(beh);
        this.component.addBehaviour(MousePositionOnMove);
        this.setState(); // for call render
        return;
      }

      // if any MousePositionInfo is not added
      this.component.addBehaviour(MousePositionOnMove);
      this.setState(); // for call render
    }
  };
}
