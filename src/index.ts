
import { DataSource } from "typeorm"
import express from 'express'
import { ApolloServer } from "apollo-server-express"
import { buildSchema } from "type-graphql"
import { UserResolver } from "./resolvers/user"
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core/dist/plugin/landingPage/graphqlPlayground"
import { User } from "./entities/user"

const main = async() => {
    const PORT = 9000
    const AppDataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 8080,
        username: 'postgres',
        password: 'admin',
        database: 'newDemo',
        synchronize: true,
        logging: true,
        entities: [User]
    })

    const app = express()

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver],
            validate:false
        }),
        plugins: [ApolloServerPluginLandingPageGraphQLPlayground()]
    })

    await AppDataSource.initialize().then(() => console.log(`pgSQL connected`))

    await apolloServer.start()
    apolloServer.applyMiddleware({app, cors: false})

    app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`))
}

main().catch((error) => console.log(error))