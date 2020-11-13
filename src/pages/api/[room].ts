import { NextApiHandler } from "next";
import Pusher from "pusher";
import Redis from "ioredis";

const pusher = new Pusher({
  key: process.env.NEXT_PUBLIC_PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  appId: process.env.PUSHER_APPID,
  cluster: "us2",
});

const redis = new Redis(process.env.REDIS_URL);

const getController: NextApiHandler = async (req, res) => {
  const roomId = String(req.query.room);

  const getRes = await redis.get(roomId);

  const parsedGetResponse = JSON.parse(getRes);
  res.json(parsedGetResponse);

  // TODO > error handling
};

const putController: NextApiHandler = async (req, res) => {
  const roomId = String(req.query.room);
  const body = req.body;

  const stringifiedBody = JSON.stringify(body);
  const setRes = await redis.set(roomId, stringifiedBody);

  pusher.trigger(roomId, "update", {
    message: "update",
  });

  return res.send(setRes);
  // TODO > error handling
};

const handler: NextApiHandler = async (req, res) => {
  const method = req.method;

  if (method === "GET") {
    return getController(req, res);
  }

  if (method === "PUT") {
    return putController(req, res);
  }

  return res.status(405).send("Method Not Allowed");
};

export default handler;
