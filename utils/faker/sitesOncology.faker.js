import { faker } from '@faker-js/faker';

export const generateSiteData = () => {
  return {
    siteNumber: faker.string.numeric(6),

    // ✅ Alpha only, length 8–12
    siteName: faker.string.alpha({
      length: { min: 8, max: 12 }
    }),

    address1: faker.location.streetAddress(),
    address2: faker.location.secondaryAddress(),
    city: faker.location.city(),
    state: faker.location.state({ abbreviated: true }),
    zipCode: faker.location.zipCode('#####')
  };
};
