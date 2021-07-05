import RateLimit from 'express-rate-limit'
import config from '../config/config'

const limiter = RateLimit({
    windowMs: config.request.rateLimit.windowMs,
    max: config.request.rateLimit.max
});

export default limiter;