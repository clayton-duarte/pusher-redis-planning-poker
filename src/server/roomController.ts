import { NextApiHandler } from "next";
import Pusher from "pusher";
import Redis from "ioredis";

import { HttpMethods } from "../enums";
import { createID } from "../helpers";

const redis = new Redis(process.env.REDIS_URL);

const pusher = new Pusher({
  key: process.env.NEXT_PUBLIC_PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  appId: process.env.PUSHER_APPID,
  cluster: "us2",
});

const roomController: NextApiHandler<Room> = (req, res) => {
  // SETUP
  const user: User = req.session.get("user");

  if (!user) {
    return res.status(401).end();
  }

  // CONTROLLERS
  const getController = async (): Promise<void> => {
    const roomId = String(req.query.room);
    const getRes = await redis.get(roomId);
    const parsedResponse: Room = JSON.parse(getRes);

    res.json(parsedResponse);
    // TODO > error handling
  };

  const postController = async (): Promise<void> => {
    const newRoom: Room = {
      id: createID(),
      members: [user],
      host: user,
      resets: 0,
    };

    const stringifiedRoom = JSON.stringify(newRoom);
    await redis.set(newRoom.id, stringifiedRoom);

    res.send(newRoom);
    // TODO > error handling
  };

  const putController = async (): Promise<void> => {
    const roomId = String(req.query.room);
    const room: Room = req.body;

    const stringifiedRoom = JSON.stringify(room);
    await redis.set(roomId, stringifiedRoom);

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
      return res.status(405).end();
  }
};

export default roomController;
