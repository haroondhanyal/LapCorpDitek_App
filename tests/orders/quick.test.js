const { test, expect } = require('@playwright/test');

test('Quick search orders test', async ({ request }) => {
  console.log('🚀 Quick test: Search orders');
  
  // Get token from .env
  const token = process.env.API_TOKEN;
  
  const response = await request.post('/orders/search', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    data: {
      pageNumber: 1,
      pageSize: 5
    }
  });
  
  console.log('Status:', response.status());
  expect(response.status()).toBe(200);
  
  const data = await response.json();
  console.log('Total orders:', data.totalElements);
  console.log('First order:', data.data[0]?.orderId);
  
  // Also test details if we have an order
  if (data.data.length > 0) {
    const orderId = data.data[0].id;
    const detailsRes = await request.get(`/orders/details/${orderId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Details status:', detailsRes.status());
    expect(detailsRes.status()).toBe(200);
  }
});