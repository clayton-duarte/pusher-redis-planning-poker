import roomController from "../../server/roomController";
import withSession from "../../server/withSession";

export default withSession(roomController);
