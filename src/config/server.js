// Server Configurations
const { httpServer } = require('../app');
const PORT = process.env.PORT || 3001;

//Initialize Server
httpServer.listen(PORT, () => {
  console.log("Listening on port 3001");
});
