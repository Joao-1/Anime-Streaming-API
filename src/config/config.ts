import "dotenv/config";

export default {
  app: {
    port: process.env.PORT || 3000,
  },
  database: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    host: process.env.DATABASE_HOST,
    dialect: "postgres",
    port: 5432,
  },
  request: {
    rateLimit: {
      windowMs: 15 * 60 * 1000,
      max: 150,
    },
    slowDown: {
      windowMs: 15 * 60 * 1000,
      delayAfter: 100,
      delayMs: 100,
    },
  },
  cors: {
    origin: "*",
    allowedHeaders: "Content-Type, X-Request-With, Accept, Authorization",
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
  },
};
