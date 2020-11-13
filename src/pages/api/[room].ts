import { NextApiHandler } from "next";
import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL);

const handler: NextApiHandler = async (req, res) => {
  const room = req.query.room;
  const method = req.method;
  const body = req.body;

  try {
    switch (method) {
      case "GET":
        const getResponse = await redis.get(`${room}`);
        const parsedResponse = JSON.parse(getResponse);
        res.status(200).json(parsedResponse);
        break;
      case "PUT":
        const stringifiedBody = JSON.stringify(body);
        const postResponse = await redis.set(`${room}`, stringifiedBody);
        res.status(200).send(postResponse);
        break;
      default:
        res.status(405).send("Method Not Allowed");
        break;
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export default handler;
