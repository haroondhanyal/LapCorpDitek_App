const { test, expect } = require('@playwright/test');
const { OrdersSearchAPI } = require('../../apis/orders/orders.search.api');
const { AuthAPI } = require('../../auth/auth.api');

// Test data
const TEST_EMAIL = process.env.USER_EMAIL || 'rharoon@medzah.com';
const TEST_PASSWORD = process.env.USER_PASSWORD || 'password123';

test.describe('Orders Search API Tests', () => {
    let searchAPI;
    let authAPI;
    let authToken;

    test.beforeAll(async () => {
        console.log('🔐 Setting up authentication...');
        
        // Initialize APIs
        authAPI = new AuthAPI();
        searchAPI = new OrdersSearchAPI();
        
        // Method 1: If you already have token in .env
        if (process.env.API_TOKEN) {
            authToken = process.env.API_TOKEN;
            console.log('✅ Using token from .env file');
        } 
        // Method 2: Login via API to get fresh token
        else {
            try {
                console.log('🔑 Logging in to get token...');
                
                // Step 1: Login
                const loginRes = await authAPI.login({
                    email: TEST_EMAIL,
                    password: TEST_PASSWORD
                });
                
                expect(loginRes.status).toBe(200);
                console.log('✅ Login successful');
                
                // Step 2: Verify OTP (if required)
                // Note: You might need to handle OTP manually or use mock
                const otpRes = await authAPI.verifyOTP({
                    email: TEST_EMAIL,
                    otp: '123456' // Mock OTP or get from email
                });
                
                if (otpRes.token) {
                    authToken = otpRes.token;
                    console.log('✅ OTP verified, token received');
                } else {
                    console.log('⚠️  OTP verification not required or failed');
                }
                
            } catch (error) {
                console.error('❌ Authentication failed:', error.message);
                throw error;
            }
        }
    });

    test('TC001: Search orders with default parameters', async () => {
        console.log('🔍 Testing: POST /orders/search');
        
        const response = await searchAPI.searchOrders({
            pageNumber: 1,
            pageSize: 5
        });
        
        // Check response status
        expect(response.status()).toBe(200);
        console.log(`✅ Search API responded with status: ${response.status()}`);
        
        // Parse and validate response
        const responseBody = await response.json();
        console.log(`📊 Found ${responseBody.totalElements} total orders`);
        
        // Validate response structure
        expect(responseBody).toHaveProperty('totalElements');
        expect(responseBody).toHaveProperty('totalPages');
        expect(responseBody).toHaveProperty('pageSize');
        expect(responseBody).toHaveProperty('pageNumber');
        expect(responseBody).toHaveProperty('status', 200);
        expect(responseBody).toHaveProperty('message');
        expect(responseBody).toHaveProperty('data');
        expect(Array.isArray(responseBody.data)).toBe(true);
        
        // Log first few orders
        if (responseBody.data.length > 0) {
            console.log('📋 Sample orders:');
            responseBody.data.slice(0, 3).forEach((order, index) => {
                console.log(`  ${index + 1}. ${order.orderId} - ${order.orderStatus}`);
            });
        }
    });

    test('TC002: Get order details by ID', async () => {
        console.log('📋 Testing: GET /orders/details/{orderRefId}');
        
        // First search to get an order ID
        const searchRes = await searchAPI.searchOrders({ pageSize: 1 });
        const searchData = await searchRes.json();
        
        if (searchData.data.length === 0) {
            console.log('⚠️  No orders found, skipping details test');
            return;
        }
        
        const order = searchData.data[0];
        console.log(`🔍 Using order: ${order.orderId} (ID: ${order.id})`);
        
        // Get order details
        const detailsResponse = await searchAPI.getOrderDetails(order.id);
        expect(detailsResponse.status()).toBe(200);
        
        const orderDetails = await detailsResponse.json();
        console.log(`✅ Retrieved details for: ${orderDetails.orderId}`);
        
        // Validate details structure
        expect(orderDetails).toHaveProperty('id', order.id);
        expect(orderDetails).toHaveProperty('orderId', order.orderId);
        expect(orderDetails).toHaveProperty('orderStatus');
        expect(orderDetails).toHaveProperty('fullfillmentStatus');
        expect(orderDetails).toHaveProperty('quantity');
        
        // Check PDF paths if available
        if (orderDetails.trfMergedPath) {
            console.log(`📄 TRF PDF: ${orderDetails.trfMergedPath}`);
        }
        if (orderDetails.stickersMergedPath) {
            console.log(`🏷️  Stickers PDF: ${orderDetails.stickersMergedPath}`);
        }
    });

    test('TC003: Search with specific filters', async () => {
        console.log('🔍 Testing: Search with orderStatus filter');
        
        const response = await searchAPI.searchOrders({
            pageNumber: 1,
            pageSize: 10,
            orderStatus: 'Pending'  // Filter by status
        });
        
        expect(response.status()).toBe(200);
        
        const filteredData = await response.json();
        console.log(`📊 Found ${filteredData.totalElements} orders with 'Pending' status`);
        
        // Check if all returned orders have 'Pending' status
        if (filteredData.data.length > 0) {
            filteredData.data.forEach(order => {
                expect(order.orderStatus).toBe('Pending');
            });
            console.log(`✅ All ${filteredData.data.length} orders have 'Pending' status`);
        }
    });

    test('TC004: Test pagination', async () => {
        console.log('📄 Testing: Pagination functionality');
        
        // Get page 1
        const page1Res = await searchAPI.searchOrders({
            pageNumber: 1,
            pageSize: 3
        });
        
        const page1Data = await page1Res.json();
        const page1Orders = page1Data.data.map(o => o.id);
        
        // Get page 2
        const page2Res = await searchAPI.searchOrders({
            pageNumber: 2,
            pageSize: 3
        });
        
        const page2Data = await page2Res.json();
        const page2Orders = page2Data.data.map(o => o.id);
        
        // Check that pages have different orders
        const overlap = page1Orders.filter(id => page2Orders.includes(id));
        expect(overlap.length).toBe(0); // No overlapping orders between pages
        console.log(`✅ Pages 1 and 2 have different orders (overlap: ${overlap.length})`);
    });
});