import { User } from "../entities/user";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { UserMutationResponse } from "../types/UserMutationResponse";
import { UserQueryResponse } from "../types/UserQueryResponse";

@Resolver()
export class UserResolver {
    @Query(_return => UserQueryResponse, {nullable: true})
    async getUsers(): Promise<UserQueryResponse> {
        try {
            const users = await User.find()
            return {
                code: 202,
                success: true,
                message: 'Get users successfully',
                users: users
            }
        } catch (error) {
            return {
                code: 500,
                success: false,
                message: 'Internal server error',
            }
        }
    }

    @Mutation(_return => UserMutationResponse, {nullable: true})
    async createUser(
        @Arg('username') username: string,
        @Arg('password') password: string
    ): Promise<UserMutationResponse> {
        try {
            const user = await User.findOne({
                where: [{
                    username
                }]
            })

            if(user) return {
                code: 400,
                success: false,
                message: 'Username taken'
            }

            const newUser = User.create({
                username,
                password
            })

            console.log(newUser)

            await newUser.save()

            return {
                code: 202,
                success: true,
                message: 'User created successfully',
                user: newUser
            }
        } catch (error) {
            return {
                code: 500,
                success: false,
                message: 'Internal server error'
            }
        }
    }
}