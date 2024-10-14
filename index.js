const http = require("http");
const fs = require("fs");
const path = require("path");

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        fs.readFile(path.join(__dirname, "index.html"), (err, data) => {
            if (err) {
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("Error loading index.html");
            } else {
                res.writeHead(200, { "Content-Type": "text/html" });
                res.write(data);
                res.end();
            }
        });
    } else if (req.url === "/about") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("About page");
    } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Page not found");
    }
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
