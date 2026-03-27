//code that use debounce function to limit the rate at which a function can fire
function debounce(func, wait) {
  let timeout;  
    return function(...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}
//basic server using purre node http module
const http = require('http');
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello, World!');
});
server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});