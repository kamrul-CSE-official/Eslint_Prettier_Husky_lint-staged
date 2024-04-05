"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_rate_limit_1 = require("express-rate-limit");
const limiter = (0, express_rate_limit_1.rateLimit)({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message:
    "Sorry, you have exceeded the request limit. Please try again later after some time.",
});
exports.default = limiter;
