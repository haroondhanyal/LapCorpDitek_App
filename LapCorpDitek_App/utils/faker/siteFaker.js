import { faker } from '@faker-js/faker';

export const generateSiteFormData = () => {

   const date = faker.date.soon(10)

  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return {

    // ⭐ Site Info
    siteNumber: faker.string.numeric(6),
    siteName: faker.company.name(),

    siteAddress1: faker.location.streetAddress(),
    siteAddress2: faker.location.secondaryAddress(),

    siteCity: faker.location.city(),
    siteState: faker.location.state(),
    siteZipCode: faker.string.numeric(5)
,

    country: faker.location.country(),

    // ⭐ Billing Info
    billingAddress1: faker.location.streetAddress(),
    billingAddress2: faker.location.secondaryAddress(),
    billingCity: faker.location.city(),
    billingState: faker.location.state(),
    billingZipCode: faker.string.numeric(5),

  };
};
