import userController from "../../server/userController";
import withSession from "../../server/withSession";

export default withSession(userController);
