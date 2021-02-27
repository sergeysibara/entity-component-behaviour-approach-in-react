import { MousePositionInfoManager } from "./behaviours/MousePositionInfoManager";
import { createComponentWithContainer } from "../core/forClassComponent/createComponentWithContainer";
import { MousePositionOnMove } from "./behaviours/MousePositionOnMove";
import { MessageLoader } from "./behaviours/MessageLoader";
// import { mapToMixedRenderData } from "../core/mapToRenderDataStrategies";

/** Example of next features:
 * several behaviours in one component;
 * replacing (add/remove) behaviours;
 * using in-box and custom mapToRenderData
 */

export const render = ({
  x,
  y,
  mousePositionOnClick,
  toggleMousePositionInfoBehaviour,
  isLoading,
  title,
  body,
  props
}) => (
  <>
    <h3>Example of multiple logic entities in one component</h3>
    <div>
      Mouse {mousePositionOnClick ? "click" : ""} is at {x}, {y}
    </div>
    <br />
    <button onClick={toggleMousePositionInfoBehaviour}>
      Toggle Mouse Position Info Behaviour
    </button>
    <br />
    <br />
    {isLoading ? (
      <div>Message loading...</div>
    ) : (
      <>
        <h4>{title}</h4>
        <p>{body}</p>
      </>
    )}
  </>
);

export const MultipleLogicEntitiesExample = createComponentWithContainer("MultipleLogicEntitiesExample", {
  behaviours: [
    { behaviour: MousePositionInfoManager },
    { behaviour: MousePositionOnMove },
    { behaviour: MessageLoader }
  ],
  render: render

  // Example of custom mapToRenderData.
  // mapToRenderData: container => ({
  //  ...container.behs.mousePositionInfoManager.mapToRenderData(),
  //  ...container.behs.mousePositionInfo.mapToRenderData(),
  //  ...container.behs.messageLoader.mapToRenderData()
  // })

  // mapToRenderData: mapToMixedRenderData, // can use this row instead custom.
  // Or you can missed this rows because mapToMixedRenderData used by default.

  // todo?
  // style: styleObject; // optional
});
