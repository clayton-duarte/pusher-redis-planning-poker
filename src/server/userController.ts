import { NextApiHandler } from "next";

import { HttpMethods } from "../enums";

const roomController: NextApiHandler = (req, res) => {
  // CONTROLLERS
  const getController = async (): Promise<void> => {
    const user = req.session.get("user");
    if (user) {
      res.json(user);
    } else {
      res.status(404).json(user);
    }
  };

  const postController = async (): Promise<void> => {
    const body = req.body;

    req.session.set("user", body);
    await req.session.save();
    res.send("OK");
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

export default roomController;
