const log = require('fancy-log');

export const logger = (info: Error | string) => log.info(info);
