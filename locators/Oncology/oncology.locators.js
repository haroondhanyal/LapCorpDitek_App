export const oncologyLocators = {

  oncologyModule: page =>
    page.getByRole('button', { name: 'Oncology' }),

  createBulkOrdersButton: page =>
    page.getByRole('button', { name: 'Create Bulk Orders' }),

  addToCartButton: page =>
    page.getByRole('button', { name: 'Add to Cart' }),

  cartIcon: page =>
    page.getByRole('img', { name: 'Cart' }),

  goToCheckoutButton: page =>
    page.getByRole('button', { name: 'Go to Checkout' }),

  headerCheckoutButton: page =>
    page.locator('button').filter({ hasText: 'Checkout' }).first(),

  placeOrderButton: page =>
    page.getByRole('button', { name: 'Place Order' })
};
