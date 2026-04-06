// Fetch API Examples - Modern HTTP Requests
// Topics: Fetch API, Headers, Request/Response handling, Error handling

// ============================================
// 1. BASIC FETCH REQUESTS
// ============================================

// GET Request
async function basicGet() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('GET Response:', data);
    return data;
  } catch (error) {
    console.error('GET Error:', error.message);
  }
}

// POST Request
async function basicPost() {
  const postData = {
    title: 'New Post',
    body: 'This is a new post created with fetch',
    userId: 1
  };

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postData)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('POST Response:', data);
    return data;
  } catch (error) {
    console.error('POST Error:', error.message);
  }
}

// ============================================
// 2. ALL HTTP METHODS WITH FETCH
// ============================================

class FetchClient {
  constructor(baseURL = '') {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json'
    };
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: { ...this.defaultHeaders, ...options.headers },
      ...options
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      // Handle different content types
      const contentType = response.headers.get('content-type');
      let data;
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else if (contentType && contentType.includes('text')) {
        data = await response.text();
      } else {
        data = await response.arrayBuffer();
      }

      return {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers),
        data: data
      };
    } catch (error) {
      console.error(`Request failed for ${url}:`, error.message);
      throw error;
    }
  }

  // GET - Read resource
  get(endpoint, options = {}) {
    return this.request(endpoint, {
      method: 'GET',
      ...options
    });
  }

  // POST - Create resource
  post(endpoint, body, options = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
      ...options
    });
  }

  // PUT - Replace entire resource
  put(endpoint, body, options = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
      ...options
    });
  }

  // PATCH - Partial update
  patch(endpoint, body, options = {}) {
    return this.request(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(body),
      ...options
    });
  }

  // DELETE - Remove resource
  delete(endpoint, options = {}) {
    return this.request(endpoint, {
      method: 'DELETE',
      ...options
    });
  }
}

// ============================================
// 3. CUSTOM HEADERS & AUTHENTICATION
// ============================================

async function requestWithAuthorization() {
  const apiKey = 'your-api-key-here';
  
  try {
    const response = await fetch('https://api.example.com/data', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'User-Agent': 'MyApp/1.0',
        'X-Custom-Header': 'CustomValue'
      }
    });

    const data = await response.json();
    console.log('Authorized Request:', data);
    return data;
  } catch (error) {
    console.error('Authorization Error:', error.message);
  }
}

// ============================================
// 4. REQUEST WITH BODY & QUERY PARAMETERS
// ============================================

async function requestWithQueryParams() {
  // Method 1: Using URLSearchParams
  const params = new URLSearchParams();
  params.append('userId', '1');
  params.append('_limit', '5');

  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?${params.toString()}`
    );

    const data = await response.json();
    console.log('Posts fetched:', data.length);
    return data;
  } catch (error) {
    console.error('Query Params Error:', error.message);
  }
}

async function requestWithObject() {
  const queryParams = {
    userId: 1,
    _limit: 5
  };

  // Method 2: Building URL string manually
  const queryString = Object.entries(queryParams)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?${queryString}`
    );

    const data = await response.json();
    console.log('Posts fetched with object:', data.length);
    return data;
  } catch (error) {
    console.error('Query Params Error:', error.message);
  }
}

// ============================================
// 5. FILE UPLOAD WITH FORMDATA
// ============================================

async function uploadFile() {
  // In Node.js, you might use a Buffer or stream
  // In browsers, you'd get a File from an input element
  
  try {
    const formData = new FormData();
    formData.append('title', 'My File');
    formData.append('description', 'A test file upload');
    // In browser: formData.append('file', fileInput.files[0]);
    // In Node.js: formData.append('file', buffer);

    const response = await fetch('https://api.example.com/upload', {
      method: 'POST',
      // NOTE: Don't set Content-Type with FormData - browser sets it automatically
      body: formData
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.status}`);
    }

    const data = await response.json();
    console.log('Upload successful:', data);
    return data;
  } catch (error) {
    console.error('Upload Error:', error.message);
  }
}

// ============================================
// 6. REQUEST WITH TIMEOUT
// ============================================

async function fetchWithTimeout(url, options = {}, timeoutMs = 5000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error(`Request timed out after ${timeoutMs}ms`);
    } else {
      console.error('Fetch Error:', error.message);
    }
    throw error;
  }
}

// Usage
async function requestWithTimeoutExample() {
  try {
    const data = await fetchWithTimeout(
      'https://jsonplaceholder.typicode.com/posts/1',
      { method: 'GET' },
      5000
    );
    console.log('Data received:', data);
  } catch (error) {
    console.error('Timed out:', error);
  }
}

// ============================================
// 7. RETRY LOGIC WITH FETCH
// ============================================

async function fetchWithRetry(
  url,
  options = {},
  maxRetries = 3,
  delayMs = 1000
) {
  let lastError;

  for (let i = 0; i < maxRetries; i++) {
    try {
      console.log(`Attempt ${i + 1} of ${maxRetries}...`);
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      lastError = error;
      console.warn(`Attempt ${i + 1} failed:`, error.message);

      if (i < maxRetries - 1) {
        // Exponential backoff
        const waitTime = delayMs * Math.pow(2, i);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }
  }

  throw lastError;
}

// Usage
async function retryExample() {
  try {
    const data = await fetchWithRetry(
      'https://jsonplaceholder.typicode.com/posts/1',
      { method: 'GET' },
      3,
      1000
    );
    console.log('Success:', data);
  } catch (error) {
    console.error('Failed after retries:', error.message);
  }
}

// ============================================
// 8. PARALLEL REQUESTS WITH PROMISE.ALL
// ============================================

async function parallelFetches() {
  const urls = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2',
    'https://jsonplaceholder.typicode.com/users/1',
    'https://jsonplaceholder.typicode.com/comments/1'
  ];

  try {
    const promises = urls.map(url => 
      fetch(url).then(res => res.json())
    );

    const results = await Promise.all(promises);
    
    console.log('All requests completed:');
    results.forEach((data, index) => {
      console.log(`Result ${index + 1}:`, data.id || data.body);
    });

    return results;
  } catch (error) {
    console.error('Parallel Fetch Error:', error.message);
  }
}

// ============================================
// 9. RACE MULTIPLE REQUESTS
// ============================================

async function raceRequests() {
  const urls = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2',
    'https://jsonplaceholder.typicode.com/posts/3'
  ];

  try {
    const promises = urls.map(url => fetch(url).then(res => res.json()));
    const firstResult = await Promise.race(promises);
    
    console.log('Fastest response:', firstResult.id);
    return firstResult;
  } catch (error) {
    console.error('Race Error:', error.message);
  }
}

// ============================================
// 10. ERROR HANDLING PATTERNS
// ============================================

async function advancedErrorHandling() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/999');

    // Check if response is ok (status 200-299)
    if (!response.ok) {
      // Handle specific status codes
      if (response.status === 404) {
        throw new Error('Resource not found');
      } else if (response.status === 401) {
        throw new Error('Unauthorized - check your credentials');
      } else if (response.status === 500) {
        throw new Error('Server error - try again later');
      } else {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
      }
    }

    const data = await response.json();
    console.log('Success:', data);
    return data;
  } catch (error) {
    // Network errors vs HTTP errors
    if (error instanceof TypeError) {
      console.error('Network Error:', error.message);
    } else {
      console.error('HTTP Error:', error.message);
    }
  }
}

// ============================================
// 11. ABORT REQUEST MID-REQUEST
// ============================================

async function abortableRequest() {
  const controller = new AbortController();
  
  // Simulate user cancellation after 2 seconds
  const timeoutId = setTimeout(() => {
    console.log('Cancelling request...');
    controller.abort();
  }, 2000);

  try {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/posts/1',
      {
        signal: controller.signal
      }
    );

    clearTimeout(timeoutId);
    const data = await response.json();
    console.log('Completed:', data);
    return data;
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('Request was cancelled');
    } else {
      console.error('Fetch Error:', error.message);
    }
  }
}

// ============================================
// 12. INTERCEPTOR PATTERN (MANUAL)
// ============================================

class FetchWithInterceptors {
  constructor(baseURL = '') {
    this.baseURL = baseURL;
    this.requestInterceptors = [];
    this.responseInterceptors = [];
  }

  // Register request interceptor
  addRequestInterceptor(fn) {
    this.requestInterceptors.push(fn);
  }

  // Register response interceptor
  addResponseInterceptor(fn) {
    this.responseInterceptors.push(fn);
  }

  async request(endpoint, options = {}) {
    let url = `${this.baseURL}${endpoint}`;
    let config = { ...options };

    // Apply request interceptors
    for (const interceptor of this.requestInterceptors) {
      ({ url, config } = await interceptor(url, config));
    }

    try {
      let response = await fetch(url, config);

      // Apply response interceptors
      for (const interceptor of this.responseInterceptors) {
        response = await interceptor(response);
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Request Error:', error.message);
      throw error;
    }
  }

  async get(endpoint, options = {}) {
    return this.request(endpoint, { method: 'GET', ...options });
  }

  async post(endpoint, body, options = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
      ...options
    });
  }
}

// Usage with interceptors
async function interceptorExample() {
  const client = new FetchWithInterceptors('https://jsonplaceholder.typicode.com');

  // Add authentication header to all requests
  client.addRequestInterceptor(async (url, config) => {
    return {
      url,
      config: {
        ...config,
        headers: {
          ...config.headers,
          'Authorization': 'Bearer token123'
        }
      }
    };
  });

  // Log response status
  client.addResponseInterceptor(async (response) => {
    console.log(`Response status: ${response.status}`);
    return response;
  });

  try {
    const data = await client.get('/posts/1');
    console.log('Data:', data);
  } catch (error) {
    console.error('Interceptor example error:', error.message);
  }
}

// ============================================
// 13. STREAMING RESPONSE
// ============================================

async function streamResponse() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    // Read response as stream
    const reader = response.body.getReader();
    let receivedLength = 0;
    const chunks = [];

    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      chunks.push(value);
      receivedLength += value.length;
      console.log(`Received ${receivedLength} bytes...`);
    }

    // Combine chunks
    const chunksAll = new Uint8Array(receivedLength);
    let position = 0;
    for (const chunk of chunks) {
      chunksAll.set(chunk, position);
      position += chunk.length;
    }

    const result = new TextDecoder().decode(chunksAll);
    const data = JSON.parse(result);
    console.log(`Total received: ${data.length} items`);
    return data;
  } catch (error) {
    console.error('Stream Error:', error.message);
  }
}

// ============================================
// EXPORTS
// ============================================

module.exports = {
  basicGet,
  basicPost,
  FetchClient,
  requestWithAuthorization,
  requestWithQueryParams,
  requestWithObject,
  uploadFile,
  fetchWithTimeout,
  requestWithTimeoutExample,
  fetchWithRetry,
  retryExample,
  parallelFetches,
  raceRequests,
  advancedErrorHandling,
  abortableRequest,
  FetchWithInterceptors,
  interceptorExample,
  streamResponse
};

// ============================================
// DEMONSTRATION EXECUTION
// ============================================

if (require.main === module) {
  const runExamples = async () => {
    console.log('=== Fetch API Examples ===\n');

    // Uncomment individual examples to test:

    // console.log('1. Basic GET:');
    // await basicGet();

    // console.log('\n2. Basic POST:');
    // await basicPost();

    // console.log('\n3. Request with Authorization:');
    // await requestWithAuthorization();

    // console.log('\n4. Query Parameters:');
    // await requestWithQueryParams();

    // console.log('\n5. Request with Timeout:');
    // await requestWithTimeoutExample();

    // console.log('\n6. Retry Logic:');
    // await retryExample();

    // console.log('\n7. Parallel Requests:');
    // await parallelFetches();

    // console.log('\n8. Race Requests:');
    // await raceRequests();

    // console.log('\n9. Advanced Error Handling:');
    // await advancedErrorHandling();

    // console.log('\n10. Abortable Request:');
    // await abortableRequest();

    // console.log('\n11. Interceptor Example:');
    // await interceptorExample();

    // console.log('\n12. Stream Response:');
    // await streamResponse();

    console.log('Uncomment examples above to test them!');
  };

  runExamples().catch(console.error);
}
