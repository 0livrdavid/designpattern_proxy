import { User } from "@prisma/client";
import { UsersProxy } from "../repositories/users-proxy"; 

interface GetUsersResponse {
    users: User[];
}

export class GetUsers {
    constructor(private usersProxy: UsersProxy){}  
    
    async execute(): Promise<GetUsersResponse> {
        const users = await this.usersProxy.getUsers()
        return {users}
    }
}