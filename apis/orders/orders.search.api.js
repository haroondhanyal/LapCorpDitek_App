const { request } = require('@playwright/test');
require('dotenv').config();

class OrdersSearchAPI {
    constructor() {
        this.baseURL = process.env.BASE_URL || 'https://labcorpwebapis-f9ephua7b7fgfbez.eastus2-01.azurewebsites.net';
        this.token = process.env.API_TOKEN;
    }

    getHeaders() {
        if (!this.token) {
            throw new Error('Token not set. Set API_TOKEN in .env file');
        }
        return {
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json'
        };
    }

    async getContext() {
        return await request.newContext();
    }

    /**
     * POST /orders/search - Search orders
     */
    async searchOrders(searchParams = {}) {
        const context = await this.getContext();
        
        // Default parameters
        const defaultParams = {
            pageNumber: 1,
            pageSize: 10,
            sortBy: 'orderCreatedAt',
            sortOrder: 'desc'
        };

        const finalParams = { ...defaultParams, ...searchParams };
        
        console.log('🔍 Searching orders with params:', finalParams);
        
        const response = await context.post(`${this.baseURL}/orders/search`, {
            headers: this.getHeaders(),
            data: finalParams
        });
        
        return response;
    }

    /**
     * GET /orders/details/{orderRefId} - Get order details
     */
    async getOrderDetails(orderRefId) {
        const context = await this.getContext();
        
        console.log(`📋 Getting details for order ID: ${orderRefId}`);
        
        const response = await context.get(`${this.baseURL}/orders/details/${orderRefId}`, {
            headers: this.getHeaders()
        });
        
        return response;
    }

    /**
     * POST /orders/extended-details - Get extended details
     */
    async getExtendedDetails(orderIds) {
        const context = await this.getContext();
        
        const data = { orderIds: Array.isArray(orderIds) ? orderIds : [orderIds] };
        console.log('🔍 Getting extended details for:', data);
        
        const response = await context.post(`${this.baseURL}/orders/extended-details`, {
            headers: this.getHeaders(),
            data: data
        });
        
        return response;
    }
}

module.exports = { OrdersSearchAPI };