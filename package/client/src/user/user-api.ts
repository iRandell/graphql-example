import type { GraphqlClient } from '../graphql-client'

import type { User, UserField } from './user'

const PATH = '/user'

export type UserFields<TField extends UserField> = Pick<User, TField>

export type CreateResult = {
  readonly value: User
}

export type ReadResult<TField extends UserField> = {
  readonly value: UserFields<TField>[]
}

export type UpdateResult = {
  readonly value: User | undefined
}

export type DeleteResult = {
  readonly value: User | undefined
}

export class UserApi {
  private readonly client: GraphqlClient

  public constructor(client: GraphqlClient) {
    this.client = client
  }

  public async create(
    name: string,
    phone: string,
    description: string,
  ): Promise<User> {
    const query = `
      mutation ($name: String!, $phone: String!, $description: String!) {
        value: create(name: $name, phone: $phone, description: $description) {
          id
          name
          phone
          description
        }
      }
    `

    const { value } = await this.client.execute<CreateResult>(PATH, query, {
      name,
      phone,
      description,
    })

    return value
  }

  // Note: the next approach makes impossible to use aliases
  public async read<TField extends UserField>(
    fields: TField[],
    count?: number,
  ): Promise<UserFields<TField>[]> {
    const query = `
      query ($count: Int) {
        value: read(count: $count) {
          ${fields.join('\n')}
        }
      }
    `

    const { value } = await this.client.execute<ReadResult<TField>>(
      PATH,
      query,
      {
        count,
      },
    )

    return value
  }

  public async update(
    id: string,
    name: string,
    phone: string,
    description: string,
  ): Promise<User | undefined> {
    const query = `
      mutation ($id: ID!, $name: String!, $phone: String!, $description: String!) {
        value: update(id: $id, name: $name, phone: $phone, description: $description) {
          id
          name
          phone
          description
        }
      }
    `

    const { value } = await this.client.execute<UpdateResult>(PATH, query, {
      id,
      name,
      phone,
      description,
    })

    return value
  }

  public async delete(id: string): Promise<User | undefined> {
    const query = `
      mutation ($id: ID!) {
        value: delete(id: $id) {
          id
          name
          phone
          description
        }
      }
    `

    const { value } = await this.client.execute<DeleteResult>(PATH, query, {
      id,
    })

    return value
  }
}
