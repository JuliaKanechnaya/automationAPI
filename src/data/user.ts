import { faker } from '@faker-js/faker'

let password = faker.internet.password()

export const user = {
  "name": faker.internet.userName(),
  "email": faker.internet.email(),
  "password": password,
  "passwordConfirm": password,
  "role": "admin"
}

export const enumValues = ["user", "guide", "lead-guide", "admin"]


export function getUser() {
  let password = faker.internet.password()
  return {
    "name": faker.internet.userName(),
    "email": faker.internet.email(),
    "password": password,
    "passwordConfirm": password,
    "role": "admin"
  }
}

export function createRandomUser() {
  return {
    userId: faker.string.uuid(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    password: faker.internet.password(),
    birthdate: faker.date.birthdate(),
    registeredAt: faker.date.past(),
  };
}

export function getUserWithEmptyName() {
  let password = faker.internet.password()
  return {
    "email": faker.internet.email(),
    "password": password,
    "passwordConfirm": password,
    "role": "admin"
  }
}

export function getUserWithEmptyEmail() {
  let password = faker.internet.password()
  return {
    "name": faker.internet.userName(),
    "password": password,
    "passwordConfirm": password,
    "role": "admin"
  }
}

export function getUserWithEmptyPass() {
  let password = faker.internet.password()
  return {
    "name": faker.internet.userName(),
    "email": faker.internet.email(),
    "passwordConfirm": password,
    "role": "admin"
  }
}

export function getUserWithEmptyComfirmPass() {
  let password = faker.internet.password()
  return {
    "name": faker.internet.userName(),
    "email": faker.internet.email(),
    "password": password,
    "role": "admin"
  }
}

export function getUserWithBothPass() {
  return {
    "name": faker.internet.userName(),
    "email": faker.internet.email(),
    "role": "admin"
  }
}

export function getUserWithNotMatchingComfirmPass() {
  return {
    "name": faker.internet.userName(),
    "email": faker.internet.email(),
    "password": faker.internet.password(),
    "passwordConfirm": faker.internet.password(),
    "role": "admin"
  }
}

export function getUserWithUnexistingRole() {
  let password = faker.internet.password()
  return {
    "name": faker.internet.userName(),
    "email": faker.internet.email(),
    "password": password,
    "passwordConfirm": password,
    "role": "maggle"
  }
}