module.exports =  {
  jwtSecret: 'jwtsecretofchatapp',
  mongoURL: process.env.MONGODB_URI || 'mongodb://localhost:27017/chat-app',
  port: process.env.PORT || 3000
};
