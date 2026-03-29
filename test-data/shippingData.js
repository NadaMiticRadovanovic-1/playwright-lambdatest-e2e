import { faker } from "@faker-js/faker";

export function generateShippingData() {
    return {
        firstName: faker.person.firstName(),
        lastName:  faker.person.lastName(),
        telephone: faker.phone.number("+4479########"),
        address:   faker.location.streetAddress(),
        city:      faker.location.city(),
        postCode:  faker.location.zipCode("??# #??").toUpperCase(),
        country:   "United Kingdom",
        region:    "Greater London",
    };
}
