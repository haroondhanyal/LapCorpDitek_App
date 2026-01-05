import { faker } from '@faker-js/faker';

export const getSingleSiteData = () => {

  // ⭐ generate tomorrow date in yyyy-mm-dd (HTML date format)
  const today = new Date();
  today.setDate(today.getDate() + 1);

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  return {

    // ⭐ CLIENT DETAILS
    planName: `Plan - ${faker.company.name()}`,
    planAddress: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state({ abbreviated: true }),
    zipCode: faker.location.zipCode('#####'),

    // ⭐ CONTACT DETAILS
    contactName: faker.person.fullName(),
    contactPhone: `0${faker.string.numeric(10)}`,
    contactAddress: faker.location.streetAddress(),
    specialInstructions: faker.lorem.sentence(6),

    // ⭐ MAIL + LAB TICKET
    mailDate: `${year}-${month}-${day}`,   // <-- FIXED
    labTicket: `LT-${faker.number.int({ min: 100000, max: 999999 })}`,

    // ⭐ CSV PATH
    csvPath: 'tests/test-data/single-site-orders.csv'
  };
};
