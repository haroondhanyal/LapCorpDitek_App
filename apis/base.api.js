const { getToken } = require('../utils/tokenManager');

class BaseAPI {
  constructor(request) {
    this.request = request;
    this.BASE_URL = 'https://labcorpwebapis-f9ephua7b7fgfbez.eastus2-01.azurewebsites.net';
    this.debug = process.env.DEBUG === 'true' || false;
  }

  _addAuthHeader(options) {
    const token = getToken();
    if (!options.headers) options.headers = {};
    if (token) options.headers['Authorization'] = `Bearer ${token}`;
    return options;
  }

  post(url, params = {}, data = null, options = {}) {
    const queryString = new URLSearchParams(params).toString();
    const fullUrl = queryString ? `${url}?${queryString}` : url;
    
    if (data) options.data = data;
    
    if (this.debug) {
      console.log(`📤 POST: ${this.BASE_URL}${fullUrl}`);
      console.log(`📤 Params: ${JSON.stringify(params)}`);
    }
    
    return this.request.post(`${this.BASE_URL}${fullUrl}`, this._addAuthHeader(options));
  }

  get(url, params = {}, options = {}) {
    const queryString = new URLSearchParams(params).toString();
    const fullUrl = queryString ? `${url}?${queryString}` : url;
    return this.request.get(`${this.BASE_URL}${fullUrl}`, this._addAuthHeader(options));
  }

  put(url, params = {}, data = null, options = {}) {
    const queryString = new URLSearchParams(params).toString();
    const fullUrl = queryString ? `${url}?${queryString}` : url;
    
    if (data) options.data = data;
    return this.request.put(`${this.BASE_URL}${fullUrl}`, this._addAuthHeader(options));
  }

  delete(url, params = {}, options = {}) {
    const queryString = new URLSearchParams(params).toString();
    const fullUrl = queryString ? `${url}?${queryString}` : url;
    return this.request.delete(`${this.BASE_URL}${fullUrl}`, this._addAuthHeader(options));
  }
}

module.exports = { BaseAPI };









// apis/users/base.api.js


// const { getToken } = require('../../utils/tokenManager');

// class BaseAPI {
//   constructor(request) {
//     this.request = request;
//     this.BASE_URL = process.env.BASE_URL || 'https://labcorpwebapis-f9ephua7b7fgfbez.eastus2-01.azurewebsites.net';
//     this.debug = process.env.DEBUG === 'true' || false;
//   }

//   _addAuthHeader(options) {
//     const token = getToken();
//     if (!options.headers) options.headers = {};
//     if (token) {
//       options.headers['Authorization'] = `Bearer ${token}`;
//     } else {
//       console.warn('⚠️ No token found. API call will be made without authorization.');
//     }
//     return options;
//   }

//   post(url, params = {}, data = null, options = {}) {
//     const queryString = new URLSearchParams(params).toString();
//     const fullUrl = queryString ? `${url}?${queryString}` : url;
    
//     if (data) options.data = data;
    
//     if (this.debug) {
//       console.log(`📤 POST: ${this.BASE_URL}${fullUrl}`);
//       if (data) console.log(`📦 Body: ${JSON.stringify(data)}`);
//     }
    
//     return this.request.post(`${this.BASE_URL}${fullUrl}`, this._addAuthHeader(options));
//   }

//   get(url, params = {}, options = {}) {
//     const queryString = new URLSearchParams(params).toString();
//     const fullUrl = queryString ? `${url}?${queryString}` : url;
    
//     if (this.debug) {
//       console.log(`📥 GET: ${this.BASE_URL}${fullUrl}`);
//     }
    
//     return this.request.get(`${this.BASE_URL}${fullUrl}`, this._addAuthHeader(options));
//   }

//   put(url, params = {}, data = null, options = {}) {
//     const queryString = new URLSearchParams(params).toString();
//     const fullUrl = queryString ? `${url}?${queryString}` : url;
    
//     if (data) options.data = data;
    
//     if (this.debug) {
//       console.log(`🔄 PUT: ${this.BASE_URL}${fullUrl}`);
//       if (data) console.log(`📦 Body: ${JSON.stringify(data)}`);
//     }
    
//     return this.request.put(`${this.BASE_URL}${fullUrl}`, this._addAuthHeader(options));
//   }

//   delete(url, params = {}, options = {}) {
//     const queryString = new URLSearchParams(params).toString();
//     const fullUrl = queryString ? `${url}?${queryString}` : url;
    
//     if (this.debug) {
//       console.log(`🗑️ DELETE: ${this.BASE_URL}${fullUrl}`);
//     }
    
//     return this.request.delete(`${this.BASE_URL}${fullUrl}`, this._addAuthHeader(options));
//   }
// }

// module.exports = { BaseAPI };