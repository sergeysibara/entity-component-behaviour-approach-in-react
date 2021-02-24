import BaseBehaviour from "../../core/BaseBehaviour";
import MousePositionOnMove from "./MousePositionOnMove";
import MousePositionOnClick from "./MousePositionOnClick";

export default class MousePositionInfoManager extends BaseBehaviour {
  passedToRender = {
    toggleMousePositionInfoBehaviour: () => {
      let beh = this.container.behs["mousePositionInfo"];
      if (beh && beh.type === "MousePositionOnMove") {
        this.container.removeBehaviour(beh);
        this.container.addBehaviour(MousePositionOnClick);
        this.setState(); // for call render
        return;
      }

      if (beh && beh.type === "MousePositionOnClick") {
        this.container.removeBehaviour(beh);
        this.container.addBehaviour(MousePositionOnMove);
        this.setState(); // for call render
        return;
      }

      // if any MousePositionInfo is not added
      this.container.addBehaviour(MousePositionOnMove);
      this.setState(); // for call render
    }
  };
}
