var config = {
    redisUrl: process.env.REDISCLOUD_URL || 'redis://localhost:6379',
    port: process.env.PORT || 8000,
    adminPass: process.env.ADMINPASS || 'adminPass'
};

module.exports = config;
