export class BasePage {
  constructor(page) {
    this.page = page
  }

  getLocator(selectorObj) {
    if (typeof selectorObj === 'string') {
      return this.page.locator(selectorObj)
    }

    return this.page.locator(
      selectorObj.primary ||
      selectorObj.fallback ||
      selectorObj.accessibility
    )
  }

  async visit(url) {
    await this.page.goto(url, { waitUntil: 'networkidle' })
  }
}
