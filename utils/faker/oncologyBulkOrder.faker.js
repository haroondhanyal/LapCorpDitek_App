import { faker } from '@faker-js/faker';

export const generateOncologyBulkOrderData = () => {
  return {

    // 🔹 Patient Information
    patientFirstName: faker.person.firstName(),
    patientLastName: faker.person.lastName(),

    // DOB formatted as YYYY-MM-DD (most forms accept this)
    patientDOB: faker.date
      .birthdate({ min: 1950, max: 2005 })
      .toISOString()
      .split('T')[0],

    patientEmail: faker.internet.email(),
    patientPhone: faker.phone.number('###########'),

    // 🔹 Address (Patient/Billing)
    address1: faker.location.streetAddress(),
    address2: faker.location.secondaryAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipCode: faker.location.zipCode('#####'),

    // 🔹 Provider
    providerName: faker.person.fullName(),
    providerNPI: faker.string.numeric(10),

    // 🔹 Order / Test
    diagnosisCode: faker.string.alphanumeric(6).toUpperCase(),
    accessionNumber: faker.string.alphanumeric(8).toUpperCase(),
    specimenID: faker.string.alphanumeric(8).toUpperCase(),

    // 🔹 Insurance
    insuranceProvider: faker.company.name(),
    policyNumber: faker.string.alphanumeric(12).toUpperCase(),
    groupNumber: faker.string.alphanumeric(8).toUpperCase(),

    // 🔹 Shipment Details
    courierName: faker.company.name(),
    trackingNumber: faker.string.alphanumeric(12).toUpperCase(),

    // =====================================================
    // 🆕  ADDITIONS for checkout page (your new locators)
    // =====================================================

    // 🧾 PO NUMBER
    poNumber: `PO-${faker.string.numeric(6)}`,

    // ⚡ Expedited flag
    isExpedited: faker.datatype.boolean(),   // true | false

    // 🌍 Country & Shipping Method
    country: 'United States',                // you can change to exact dropdown text
    shippingMethod: 'FedEx Overnight',       // MUST match UI option text

    // 👤 Contact Details
    contactName: faker.person.fullName(),
    contactEmail: faker.internet.email(),
    contactPhone: faker.phone.number('###########'),

    // 🏠 Customer Shipping Address
    shippingName: faker.person.fullName(),
    shippingNumber: faker.string.numeric(4),
    shippingAddress1: faker.location.streetAddress(),
    shippingAddress2: faker.location.secondaryAddress(),
    shippingCity: faker.location.city(),
    shippingCountry: 'United States'
  };
};
