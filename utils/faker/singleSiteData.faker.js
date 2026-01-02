import { faker } from '@faker-js/faker';

function generateValidSiteName() {
  let name;

  do {
    // generate name
    name = faker.company.name()
      .replace(/[^a-zA-Z0-9\s]/g, '')   // remove special chars
      .trim();                          // remove extra spaces

  } while (name.length < 3 || name.length > 50); // enforce rule

  return name;
}

export const generateAddNewSiteData = () => {
  return {
    siteNumber: faker.string.numeric({ length: 6 }),

    // 🔥 always valid now
    siteName: generateValidSiteName(),

    siteAddress1: faker.location.streetAddress(),
    siteAddress2: faker.location.secondaryAddress(),

    city: faker.location.city(),
    state: faker.location.state(),

    // 5-digit zip guaranteed
    zipcode: faker.string.numeric({ length: 5 }),

    billingAddress1: faker.location.streetAddress(),
    billingAddress2: faker.location.secondaryAddress(),
    billingCity: faker.location.city(),
    billingState: faker.location.state(),
    billingZipcode: faker.string.numeric({ length: 5 }),

    country: faker.location.country()
  };
};
