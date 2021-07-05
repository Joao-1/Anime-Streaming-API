import config from '../config/config'
import SlowDown from 'express-slow-down';

const slowDown = SlowDown({
    windowMs: config.request.slowDown.windowMs,
    delayAfter: config.request.slowDown.delayAfter,
    delayMs: config.request.slowDown.delayMs
});

export default slowDown;