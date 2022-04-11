import { User } from "../entities/user";
import { Field, ObjectType } from "type-graphql";
import { IResponse } from "./Response";

@ObjectType({implements: IResponse}) 
export class UserMutationResponse implements IResponse{
    code: number
    success: boolean
    message: string

    @Field({nullable: true})
    user?: User
}