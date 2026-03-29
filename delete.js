// delete request in node js
const http = require('http');
const url = require('url');
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    if (req.method === 'DELETE' && parsedUrl.pathname === '/delete') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        }); 
        req.on('end', () => {
            const data = JSON.parse(body);
            // Here you can perform the delete operation using the data received
            console.log('Data received for deletion:', data);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Delete request processed successfully' }));
        });
    } else {    
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Not Found' }));
    }   
});
server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});     


