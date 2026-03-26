// HTTP GET and POST Request Examples in Node.js

const http = require('http');
const https = require('https');
const querystring = require('querystring');

// ============================================
// 1. MAKING GET REQUESTS WITH HTTP MODULE
// ============================================

// Basic GET request
function simpleGetRequest() {
  const options = {
    hostname: 'jsonplaceholder.typicode.com',
    port: 80,
    path: '/posts/1',
    method: 'GET'
  };

  const req = http.request(options, (res) => {
    let data = '';

    // Collect data in chunks
    res.on('data', (chunk) => {
      data += chunk;
    });

    // When all data is received
    res.on('end', () => {
      console.log('GET Response:', JSON.parse(data));
    });
  });

  req.on('error', (e) => {
    console.error(`Error: ${e.message}`);
  });

  req.end();
}

// ============================================
// 2. MAKING POST REQUESTS WITH HTTP MODULE
// ============================================

// Basic POST request
function simplePostRequest() {
  const postData = JSON.stringify({
    title: 'New Post',
    body: 'This is a test post',
    userId: 1
  });

  const options = {
    hostname: 'jsonplaceholder.typicode.com',
    port: 80,
    path: '/posts',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  const req = http.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      console.log('POST Response:', JSON.parse(data));
    });
  });

  req.on('error', (e) => {
    console.error(`Error: ${e.message}`);
  });

  // Send the data
  req.write(postData);
  req.end();
}

// ============================================
// 3. GET REQUEST WITH QUERY PARAMETERS
// ============================================

function getWithQueryParams() {
  const params = {
    userId: 1,
    _limit: 5
  };

  const queryString = new URLSearchParams(params).toString();
  
  const options = {
    hostname: 'jsonplaceholder.typicode.com',
    port: 80,
    path: `/posts?${queryString}`,
    method: 'GET'
  };

  const req = http.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      console.log('GET with Query Params:', JSON.parse(data));
    });
  });

  req.on('error', (e) => {
    console.error(`Error: ${e.message}`);
  });

  req.end();
}

// ============================================
// 4. POST REQUEST WITH FORM DATA
// ============================================

function postWithFormData() {
  const postData = querystring.stringify({
    title: 'Form Data Post',
    body: 'This is form-encoded data',
    userId: 1
  });

  const options = {
    hostname: 'jsonplaceholder.typicode.com',
    port: 80,
    path: '/posts',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  const req = http.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      console.log('POST with Form Data:', JSON.parse(data));
    });
  });

  req.on('error', (e) => {
    console.error(`Error: ${e.message}`);
  });

  req.write(postData);
  req.end();
}

// ============================================
// 5. HTTPS GET REQUEST
// ============================================

function httpsGetRequest() {
  const options = {
    hostname: 'api.github.com',
    port: 443,
    path: '/users/github',
    method: 'GET',
    headers: {
      'User-Agent': 'Node.js'
    }
  };

  const req = https.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      console.log('HTTPS GET Response:', JSON.parse(data));
    });
  });

  req.on('error', (e) => {
    console.error(`Error: ${e.message}`);
  });

  req.end();
}

// ============================================
// 6. CREATING A SERVER THAT HANDLES GET & POST
// ============================================

function createServerWithGetPost() {
  const server = http.createServer((req, res) => {
    
    // Handle GET request
    if (req.method === 'GET') {
      if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Welcome! Send a POST request to /api/data');
      } else if (req.url === '/users') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify([
          { id: 1, name: 'John' },
          { id: 2, name: 'Jane' },
          { id: 3, name: 'Bob' }
        ]));
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
      }
    }
    
    // Handle POST request
    else if (req.method === 'POST') {
      if (req.url === '/api/data') {
        let body = '';

        // Collect data from request
        req.on('data', (chunk) => {
          body += chunk;
        });

        // Process complete request body
        req.on('end', () => {
          try {
            const data = JSON.parse(body);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
              message: 'Data received successfully',
              receivedData: data,
              timestamp: new Date().toISOString()
            }));
          } catch (error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Invalid JSON' }));
          }
        });
      } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Endpoint not found');
      }
    }
    
    // Handle other methods
    else {
      res.writeHead(405, { 'Content-Type': 'text/plain' });
      res.end('Method Not Allowed');
    }
  });

  return server;
}

// ============================================
// 7. REQUEST WITH CUSTOM HEADERS
// ============================================

function getWithCustomHeaders() {
  const options = {
    hostname: 'jsonplaceholder.typicode.com',
    port: 80,
    path: '/posts/1',
    method: 'GET',
    headers: {
      'User-Agent': 'Custom Node.js Client',
      'Accept': 'application/json',
      'X-Custom-Header': 'MyValue'
    }
  };

  const req = http.request(options, (res) => {
    console.log('Status Code:', res.statusCode);
    console.log('Headers:', res.headers);
    
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      console.log('Response with Custom Headers:', JSON.parse(data));
    });
  });

  req.on('error', (e) => {
    console.error(`Error: ${e.message}`);
  });

  req.end();
}

// ============================================
// 8. HANDLING REDIRECTS IN GET REQUEST
// ============================================

function getWithRedirectHandling() {
  const options = {
    hostname: 'httpbin.org',
    port: 80,
    path: '/redirect/2',
    method: 'GET'
  };

  const req = http.request(options, (res) => {
    if (res.statusCode === 301 || res.statusCode === 302 || res.statusCode === 307) {
      console.log('Redirect to:', res.headers.location);
      // Follow redirect
      const redirectUrl = new URL(res.headers.location);
      const redirectOptions = {
        hostname: redirectUrl.hostname,
        port: 80,
        path: redirectUrl.pathname,
        method: 'GET'
      };
      const redirectReq = http.request(redirectOptions, (redirectRes) => {
        let data = '';
        redirectRes.on('data', (chunk) => {
          data += chunk;
        });
        redirectRes.on('end', () => {
          console.log('Final Response:', data);
        });
      });
      redirectReq.end();
    } else {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        console.log('Response:', data);
      });
    }
  });

  req.on('error', (e) => {
    console.error(`Error: ${e.message}`);
  });

  req.end();
}

// ============================================
// 9. EXAMPLE CLIENT MAKING REQUESTS TO OUR SERVER
// ============================================

function clientMakingRequests() {
  // Make GET request to our server
  const getOptions = {
    hostname: 'localhost',
    port: 3000,
    path: '/users',
    method: 'GET'
  };

  const getReq = http.request(getOptions, (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      console.log('GET from server:', JSON.parse(data));
    });
  });

  getReq.on('error', (e) => {
    console.error('GET Error:', e.message);
  });

  getReq.end();

  // Make POST request to our server
  const postData = JSON.stringify({
    name: 'Alice',
    email: 'alice@example.com'
  });

  const postOptions = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/data',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  const postReq = http.request(postOptions, (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      console.log('POST response from server:', JSON.parse(data));
    });
  });

  postReq.on('error', (e) => {
    console.error('POST Error:', e.message);
  });

  postReq.write(postData);
  postReq.end();
}

// ============================================
// 10. ERROR HANDLING FOR REQUESTS
// ============================================

function requestWithErrorHandling() {
  const options = {
    hostname: 'jsonplaceholder.typicode.com',
    port: 80,
    path: '/posts/999999',
    method: 'GET',
    timeout: 5000 // 5 second timeout
  };

  const req = http.request(options, (res) => {
    if (res.statusCode !== 200) {
      console.log(`Status Code: ${res.statusCode}`);
    }

    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      if (res.statusCode === 404) {
        console.log('Resource not found');
      } else if (res.statusCode === 200) {
        console.log('Success:', JSON.parse(data));
      }
    });
  });

  req.on('error', (e) => {
    console.error(`Request Error: ${e.message}`);
  });

  req.on('timeout', () => {
    console.error('Request timed out');
    req.destroy();
  });

  req.end();
}

// ============================================
// EXPORTS AND MAIN EXECUTION
// ============================================

module.exports = {
  simpleGetRequest,
  simplePostRequest,
  getWithQueryParams,
  postWithFormData,
  httpsGetRequest,
  createServerWithGetPost,
  getWithCustomHeaders,
  getWithRedirectHandling,
  clientMakingRequests,
  requestWithErrorHandling
};

// Run examples
if (require.main === module) {
  console.log('=== HTTP GET and POST Request Examples ===\n');

  // Uncomment to test individual examples:

  // console.log('1. Simple GET Request:');
  // simpleGetRequest();

  // console.log('\n2. Simple POST Request:');
  // simplePostRequest();

  // console.log('\n3. GET with Query Parameters:');
  // getWithQueryParams();

  // console.log('\n4. POST with Form Data:');
  // postWithFormData();

  // console.log('\n5. HTTPS GET Request:');
  // httpsGetRequest();

  // console.log('\n6. Starting Server on port 3000...');
  // const server = createServerWithGetPost();
  // server.listen(3000, () => {
  //   console.log('Server running at http://localhost:3000/');
  //   console.log('GET /users, POST /api/data');
  //   // Then run clientMakingRequests() in another terminal
  // });

  // console.log('\n7. GET with Custom Headers:');
  // getWithCustomHeaders();

  // console.log('\n8. GET with Redirect Handling:');
  // getWithRedirectHandling();

  // console.log('\n9. Error Handling:');
  // requestWithErrorHandling();

  console.log('Choose an example to run by uncommenting it above, then run: node httpRequestExamples.js');
}
