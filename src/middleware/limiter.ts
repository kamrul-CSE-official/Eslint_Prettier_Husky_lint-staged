import { rateLimit } from "express-rate-limit";

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, 
    message: "Sorry, you have exceeded the request limit. Please try again later after some time.",
  });

export default limiter;