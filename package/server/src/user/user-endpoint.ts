import { User } from './user'

type CreateUserPayload = {
  name: string
  phone: string
  description: string
}

type ReadUsersPayload = { count?: number }

type UserUpdatePayload = {
  id: string
  name: string
  phone: string
  description: string
}

type DeleteUsersPayload = { id: string }

const users: User[] = []

export class UserEndpoint {
  public create({ name, phone, description }: CreateUserPayload): User {
    const id = new Date().getTime().toString()

    const user = new User(id, name, phone, description)

    users.push(user)

    return user
  }

  public read({ count = users.length }: ReadUsersPayload): User[] {
    return users.slice(0, count)
  }

  public update({
    id,
    name,
    phone,
    description,
  }: UserUpdatePayload): User | undefined {
    const targetUser = users.find((user) => user.id === id)

    if (targetUser) {
      targetUser.name = name
      targetUser.phone = phone
      targetUser.description = description
    }

    return targetUser
  }

  public delete({ id }: DeleteUsersPayload): User | undefined {
    const index = users.findIndex((user) => user.id === id)

    const [deletedUser] = users.splice(index, 1)

    return deletedUser
  }
}
