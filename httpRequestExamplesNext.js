// Advanced HTTP Request Examples - Next Level
// Topics: PUT, DELETE, PATCH, Async/Await, Error Handling

const http = require('http');
const https = require('https');

// ============================================
// 1. PROMISE-BASED HTTP HELPER FUNCTION
// ============================================

// Wrap http.request in a Promise for cleaner code
function makeRequest(options, data = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        try {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            body: JSON.parse(responseData)
          });
        } catch (error) {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            body: responseData
          });
        }
      });
    });

    req.on('error', reject);

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

// ============================================
// 2. PUT REQUEST - UPDATING ENTIRE RESOURCE
// ============================================

async function putRequest() {
  const putData = {
    id: 1,
    title: 'Updated Post Title',
    body: 'This is the updated body of the post',
    userId: 1
  };

  const options = {
    hostname: 'jsonplaceholder.typicode.com',
    port: 80,
    path: '/posts/1',
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(JSON.stringify(putData))
    }
  };

  try {
    const response = await makeRequest(options, putData);
    console.log('PUT Request Response:', response);
  } catch (error) {
    console.error('PUT Request Error:', error.message);
  }
}

// ============================================
// 3. PATCH REQUEST - PARTIAL UPDATE
// ============================================

async function patchRequest() {
  const patchData = {
    title: 'Only title is updated'
  };

  const options = {
    hostname: 'jsonplaceholder.typicode.com',
    port: 80,
    path: '/posts/1',
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(JSON.stringify(patchData))
    }
  };

  try {
    const response = await makeRequest(options, patchData);
    console.log('PATCH Request Response:', response);
  } catch (error) {
    console.error('PATCH Request Error:', error.message);
  }
}

// ============================================
// 4. DELETE REQUEST
// ============================================

async function deleteRequest() {
  const options = {
    hostname: 'jsonplaceholder.typicode.com',
    port: 80,
    path: '/posts/1',
    method: 'DELETE'
  };

  try {
    const response = await makeRequest(options);
    console.log('DELETE Request Response:', response);
  } catch (error) {
    console.error('DELETE Request Error:', error.message);
  }
}

// ============================================
// 5. CRUD OPERATIONS WITH ASYNC/AWAIT
// ============================================

class APIClient {
  constructor(hostname, port = 80) {
    this.hostname = hostname;
    this.port = port;
  }

  async create(path, data) {
    const options = {
      hostname: this.hostname,
      port: this.port,
      path: path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(JSON.stringify(data))
      }
    };

    return makeRequest(options, data);
  }

  async read(path) {
    const options = {
      hostname: this.hostname,
      port: this.port,
      path: path,
      method: 'GET'
    };

    return makeRequest(options);
  }

  async update(path, data) {
    const options = {
      hostname: this.hostname,
      port: this.port,
      path: path,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(JSON.stringify(data))
      }
    };

    return makeRequest(options, data);
  }

  async partialUpdate(path, data) {
    const options = {
      hostname: this.hostname,
      port: this.port,
      path: path,
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(JSON.stringify(data))
      }
    };

    return makeRequest(options, data);
  }

  async delete(path) {
    const options = {
      hostname: this.hostname,
      port: this.port,
      path: path,
      method: 'DELETE'
    };

    return makeRequest(options);
  }
}

// ============================================
// 6. USING THE API CLIENT - EXAMPLE
// ============================================

async function crudDemo() {
  const client = new APIClient('jsonplaceholder.typicode.com');

  try {
    // CREATE
    console.log('\n=== CREATE ===');
    const created = await client.create('/posts', {
      title: 'New Post',
      body: 'This is a new post',
      userId: 1
    });
    console.log('Created:', created);

    // READ
    console.log('\n=== READ ===');
    const read = await client.read('/posts/1');
    console.log('Read:', read);

    // UPDATE (PUT)
    console.log('\n=== UPDATE (PUT) ===');
    const updated = await client.update('/posts/1', {
      title: 'Updated Title',
      body: 'Updated body',
      userId: 1
    });
    console.log('Updated:', updated);

    // PARTIAL UPDATE (PATCH)
    console.log('\n=== PARTIAL UPDATE (PATCH) ===');
    const patched = await client.partialUpdate('/posts/1', {
      title: 'Only title changed'
    });
    console.log('Patched:', patched);

    // DELETE
    console.log('\n=== DELETE ===');
    const deleted = await client.delete('/posts/1');
    console.log('Deleted:', deleted);
  } catch (error) {
    console.error('CRUD Error:', error.message);
  }
}

// ============================================
// 7. REQUEST WITH RETRY LOGIC
// ============================================

async function makeRequestWithRetry(options, data = null, maxRetries = 3) {
  let lastError;

  for (let i = 0; i < maxRetries; i++) {
    try {
      console.log(`Attempt ${i + 1} of ${maxRetries}...`);
      return await makeRequest(options, data);
    } catch (error) {
      lastError = error;
      console.warn(`Attempt ${i + 1} failed:`, error.message);
      if (i < maxRetries - 1) {
        // Wait 1 second before retrying (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
      }
    }
  }

  throw lastError;
}

async function requestWithRetry() {
  const options = {
    hostname: 'jsonplaceholder.typicode.com',
    port: 80,
    path: '/posts/1',
    method: 'GET'
  };

  try {
    const response = await makeRequestWithRetry(options, null, 3);
    console.log('Request succeeded:', response);
  } catch (error) {
    console.error('Request failed after retries:', error.message);
  }
}

// ============================================
// 8. PARALLEL REQUESTS WITH PROMISE.ALL
// ============================================

async function parallelRequests() {
  const client = new APIClient('jsonplaceholder.typicode.com');

  try {
    console.log('Making 5 parallel requests...');
    const results = await Promise.all([
      client.read('/posts/1'),
      client.read('/posts/2'),
      client.read('/posts/3'),
      client.read('/users/1'),
      client.read('/comments/1')
    ]);

    console.log('All requests completed:');
    results.forEach((result, index) => {
      console.log(`Request ${index + 1}:`, result.status);
    });
  } catch (error) {
    console.error('Parallel Requests Error:', error.message);
  }
}

// ============================================
// 9. SEQUENTIAL REQUESTS WITH PROMISE.THEN
// ============================================

async function sequentialRequests() {
  const client = new APIClient('jsonplaceholder.typicode.com');

  try {
    // Get user first
    const user = await client.read('/users/1');
    console.log('User fetched:', user.body.name);

    // Then get their posts
    const posts = await client.read('/posts?userId=1&_limit=3');
    console.log('User posts:', posts.body.length, 'posts found');

    // Then get details of first post
    if (posts.body.length > 0) {
      const firstPost = await client.read(`/posts/${posts.body[0].id}`);
      console.log('First post title:', firstPost.body.title);
    }
  } catch (error) {
    console.error('Sequential Requests Error:', error.message);
  }
}

// ============================================
// 10. HANDLING DIFFERENT RESPONSE TYPES
// ============================================

function makeRequestRaw(options, data = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          body: responseData,
          contentType: res.headers['content-type']
        });
      });
    });

    req.on('error', reject);

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

async function handleDifferentResponseTypes() {
  try {
    // JSON response
    const jsonOptions = {
      hostname: 'jsonplaceholder.typicode.com',
      port: 80,
      path: '/posts/1',
      method: 'GET'
    };

    const jsonResponse = await makeRequestRaw(jsonOptions);
    console.log('JSON Response:', jsonResponse.contentType);
    console.log('Parsed:', typeof JSON.parse(jsonResponse.body));

    // HTML response
    const htmlOptions = {
      hostname: 'httpbin.org',
      port: 80,
      path: '/html',
      method: 'GET'
    };

    const htmlResponse = await makeRequestRaw(htmlOptions);
    console.log('HTML Response:', htmlResponse.contentType);
    console.log('Length:', htmlResponse.body.length);
  } catch (error) {
    console.error('Response Type Error:', error.message);
  }
}

// ============================================
// 11. REQUEST WITH TIMEOUT HANDLING
// ============================================

function makeRequestWithTimeout(options, data = null, timeoutMs = 5000) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        try {
          resolve({
            status: res.statusCode,
            body: JSON.parse(responseData)
          });
        } catch (error) {
          resolve({
            status: res.statusCode,
            body: responseData
          });
        }
      });
    });

    req.on('error', reject);

    // Set timeout
    req.setTimeout(timeoutMs);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error(`Request timed out after ${timeoutMs}ms`));
    });

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

async function requestWithTimeout() {
  const options = {
    hostname: 'jsonplaceholder.typicode.com',
    port: 80,
    path: '/posts/1',
    method: 'GET'
  };

  try {
    const response = await makeRequestWithTimeout(options, null, 5000);
    console.log('Request completed:', response.status);
  } catch (error) {
    console.error('Timeout Error:', error.message);
  }
}

// ============================================
// 12. CHAINING REQUESTS (THEN/CATCH)
// ============================================

function chainRequests() {
  const options1 = {
    hostname: 'jsonplaceholder.typicode.com',
    port: 80,
    path: '/posts/1',
    method: 'GET'
  };

  makeRequest(options1)
    .then(response => {
      console.log('First request successful:', response.status);
      return response.body.userId; // Pass data to next request
    })
    .then(userId => {
      const options2 = {
        hostname: 'jsonplaceholder.typicode.com',
        port: 80,
        path: `/users/${userId}`,
        method: 'GET'
      };
      return makeRequest(options2);
    })
    .then(response => {
      console.log('Second request successful:', response.body.name);
    })
    .catch(error => {
      console.error('Chain Error:', error.message);
    });
}

// ============================================
// EXPORTS
// ============================================

module.exports = {
  makeRequest,
  makeRequestRaw,
  makeRequestWithTimeout,
  makeRequestWithRetry,
  
  putRequest,
  patchRequest,
  deleteRequest,
  
  APIClient,
  crudDemo,
  
  requestWithRetry,
  parallelRequests,
  sequentialRequests,
  handleDifferentResponseTypes,
  requestWithTimeout,
  chainRequests
};

// ============================================
// DEMONSTRATION EXECUTION
// ============================================

if (require.main === module) {
  const runExamples = async () => {
    console.log('=== Advanced HTTP Request Examples ===\n');

    // Uncomment individual examples to test:

    // console.log('1. PUT Request:');
    // await putRequest();

    // console.log('\n2. PATCH Request:');
    // await patchRequest();

    // console.log('\n3. DELETE Request:');
    // await deleteRequest();

    // console.log('\n4. CRUD Demo:');
    // await crudDemo();

    // console.log('\n5. Request with Retry:');
    // await requestWithRetry();

    // console.log('\n6. Parallel Requests:');
    // await parallelRequests();

    // console.log('\n7. Sequential Requests:');
    // await sequentialRequests();

    // console.log('\n8. Handle Different Response Types:');
    // await handleDifferentResponseTypes();

    // console.log('\n9. Request with Timeout:');
    // await requestWithTimeout();

    // console.log('\n10. Chain Requests:');
    // chainRequests();

    console.log('Open this file and uncomment examples to test them!');
  };

  runExamples().catch(console.error);
}
