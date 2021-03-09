import { BaseBehaviour } from "../../core/BaseBehaviour";
import { MousePositionOnMove } from "./MousePositionOnMove";
import { MousePositionOnClick } from "./MousePositionOnClick";

export class MousePositionInfoManager extends BaseBehaviour {
  passedToRender = {
    toggleMousePositionInfoBehaviour: () => {
      let beh = this.container.behs.mousePositionOnMove;
      if (beh) {
        this.container.removeBehaviour(beh);
        this.container.addBehaviour(MousePositionOnClick);
        this.setState(); // for call render
        return;
      }

      beh = this.container.behs.mousePositionOnClick;
      if (beh) {
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
