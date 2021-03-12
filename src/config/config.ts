export default {
  jwtSecret: process.env.JWT_SECRET || 'somesecrettoken',
  DB: {
    URI: process.env.MONGO_URI || "",
    USER: process.env.MONGO_USER || "",
    PASSWORD: process.env.MONGO_PASSWORD || "",
  }
}
