// different type of js
// get request in node js
const http = require('http');
const url = require('url'); 
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    if (req.method === 'GET' && parsedUrl.pathname === '/get') {
        // Here you can perform the get operation and send the response
        console.log('GET request received');
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'GET request processed successfully' }));
    }
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Not Found' }));
    }   
});
server.listen(3000, () => {
    console.log('Server is listening on port 3000');
}); 
