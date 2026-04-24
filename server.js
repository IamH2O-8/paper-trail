const { createAppServer } = require("./src/server/createAppServer");

const port = Number(process.env.PORT || 4173);
const server = createAppServer();

server.listen(port, () => {
  console.log(`Content Business Documentation App running at http://localhost:${port}`);
});
