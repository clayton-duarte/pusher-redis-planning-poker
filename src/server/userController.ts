import { NextApiHandler } from "next";

import { HttpMethods } from "../enums";

const userController: NextApiHandler = (req, res) => {
  // CONTROLLERS
  const getController = async (): Promise<void> => {
    const user = req.session.get("user");
    res.json(user || "");
  };

  const postController = async (): Promise<void> => {
    const username = req.body.username;

    req.session.set("user", username);
    await req.session.save();
    res.send(username);
  };

  const deleteController = async (): Promise<void> => {
    req.session.destroy();
    res.send("OK");
  };

  switch (req.method) {
    case HttpMethods.GET:
      return getController();
    case HttpMethods.POST:
      return postController();
    case HttpMethods.DELETE:
      return deleteController();
    default:
      return res.status(405).send("Method Not Allowed");
  }
};

export default userController;
