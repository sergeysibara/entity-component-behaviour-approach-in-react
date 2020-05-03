import React from "react";
import MousePositionInfoManager from "./behaviours/MousePositionInfoManager";
import createContainerComponent from "../core/createContainerComponent";
import MousePositionOnMove from "./behaviours/MousePositionOnMove";
import MessageLoader from "./behaviours/MessageLoader";
// import { mapToMixedRenderData } from "../core/mapToRenderDataStrategies";

/** Example of next features:
 * several behaviours in one component;
 * replace (add/remove) behaviours;
 */

const render = ({
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

export default createContainerComponent("MultipleLogicEntitiesExample", {
  behaviours: [
    { behaviour: MousePositionInfoManager },
    { behaviour: MousePositionOnMove },
    { behaviour: MessageLoader }
  ],
  render: render

  // Example of custom mapToRenderData.
  // Call before render.
  // mapToRenderData: mapToMixedRenderData, // can use this row instead custom.
  //   Or you can missed this rows because mapToMixedRenderData used by default.
  // mapToRenderData: component => ({
  //  ...component.behs.mousePositionInfoManager.mapToRenderData(),
  //  ...component.behs.mousePositionInfo.mapToRenderData(),
  //  ...component.behs.messageLoader.mapToRenderData()
  // })

  // todo?
  // style: styLeObject; // optional
  // styleWrapper: (style, renderData)=>{ ...style calculate... return style} //optional
});
