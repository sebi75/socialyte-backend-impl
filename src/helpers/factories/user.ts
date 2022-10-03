//TODO: use faker to generate users with random data
import { faker } from "@faker-js/faker"

export const userModelFactory = (count: number) => {
  let users = []
  for (let i = 0; i < count; i++) {
    users.push({
      email: faker.internet.email(),
      password: faker.internet.password(),
      username: faker.internet.userName(),
    })
  }

  return users
}

export const userProfileModelFactory = (count: number) => {
  let users = []
  for (let i = 0; i < count; i++) {
    users.push({
      bio: faker.lorem.sentence(),
      country: faker.address.country(),
      city: faker.address.city(),
      interests: faker.random.words(),
    })
  }

  return users
}
