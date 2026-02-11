// let currentToken = null;

// function setToken(token) {
//   currentToken = token;
//   console.log('✅ Token saved:', token?.access_token?.substring(0, 20) + '...');
// }

// function getToken() {
//   return currentToken?.access_token;
// }

// module.exports = { setToken, getToken };


// utils/tokenManager.js
const fs = require('fs');
const path = require('path');

let currentToken = process.env.API_TOKEN || null;

const TokenManager = {
  setToken(token) {
    currentToken = token;
    // Optional: Save to file for persistence
    if (process.env.SAVE_TOKEN === 'true') {
      fs.writeFileSync(
        path.join(__dirname, '..', '.token'),
        token,
        'utf8'
      );
    }
    return token;
  },

  getToken() {
    // First check current token
    if (currentToken) {
      return currentToken;
    }
    
    // Then check environment variable
    if (process.env.API_TOKEN) {
      currentToken = process.env.API_TOKEN;
      return currentToken;
    }
    
    // Then check saved token file
    try {
      const tokenFile = path.join(__dirname, '..', '.token');
      if (fs.existsSync(tokenFile)) {
        currentToken = fs.readFileSync(tokenFile, 'utf8').trim();
        return currentToken;
      }
    } catch (error) {
      // Ignore file errors
    }
    
    // No token found
    return null;
  },

  clearToken() {
    currentToken = null;
    try {
      const tokenFile = path.join(__dirname, '..', '.token');
      if (fs.existsSync(tokenFile)) {
        fs.unlinkSync(tokenFile);
      }
    } catch (error) {
      // Ignore file errors
    }
  }
};

module.exports = TokenManager;