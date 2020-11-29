import { NextApiHandler } from "next";

import { HttpMethods } from "../enums";

const userController: NextApiHandler<User> = (req, res) => {
  // CONTROLLERS
  const postController = async (): Promise<void> => {
    const user: User = req.body.user;
    req.session.set("user", user);
    await req.session.save();
    res.json(user);
  };

  const deleteController = async (): Promise<void> => {
    req.session.destroy();
    res.end();
  };

  switch (req.method) {
    case HttpMethods.POST:
      return postController();
    case HttpMethods.DELETE:
      return deleteController();
    default:
      return res.status(405).end();
  }
};

export default userController;
