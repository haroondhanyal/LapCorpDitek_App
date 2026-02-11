const { request } = require('@playwright/test');
require('dotenv').config();

/**
 * ORDERS TRACKING & NOTES API
 */
class OrdersTrackingAPI {
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
    // 1. NOTES MANAGEMENT
    // ====================
    async getNotesHistory(orderId) {
        const context = await this.getContext();
        return await context.get(`${this.baseURL}/orders/get-order-notes-history/${orderId}`, {
            headers: this.getHeaders()
        });
    }

    async addNote(orderId, noteText, createdBy) {
        // Assuming you have an endpoint to add notes
        const context = await this.getContext();
        return await context.post(`${this.baseURL}/orders/add-note`, {
            headers: this.getHeaders(),
            data: {
                orderId,
                note: noteText,
                createdBy
            }
        });
    }

    async updateNote(noteId, noteData) {
        const context = await this.getContext();
        return await context.put(`${this.baseURL}/orders/update-order-notes/${noteId}`, {
            headers: this.getHeaders(),
            data: noteData
        });
    }

    async deleteNote(noteId) {
        const context = await this.getContext();
        return await context.delete(`${this.baseURL}/orders/delete-order-notes/${noteId}`, {
            headers: this.getHeaders()
        });
    }
}

module.exports = { OrdersTrackingAPI };