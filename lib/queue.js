import Queue from "bull";
const queue = new Queue("maple", {
    redis: {
        port: process.env.REDIS_PORT,
        host: process.env.REDIS_HOST,
        password: process.env.REDIS_PASSWORD,
    },
});

module.exports = queue;
