declare module '*.gql' {
  import type { DocumentNode } from 'graphql'

  const schema: DocumentNode

  export = schema
}
