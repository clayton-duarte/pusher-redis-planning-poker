import { NextApiHandler } from "next";
import Pusher from "pusher";
import Redis from "ioredis";

import { HttpMethods } from "../enums";

const createRoomId = (): string => {
  const timestamp = new Date().getTime().toString(16);
  const random = Math.random().toString(16).slice(2);
  return `${timestamp}-${random}`;
};

const redis = new Redis(process.env.REDIS_URL);

const pusher = new Pusher({
  key: process.env.NEXT_PUBLIC_PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  appId: process.env.PUSHER_APPID,
  cluster: "us2",
});

const roomController: NextApiHandler = (req, res) => {
  // SETUP

  const user = req.session.get("user");
  if (!user) {
    return res.status(401).send("Unauthorized");
  }

  // CONTROLLERS
  const getController = async (): Promise<void> => {
    const roomId = String(req.query.room);
    const getRes = await redis.get(roomId);
    const parsedResponse = JSON.parse(getRes);

    res.json(parsedResponse);
    // TODO > error handling
  };

  const postController = async (): Promise<void> => {
    const newRoom = { id: createRoomId(), host: user };
    const stringifiedBody = JSON.stringify(newRoom);
    await redis.set(newRoom.id, stringifiedBody);

    res.send(newRoom);
    // TODO > error handling
  };

  const putController = async (): Promise<void> => {
    const roomId = String(req.query.room);
    const room = req.body;

    const stringifiedBody = JSON.stringify(room);
    await redis.set(roomId, stringifiedBody);

    pusher.trigger(roomId, "update", {
      message: "update",
    });

    res.send(room);
    // TODO > error handling
  };

  switch (req.method) {
    case HttpMethods.GET:
      return getController();
    case HttpMethods.POST:
      return postController();
    case HttpMethods.PUT:
      return putController();
    default:
      return res.status(405).send("Method Not Allowed");
  }
};

export default roomController;
