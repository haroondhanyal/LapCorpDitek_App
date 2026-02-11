const { request } = require('@playwright/test');
require('dotenv').config();

class OrdersAPI {
  constructor() {
    this.baseURL = process.env.BASE_URL || 'https://labcorpwebapis-f9ephua7b7fgfbez.eastus2-01.azurewebsites.net';
    this.token = process.env.API_TOKEN;
    console.log('✅ OrdersAPI initialized with baseURL:', this.baseURL);
  }

  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    } else {
      console.warn('⚠️ No API_TOKEN found in .env file');
    }
    
    return headers;
  }

  async searchOrders(params = {}) {
    const defaultParams = {
      pageNumber: 1,
      pageSize: 10,
      sortBy: 'orderCreatedAt',
      sortOrder: 'desc'
    };
    
    const finalParams = { ...defaultParams, ...params };
    
    console.log('🔍 POST /orders/search with params:', finalParams);
    
    const response = await request.post(`${this.baseURL}/orders/search`, {
      headers: this.getHeaders(),
      data: finalParams
    });
    
    console.log('📊 Search response status:', response.status());
    return response;
  }

  async getOrderDetails(orderId) {
    console.log(`📋 GET /orders/details/${orderId}`);
    
    const response = await request.get(`${this.baseURL}/orders/details/${orderId}`, {
      headers: this.getHeaders()
    });
    
    console.log('📄 Details response status:', response.status());
    return response;
  }
}

module.exports = { OrdersAPI };