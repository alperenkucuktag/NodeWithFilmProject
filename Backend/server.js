const http = require("http");

//1-Server created
const server = http.createServer((req, res) => {});

//2-belirli porta gelen istekleri dinle
const port = 4006;

server.listen(port, () => {
  console.log();
});
