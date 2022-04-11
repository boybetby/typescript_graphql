import { User } from "../entities/user";
import { Field, ObjectType } from "type-graphql";
import { IResponse } from "./Response";

@ObjectType({implements: IResponse}) 
export class UserQueryResponse implements IResponse{
    code: number
    success: boolean
    message: string

    @Field(() => [User], {nullable: true})
    users?: User[]
}