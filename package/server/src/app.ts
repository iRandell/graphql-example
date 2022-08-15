import cors from 'cors'

import express from 'express'

import { graphqlHTTP } from 'express-graphql'

import { buildASTSchema } from 'graphql'

import { UserEndpoint } from './user'

import userNode from './user/user.gql'

const userSchema = buildASTSchema(userNode)

const userEndpoint = new UserEndpoint()

const app = express()

app.use(cors())

app.use(
  '/user',
  graphqlHTTP({
    schema: userSchema,
    rootValue: userEndpoint,
  }),
)

app.listen(3000)
