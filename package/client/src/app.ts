import { GraphqlClient } from './graphql-client'

import { UserApi } from './user'

const client = new GraphqlClient('http://localhost:3000/')

const userApi = new UserApi(client)

const generateRandomString = (): string =>
  (Math.random() + 1).toString(36).substring(7)

;(async () => {
  const name = generateRandomString()

  const phone = generateRandomString()

  const description = generateRandomString()

  const createdUser = await userApi.create(name, phone, description)

  console.log('Created user', createdUser)

  const [readedUser] = await userApi.read(
    ['id', 'name', 'phone', 'description'],
    1,
  )

  console.log('Readed user', readedUser)

  const newName = generateRandomString()

  const newPhone = generateRandomString()

  const newDescription = generateRandomString()

  const updatedUser = await userApi.update(
    readedUser.id,
    newName,
    newPhone,
    newDescription,
  )

  console.log('Updated user', updatedUser)

  const deletedUser = await userApi.delete(readedUser.id)

  console.log('Deleted user', deletedUser)
})()
