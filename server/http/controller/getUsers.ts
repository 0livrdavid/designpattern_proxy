import { Request, Response } from "express";
import _ from "lodash"
import { makeGetUsersUseCase } from "../../use-cases/factories/make-getUsers-use-case";

export async function getUsers(req: Request, res: Response){
    const getUsersUseCase = makeGetUsersUseCase()

    const getUsers = await getUsersUseCase.execute() 

    return res.status(200).json({ content: getUsers.users })
}