/**
 * REST API DEFINITIONS - Complete Reference Guide
 * Comprehensive REST API concepts, HTTP methods, status codes, and examples
 */

// ===============================================
// 1. HTTP METHODS
// ===============================================

const HTTP_METHODS = {
  GET: {
    description: "Retrieve data from server",
    idempotent: true,
    safe: true,
    hasBody: false,
    example: "GET /api/users - Fetch all users"
  },
  POST: {
    description: "Create new resource on server",
    idempotent: false,
    safe: false,
    hasBody: true,
    example: "POST /api/users - Create new user"
  },
  PUT: {
    description: "Replace entire resource",
    idempotent: true,
    safe: false,
    hasBody: true,
    example: "PUT /api/users/1 - Replace user with id 1"
  },
  PATCH: {
    description: "Partially update resource",
    idempotent: false,
    safe: false,
    hasBody: true,
    example: "PATCH /api/users/1 - Update specific fields of user"
  },
  DELETE: {
    description: "Remove resource from server",
    idempotent: true,
    safe: false,
    hasBody: false,
    example: "DELETE /api/users/1 - Delete user with id 1"
  },
  HEAD: {
    description: "Like GET but no response body",
    idempotent: true,
    safe: true,
    hasBody: false,
    example: "HEAD /api/users - Check if endpoint exists"
  },
  OPTIONS: {
    description: "Describe communication options",
    idempotent: true,
    safe: true,
    hasBody: false,
    example: "OPTIONS /api/users - Get allowed methods"
  }
};

// ===============================================
// 2. HTTP STATUS CODES
// ===============================================

const HTTP_STATUS_CODES = {
  // 1xx - Informational
  100: { name: "Continue", description: "Request received, continue with body" },
  101: { name: "Switching Protocols", description: "Server switching protocols" },

  // 2xx - Success
  200: { name: "OK", description: "Request succeeded" },
  201: { name: "Created", description: "Resource created successfully" },
  202: { name: "Accepted", description: "Request accepted for processing" },
  204: { name: "No Content", description: "Successful request, no content to return" },

  // 3xx - Redirection
  300: { name: "Multiple Choices", description: "Multiple options available" },
  301: { name: "Moved Permanently", description: "Resource moved to new URL" },
  302: { name: "Found", description: "Temporary redirect" },
  304: { name: "Not Modified", description: "Resource not modified since last request" },

  // 4xx - Client Error
  400: { name: "Bad Request", description: "Invalid request syntax" },
  401: { name: "Unauthorized", description: "Authentication required" },
  403: { name: "Forbidden", description: "Authenticated but not authorized" },
  404: { name: "Not Found", description: "Resource not found" },
  405: { name: "Method Not Allowed", description: "HTTP method not allowed" },
  409: { name: "Conflict", description: "Request conflicts with server state" },
  422: { name: "Unprocessable Entity", description: "Validation failed" },
  429: { name: "Too Many Requests", description: "Rate limit exceeded" },

  // 5xx - Server Error
  500: { name: "Internal Server Error", description: "Server encountered error" },
  501: { name: "Not Implemented", description: "Functionality not implemented" },
  502: { name: "Bad Gateway", description: "Invalid response from upstream" },
  503: { name: "Service Unavailable", description: "Server temporarily unavailable" }
};

// ===============================================
// 3. REQUEST STRUCTURE
// ===============================================

const REQUEST_STRUCTURE = {
  method: "POST",
  url: "https://api.example.com/v1/users",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer token123",
    "User-Agent": "MyApp/1.0"
  },
  body: {
    name: "John Doe",
    email: "john@example.com",
    age: 30
  },
  query: {
    sort: "created_at",
    order: "desc",
    limit: 10,
    page: 1
  }
};

// ===============================================
// 4. RESPONSE STRUCTURE
// ===============================================

const RESPONSE_STRUCTURE = {
  status: 200,
  statusText: "OK",
  headers: {
    "Content-Type": "application/json",
    "X-Total-Count": "100",
    "Link": "</api/users?page=2>; rel=\"next\""
  },
  body: {
    success: true,
    data: {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      created_at: "2024-01-15T10:30:00Z"
    },
    metadata: {
      timestamp: "2024-01-15T10:35:00Z",
      version: "1.0"
    }
  }
};

// ===============================================
// 5. COMMON API PATTERNS
// ===============================================

const API_PATTERNS = {
  // REST Collection Endpoints
  "GET /api/resource": "List all resources",
  "GET /api/resource/:id": "Get specific resource",
  "POST /api/resource": "Create new resource",
  "PUT /api/resource/:id": "Replace entire resource",
  "PATCH /api/resource/:id": "Update resource partially",
  "DELETE /api/resource/:id": "Delete specific resource",
  "DELETE /api/resource": "Delete all resources (bulk delete)",

  // Query Parameters
  "GET /api/resource?limit=10&offset=0": "Pagination",
  "GET /api/resource?sort=-created_at": "Sorting (- for descending)",
  "GET /api/resource?filter[status]=active": "Filtering",
  "GET /api/resource?search=keyword": "Search",
  "GET /api/resource?fields=id,name,email": "Field selection",

  // Nested Resources
  "GET /api/users/:userId/posts": "Get user's posts",
  "POST /api/users/:userId/posts": "Create post for user",
  "GET /api/users/:userId/posts/:postId": "Get specific post by specific user",
  "DELETE /api/users/:userId/posts/:postId": "Delete user's post",

  // Actions/Operations
  "POST /api/resource/:id/verify": "Custom action on resource",
  "POST /api/resource/:id/publish": "Another custom action",
  "POST /api/resource/batch-delete": "Bulk operations"
};

// ===============================================
// 6. AUTHENTICATION METHODS
// ===============================================

const AUTHENTICATION_TYPES = {
  "No Auth": {
    example: "Public endpoints",
    headers: {}
  },
  "API Key": {
    example: "Simple API key authentication",
    header: { "X-API-Key": "your-api-key-here" }
  },
  "Bearer Token": {
    example: "JWT or OAuth token",
    header: { "Authorization": "Bearer eyJhbGc..." }
  },
  "Basic Auth": {
    example: "Base64 encoded credentials",
    header: { "Authorization": "Basic dXNlcm5hbWU6cGFzc3dvcmQ=" }
  },
  "OAuth 2.0": {
    example: "OAuth2 token flow",
    header: { "Authorization": "Bearer access_token_here" }
  }
};

// ===============================================
// 7. REQUEST EXAMPLES
// ===============================================

const FETCH_EXAMPLES = {
  // GET Request
  simpleGet: `
    fetch('https://api.example.com/api/users')
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  `,

  // GET with parameters
  getWithParams: `
    const params = new URLSearchParams({
      limit: 10,
      page: 1,
      sort: 'created_at'
    });
    fetch('https://api.example.com/api/users?' + params)
      .then(response => response.json())
      .then(data => console.log(data));
  `,

  // POST Request
  postRequest: `
    fetch('https://api.example.com/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer token123'
      },
      body: JSON.stringify({
        name: 'John Doe',
        email: 'john@example.com'
      })
    })
      .then(response => response.json())
      .then(data => console.log('Created:', data));
  `,

  // PUT Request (Replace)
  putRequest: `
    fetch('https://api.example.com/api/users/1', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer token123'
      },
      body: JSON.stringify({
        name: 'Jane Doe',
        email: 'jane@example.com'
      })
    })
      .then(response => response.json())
      .then(data => console.log('Updated:', data));
  `,

  // PATCH Request (Partial Update)
  patchRequest: `
    fetch('https://api.example.com/api/users/1', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer token123'
      },
      body: JSON.stringify({
        email: 'newemail@example.com'
      })
    })
      .then(response => response.json())
      .then(data => console.log('Patched:', data));
  `,

  // DELETE Request
  deleteRequest: `
    fetch('https://api.example.com/api/users/1', {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer token123'
      }
    })
      .then(response => response.json())
      .then(data => console.log('Deleted:', data));
  `,

  // Request with Error Handling
  withErrorHandling: `
    async function apiCall() {
      try {
        const response = await fetch('https://api.example.com/api/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error(\`HTTP error! status: \${response.status}\`);
        }
        
        const data = await response.json();
        console.log('Success:', data);
        return data;
      } catch (error) {
        console.error('Error:', error.message);
      }
    }
  `
};

// ===============================================
// 8. RESPONSE EXAMPLES
// ===============================================

const RESPONSE_EXAMPLES = {
  successList: {
    statusCode: 200,
    body: {
      success: true,
      data: [
        { id: 1, name: "User 1", email: "user1@example.com" },
        { id: 2, name: "User 2", email: "user2@example.com" }
      ],
      metadata: {
        total: 2,
        page: 1,
        limit: 10
      }
    }
  },

  successCreate: {
    statusCode: 201,
    body: {
      success: true,
      message: "Resource created successfully",
      data: {
        id: 3,
        name: "New User",
        email: "new@example.com",
        created_at: "2024-01-15T10:30:00Z"
      }
    }
  },

  successUpdate: {
    statusCode: 200,
    body: {
      success: true,
      message: "Resource updated successfully",
      data: {
        id: 1,
        name: "Updated User",
        email: "updated@example.com",
        updated_at: "2024-01-15T10:35:00Z"
      }
    }
  },

  successDelete: {
    statusCode: 204,
    body: null
  },

  errorBadRequest: {
    statusCode: 400,
    body: {
      success: false,
      error: "Bad Request",
      message: "Invalid request parameters",
      details: {
        email: "Email is required",
        age: "Age must be a number"
      }
    }
  },

  errorUnauthorized: {
    statusCode: 401,
    body: {
      success: false,
      error: "Unauthorized",
      message: "Authentication required. Please provide valid token."
    }
  },

  errorForbidden: {
    statusCode: 403,
    body: {
      success: false,
      error: "Forbidden",
      message: "You do not have permission to access this resource"
    }
  },

  errorNotFound: {
    statusCode: 404,
    body: {
      success: false,
      error: "Not Found",
      message: "The requested resource was not found"
    }
  },

  errorServerError: {
    statusCode: 500,
    body: {
      success: false,
      error: "Internal Server Error",
      message: "An unexpected error occurred"
    }
  }
};

// ===============================================
// 9. RESTful API BEST PRACTICES
// ===============================================

const BEST_PRACTICES = {
  resources: "Use nouns for endpoints, not verbs (/users not /getUsers)",
  httpMethods: "Use appropriate HTTP methods for operations",
  statusCodes: "Return meaningful HTTP status codes",
  versioning: "Version your API (/v1/users, /v2/users)",
  consistency: "Maintain consistent naming and structure",
  pagination: "Implement pagination for large datasets",
  filtering: "Support filtering and sorting",
  documentation: "Document all endpoints and parameters",
  validation: "Validate input data before processing",
  errorHandling: "Return consistent error responses",
  authentication: "Authenticate all protected endpoints",
  cors: "Configure CORS appropriately",
  rateLimit: "Implement rate limiting for protection",
  caching: "Use caching headers when appropriate",
  security: "Use HTTPS for all endpoints",
  idempotency: "Make operations idempotent where possible"
};

// ===============================================
// 10. AXIOS EXAMPLES (Alternative to Fetch)
// ===============================================

const AXIOS_EXAMPLES = {
  // GET Request
  axiosGet: `
    axios.get('https://api.example.com/api/users')
      .then(response => console.log(response.data))
      .catch(error => console.error(error));
  `,

  // POST Request
  axiosPost: `
    axios.post('https://api.example.com/api/users', {
      name: 'John Doe',
      email: 'john@example.com'
    }, {
      headers: { 'Authorization': 'Bearer token123' }
    })
      .then(response => console.log(response.data))
      .catch(error => console.error(error));
  `,

  // PUT Request
  axiosPut: `
    axios.put('https://api.example.com/api/users/1', {
      name: 'Jane Doe'
    }, {
      headers: { 'Authorization': 'Bearer token123' }
    })
      .then(response => console.log(response.data))
      .catch(error => console.error(error));
  `,

  // PATCH Request
  axiosPatch: `
    axios.patch('https://api.example.com/api/users/1', {
      email: 'newemail@example.com'
    }, {
      headers: { 'Authorization': 'Bearer token123' }
    })
      .then(response => console.log(response.data))
      .catch(error => console.error(error));
  `,

  // DELETE Request
  axiosDelete: `
    axios.delete('https://api.example.com/api/users/1', {
      headers: { 'Authorization': 'Bearer token123' }
    })
      .then(response => console.log(response.data))
      .catch(error => console.error(error));
  `,

  // Request with Config
  axiosConfig: `
    const api = axios.create({
      baseURL: 'https://api.example.com',
      timeout: 10000,
      headers: {
        'Authorization': 'Bearer token123',
        'Content-Type': 'application/json'
      }
    });

    api.get('/api/users')
      .then(response => console.log(response.data))
      .catch(error => console.error(error));
  `
};

// ===============================================
// 11. COMMON ERROR SCENARIOS
// ===============================================

const ERROR_SCENARIOS = {
  invalidPayload: {
    scenario: "Sending invalid or malformed data",
    statusCode: 400,
    solution: "Validate and format data correctly before sending"
  },
  missingAuth: {
    scenario: "No or invalid authentication credentials",
    statusCode: 401,
    solution: "Ensure valid token/credentials are provided"
  },
  insufficientPermissions: {
    scenario: "User authenticated but lacks permissions",
    statusCode: 403,
    solution: "Ensure user has required permissions/roles"
  },
  resourceNotFound: {
    scenario: "Requesting non-existent resource",
    statusCode: 404,
    solution: "Verify resource ID and endpoint URL"
  },
  methodNotAllowed: {
    scenario: "Using wrong HTTP method for endpoint",
    statusCode: 405,
    solution: "Use correct HTTP method (GET, POST, etc.)"
  },
  rateLimitExceeded: {
    scenario: "Too many requests in short time",
    statusCode: 429,
    solution: "Implement retry logic with exponential backoff"
  },
  serverError: {
    scenario: "Server-side error",
    statusCode: 500,
    solution: "Check server logs and retry after delay"
  }
};

// ===============================================
// 12. PAGINATION STRATEGIES
// ===============================================

const PAGINATION_STRATEGIES = {
  offsetLimit: {
    example: "/api/users?offset=0&limit=10",
    pros: "Simple, easy to understand",
    cons: "Inefficient for large datasets"
  },
  pageSize: {
    example: "/api/users?page=1&size=10",
    pros: "User-friendly, good for UI",
    cons: "Can be affected by data changes"
  },
  cursorBased: {
    example: "/api/users?cursor=abc123&limit=10",
    pros: "Efficient, handles data changes well",
    cons: "More complex to implement"
  },
  keyset: {
    example: "/api/users?after=2024-01-15&limit=10",
    pros: "Very efficient, stable ordering",
    cons: "Requires unique ordering field"
  }
};

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    HTTP_METHODS,
    HTTP_STATUS_CODES,
    REQUEST_STRUCTURE,
    RESPONSE_STRUCTURE,
    API_PATTERNS,
    AUTHENTICATION_TYPES,
    FETCH_EXAMPLES,
    RESPONSE_EXAMPLES,
    BEST_PRACTICES,
    AXIOS_EXAMPLES,
    ERROR_SCENARIOS,
    PAGINATION_STRATEGIES
  };
}
