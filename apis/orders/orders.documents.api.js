const { request } = require('@playwright/test');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

/**
 * ORDERS DOCUMENTS API - All PDF related endpoints
 */
class OrdersDocumentsAPI {
    constructor(token) {
        this.baseURL = process.env.BASE_URL || 'https://api.example.com';
        this.token = token;
        this.downloadDir = path.join(__dirname, '../../downloads');
        
        // Create downloads folder if not exists
        if (!fs.existsSync(this.downloadDir)) {
            fs.mkdirSync(this.downloadDir, { recursive: true });
        }
    }

    getHeaders() {
        return {
            'Authorization': `Bearer ${this.token}`,
            'Accept': 'application/pdf'
        };
    }

    async getContext() {
        return await request.newContext();
    }

    // ====================
    // 1. PDF DOWNLOADS
    // ====================
    async downloadTRFForm(orderId, saveAs = '') {
        const context = await this.getContext();
        const response = await context.get(`${this.baseURL}/orders/trf-form-pdf/${orderId}`, {
            headers: this.getHeaders()
        });
        
        if (saveAs) {
            await this.savePDF(response, saveAs);
        }
        return response;
    }

    async downloadShippingLabel(orderId, saveAs = '') {
        const context = await this.getContext();
        const response = await context.get(`${this.baseURL}/orders/shipping-label-pdf/${orderId}`, {
            headers: this.getHeaders()
        });
        
        if (saveAs) {
            await this.savePDF(response, saveAs);
        }
        return response;
    }

    async downloadReturnLabel(orderId, saveAs = '') {
        const context = await this.getContext();
        const response = await context.get(`${this.baseURL}/orders/return-label-pdf/${orderId}`, {
            headers: this.getHeaders()
        });
        
        if (saveAs) {
            await this.savePDF(response, saveAs);
        }
        return response;
    }

    async downloadStickerPDF(orderId, saveAs = '') {
        const context = await this.getContext();
        const response = await context.get(`${this.baseURL}/orders/sticker-pdf/${orderId}`, {
            headers: this.getHeaders()
        });
        
        if (saveAs) {
            await this.savePDF(response, saveAs);
        }
        return response;
    }

    async downloadConsolidatedPDF(saveAs = '') {
        const context = await this.getContext();
        const response = await context.get(`${this.baseURL}/orders/consolidated-asset-pdf`, {
            headers: this.getHeaders()
        });
        
        if (saveAs) {
            await this.savePDF(response, saveAs);
        }
        return response;
    }

    // ====================
    // 2. UTILITY METHODS
    // ====================
    async savePDF(response, fileName) {
        const buffer = await response.body();
        const filePath = path.join(this.downloadDir, fileName);
        fs.writeFileSync(filePath, buffer);
        console.log(`PDF saved: ${filePath}`);
    }

    async downloadTrackingReport(orderId, format = 'csv', saveAs = '') {
        const context = await this.getContext();
        const response = await context.post(`${this.baseURL}/orders/tracking-reports/${orderId}/${format}`, {
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Accept': format === 'csv' ? 'text/csv' : 'application/pdf'
            }
        });
        
        if (saveAs) {
            const buffer = await response.body();
            const filePath = path.join(this.downloadDir, saveAs);
            fs.writeFileSync(filePath, buffer);
            console.log(`Report saved: ${filePath}`);
        }
        return response;
    }
}

module.exports = { OrdersDocumentsAPI };