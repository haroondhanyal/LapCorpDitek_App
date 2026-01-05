import { BulkOrderCreationPage } from '../pages/OncologyFlow/bulkOrderCreation.page';

test('bulk oncology order', async ({ page }) => {

  const bulkOrder = new BulkOrderCreationPage(page);

  await bulkOrder.openOncologyModule();
  await bulkOrder.clickCreateBulkOrders();
  await bulkOrder.addToCart();
  await bulkOrder.openCart();
  await bulkOrder.goToCheckout();
  await bulkOrder.placeOrder();

});
