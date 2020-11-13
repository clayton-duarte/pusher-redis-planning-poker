import { NextApiHandler } from "next";
import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL, {
  showFriendlyErrorStack: true,
});

const getController: NextApiHandler = async (req, res) => {
  const roomId = String(req.query.room);

  const pipelineResponse = await redis.pipeline().get(roomId).exec();
  const [[getErr, getRes]] = pipelineResponse;

  if (getErr) {
    return res.status(500).json(getErr);
  }

  if (getRes) {
    const parsedGetResponse = JSON.parse(getRes);
    res.status(200).json(parsedGetResponse);
  } else {
    res.status(404).json({});
  }
};

const putController: NextApiHandler = async (req, res) => {
  const roomId = String(req.query.room);
  const body = req.body;

  const stringifiedBody = JSON.stringify(body);
  const pipelineResponse = await redis
    .pipeline()
    .set(roomId, stringifiedBody)
    .get(roomId)
    .exec();

  const [[errSet, resSet], [errGet, resGet]] = pipelineResponse;

  if (errSet || errGet) {
    return res.status(500).json(errSet || errGet);
  }

  if (resSet && resGet) {
    const parsedPostResponse = JSON.parse(resGet);
    return res.status(200).send(parsedPostResponse);
  }

  return res.status(404).json({});
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
