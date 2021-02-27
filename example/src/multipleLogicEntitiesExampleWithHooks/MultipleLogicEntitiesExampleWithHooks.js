import MousePositionInfoManager from "../multipleLogicEntitiesExample/behaviours/MousePositionInfoManager";
import { render } from "../multipleLogicEntitiesExample/MultipleLogicEntitiesExample";
import MousePositionOnMove from "../multipleLogicEntitiesExample/behaviours/MousePositionOnMove";
import MessageLoader from "../multipleLogicEntitiesExample/behaviours/MessageLoader";
import { useBehaviours } from '../core/forFunctionalComponent/useBehaviours';

const multipleLogicEntitiesExampleWithHooks = () => {
  return useBehaviours({
    behaviours: [
      { behaviour: MousePositionInfoManager },
      { behaviour: MousePositionOnMove },
      { behaviour: MessageLoader }
    ],
    render: render
  });
};

export default multipleLogicEntitiesExampleWithHooks;
