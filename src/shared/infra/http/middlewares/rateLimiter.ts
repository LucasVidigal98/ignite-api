import Redis from 'ioredis';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import { NextFunction, Request, Response } from 'express';

const redisClient = new Redis({ enableOfflineQueue: false });

redisClient.on('error', (err) => {
  console.log(err);
});

const opts = {
  // Basic options
  storeClient: redisClient,
  points: 10, // Number of points
  duration: 1, // Per second(s)
  
  // Custom
  execEvenly: false, // Do not delay actions evenly
  blockDuration: 0, // Do not block if consumed more than points
  keyPrefix: 'rlflx', // must be unique for limiters with different purpose
};

const limiter = new RateLimiterRedis(opts);

export default async function rateLimiter(req: Request, res: Response, next: NextFunction ) {
  try {
    await limiter.consume(req.ip);

    return next();
  } catch(err) {
    res.status(429).send('Too Many Requests');
  }
}