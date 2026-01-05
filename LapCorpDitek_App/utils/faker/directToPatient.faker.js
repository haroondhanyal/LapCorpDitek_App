// utils/faker/directToPatient.faker.js
import { faker } from '@faker-js/faker'

export function getDirectToPatientData() {
  const date = faker.date.soon(10)

  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()

  return {
    planName: faker.company.name(),
    planAddress: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state({ abbreviated: true }),
    zipCode: faker.location.zipCode('#####'),

    contactName: faker.person.fullName(),
    // contactPhone: faker.phone.number('03#########'),
    // ✅ EXACT 11 digits, digits only
    contactPhone: `0${faker.string.numeric(10)}`,

    contactAddress: faker.location.streetAddress(),
    

    specialInstructions: `Please handle this order with care.
Ensure delivery during office hours.
Call the contact person before delivery.`,

  // 🧾 ENTER NOTES (NEW – paragraph)
    notes: faker.lorem.paragraph({
      min: 3,
      max: 6
    }),


    // ✅ MUST be yyyy-mm-dd for <input type="date">
    mailDate: `${year}-${month}-${day}`,

    labTicket: faker.string.alphanumeric(10).toUpperCase(),

  }
}
