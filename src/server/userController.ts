import { NextApiHandler } from "next";

import { HttpMethods } from "../enums";
import { createID } from "../helpers";

const userController: NextApiHandler<User> = (req, res) => {
  // CONTROLLERS
  const getController = async (): Promise<void> => {
    const user: User = req.session.get("user");
    if (user) {
      res.json(user);
    } else {
      res.end();
    }
  };

  const postController = async (): Promise<void> => {
    const username: string = req.body.username;

    const newUser: User = {
      name: username,
      id: createID(),
    };

    req.session.set("user", newUser);
    await req.session.save();
    res.send(newUser);
  };

  const deleteController = async (): Promise<void> => {
    req.session.destroy();
    res.end();
  };

  switch (req.method) {
    case HttpMethods.GET:
      return getController();
    case HttpMethods.POST:
      return postController();
    case HttpMethods.DELETE:
      return deleteController();
    default:
      return res.status(405).end();
  }
};

export default userController;
