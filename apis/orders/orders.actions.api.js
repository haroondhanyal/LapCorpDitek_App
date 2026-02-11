const { request } = require('@playwright/test');
require('dotenv').config();

/**
 * ORDERS ACTIONS API - Approve, Reject, Cancel, etc.
 */
class OrdersActionsAPI {
    constructor(token) {
        this.baseURL = process.env.BASE_URL || 'https://api.example.com';
        this.token = token;
    }

    getHeaders() {
        return {
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json'
        };
    }

    async getContext() {
        return await request.newContext();
    }

    // ====================
    // 1. APPROVAL FLOW
    // ====================
    async sendForApproval(orderId) {
        const context = await this.getContext();
        return await context.post(`${this.baseURL}/orders/send-order-for-approval/${orderId}`, {
            headers: this.getHeaders()
        });
    }

    async approveOrder(orderId) {
        const context = await this.getContext();
        return await context.post(`${this.baseURL}/orders/approve-order/${orderId}`, {
            headers: this.getHeaders()
        });
    }

    async rejectOrder(orderId, reason = '') {
        const context = await this.getContext();
        return await context.post(`${this.baseURL}/orders/reject-order/${orderId}`, {
            headers: this.getHeaders(),
            data: { reason }
        });
    }

    async cancelOrder(orderId, reason = '') {
        const context = await this.getContext();
        return await context.post(`${this.baseURL}/orders/cancel-order/${orderId}`, {
            headers: this.getHeaders(),
            data: { reason }
        });
    }

    // ====================
    // 2. STICKER & ASSETS
    // ====================
    async addStickerInfo(orderId, stickerData) {
        const context = await this.getContext();
        return await context.post(`${this.baseURL}/orders/add-sticker-info/${orderId}`, {
            headers: this.getHeaders(),
            data: stickerData
        });
    }

    async logAssetAccess(orderId) {
        const context = await this.getContext();
        return await context.post(`${this.baseURL}/orders/log-view-order-asset/${orderId}`, {
            headers: this.getHeaders()
        });
    }
}

module.exports = { OrdersActionsAPI };