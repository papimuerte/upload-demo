const http = require('http');
const fs = require('fs');
const url = require('url');
const port = 3000;

const controller = (req, res) => {
    if (req.url === "/") {
        fs.readFile(__dirname + '/index.html', function (err, data) {
            if (err) {
                res.writeHead(404);
                res.end(JSON.stringify(err));
                return;
            }
            res.writeHead(200);
            res.end(data);
        });
    } else if (req.url.startsWith("/upload") && req.method === "POST") {
        const total = req.headers['content-length'];
        let downloaded = 0;

        req
            .on('data', function (chunk) {
                downloaded += chunk.length;
                console.log('progress', downloaded / total);
            })           
            .on('finish', () => {
                res.writeHead(200);
                res.end();
            });
    }
}

const server = http.createServer(controller);
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});