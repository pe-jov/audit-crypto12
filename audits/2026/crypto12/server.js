const fs = require("fs");
const http = require("http");
const path = require("path");

const root = __dirname;
const port = Number(process.env.PORT || 8002);

http
  .createServer((req, res) => {
    let pathname = decodeURIComponent(req.url.split("?")[0]);
    if (pathname === "/" || pathname === "") pathname = "/index.html";

    const filePath = path.join(root, pathname);
    fs.readFile(filePath, (error, data) => {
      if (error) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("not found");
        return;
      }

      const contentType = filePath.endsWith(".html")
        ? "text/html"
        : filePath.endsWith(".png")
          ? "image/png"
          : "application/octet-stream";

      res.writeHead(200, { "Content-Type": contentType });
      res.end(data);
    });
  })
  .listen(port, "127.0.0.1");
