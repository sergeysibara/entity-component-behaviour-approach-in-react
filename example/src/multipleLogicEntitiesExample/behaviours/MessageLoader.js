import BaseBehaviour from "../../core/BaseBehaviour";
import messageAPI from "../messageAPI";

export default class MessageLoader extends BaseBehaviour {
  defaultState = { isLoading: true };

  componentDidMount() {
    (async () => {
      let responseData = await messageAPI.getMessage();
      this.setState(responseData);
    })();
  };
}
