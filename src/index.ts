import { nexusPrismaPlugin } from '@generated/nexus-prisma'
import Photon from '@generated/photon'
import { makeSchema, objectType, queryType, mutationType } from '@prisma/nexus'
import { GraphQLServer } from 'graphql-yoga'
import { join } from 'path'
import { Context } from './types'

const photon = new Photon()

const nexusPrisma = nexusPrismaPlugin({
  photon: (ctx: Context) => ctx.photon,
})

const EventType = objectType({
  name: 'EventType',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.allowedPassTypes()
  },
})

const PassType = objectType({
  name: 'PassType',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.allowedEventTypes()
  },
})

const Query = queryType({
  definition(t) {
    t.crud.findManyPassType()
    t.crud.findManyEventType()
  },
})

const Mutation = mutationType({
  definition(t) {
    t.crud.createOneEventType()
    t.crud.updateOneEventType()
    t.crud.createOnePassType()
  },
})

const schema = makeSchema({
  types: [EventType, PassType, Query, Mutation, nexusPrisma],
  outputs: {
    typegen: join(__dirname, '../generated/nexus-typegen.ts'),
    schema: join(__dirname, '/schema.graphql'),
  },
  typegenAutoConfig: {
    sources: [
      {
        source: '@generated/photon',
        alias: 'photon',
      },
      {
        source: join(__dirname, 'types.ts'),
        alias: 'ctx',
      },
    ],
    contextType: 'ctx.Context',
  },
})

const server = new GraphQLServer({
  schema,
  context: { photon },
})

server.start(() => console.log(`🚀 Server ready at http://localhost:4000`))
