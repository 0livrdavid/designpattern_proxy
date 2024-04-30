import { GetUsers } from './../getUsers';
import { PrismaUserRepository } from '../../repositories/prisma/prisma-users.repository'

export function makeGetUsersUseCase() {
  const usersRepository = new PrismaUserRepository()
  const getUsersUseCase = new GetUsers(usersRepository)

  return getUsersUseCase
}
