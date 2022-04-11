"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const user_1 = require("./resolvers/user");
const graphqlPlayground_1 = require("apollo-server-core/dist/plugin/landingPage/graphqlPlayground");
const user_2 = require("./entities/user");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const PORT = 9000;
    const AppDataSource = new typeorm_1.DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 8080,
        username: 'postgres',
        password: 'admin',
        database: 'newDemo',
        synchronize: true,
        logging: true,
        entities: [user_2.User]
    });
    const app = (0, express_1.default)();
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: yield (0, type_graphql_1.buildSchema)({
            resolvers: [user_1.UserResolver],
            validate: false
        }),
        plugins: [(0, graphqlPlayground_1.ApolloServerPluginLandingPageGraphQLPlayground)()]
    });
    yield AppDataSource.initialize().then(() => console.log(`pgSQL connected`));
    yield apolloServer.start();
    apolloServer.applyMiddleware({ app, cors: false });
    app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
});
main().catch((error) => console.log(error));
//# sourceMappingURL=index.js.map