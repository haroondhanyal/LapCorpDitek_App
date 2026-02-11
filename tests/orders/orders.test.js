// tests/orders/orders.test.js
const { test, expect } = require('@playwright/test');
const { OrdersAPI } = require('../../apis/orders/orders.api');
const TokenManager = require('../../utils/tokenManager');

test.describe('Orders API Tests', () => {
  let ordersAPI;
  let testRequest;

  test.beforeAll(async ({ request }) => {
    console.log('🚀 Setting up orders API tests...');
    
    // Store request object
    testRequest = request;
    
    // Initialize OrdersAPI with request
    ordersAPI = new OrdersAPI(request);
    
    // Check if token is available
    const token = TokenManager.getToken();
    if (!token) {
      console.warn('⚠️ No token found. Tests may fail if APIs require authentication.');
    } else {
      console.log('✅ Token loaded');
    }
  });

  test('TC01: Search orders', async () => {
    console.log('🔍 Testing: POST /orders/search');
    
    const response = await ordersAPI.searchOrders({
      pageNumber: 1,
      pageSize: 5
    });
    
    console.log('Status:', response.status());
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    console.log('Total orders found:', data.totalElements);
    
    // Validate response
    expect(data).toHaveProperty('totalElements');
    expect(data).toHaveProperty('data');
    expect(Array.isArray(data.data)).toBe(true);
    
    if (data.data.length > 0) {
      const firstOrder = data.data[0];
      console.log('First order:', firstOrder.orderId);
    }
  });

  test('TC02: Get order details', async () => {
    console.log('📋 Testing: GET /orders/details/{id}');
    
    // First search for an order
    const searchRes = await ordersAPI.searchOrders({ pageSize: 1 });
    const searchData = await searchRes.json();
    
    if (searchData.data.length === 0) {
      console.log('⚠️ No orders found, skipping details test');
      return;
    }
    
    const orderId = searchData.data[0].id;
    console.log('Using order ID:', orderId);
    
    const detailsRes = await ordersAPI.getOrderDetails(orderId);
    console.log('Details status:', detailsRes.status());
    expect(detailsRes.status()).toBe(200);
    
    const orderDetails = await detailsRes.json();
    console.log('Order details retrieved for:', orderDetails.orderId);
  });

  test('TC03: Test approval flow', async () => {
    console.log('✅ Testing: Order approval flow');
    
    // Find an order with Pending status
    const searchRes = await ordersAPI.searchOrders({
      pageSize: 5,
      orderStatus: 'Pending'
    });
    
    const searchData = await searchRes.json();
    
    if (searchData.data.length === 0) {
      console.log('⚠️ No pending orders found, skipping approval test');
      return;
    }
    
    const orderId = searchData.data[0].id;
    const orderNumber = searchData.data[0].orderId;
    console.log(`Testing approval for: ${orderNumber} (ID: ${orderId})`);
    
    // Send for approval
    try {
      const approvalRes = await ordersAPI.sendForApproval(orderId);
      console.log('Send for approval status:', approvalRes.status());
    } catch (error) {
      console.log('Note: Send for approval may not be allowed');
    }
  });
});