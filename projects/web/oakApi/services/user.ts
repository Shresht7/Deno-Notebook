import { fetchData, persistData } from './db.ts'
import createId from '../helpers/createId.ts'
import type { User } from '../models/user.ts'

type UserDetails = {
    name: string,
    isAdmin: boolean
}

//  GET USERS
//  ---------

export const getUsers = async (): Promise<User[]> => {
    const users = await fetchData()
    return users.sort((a, b) => a.name.localeCompare(b.name))
}

//  GET USER
//  --------

export const getUser = async (id: string): Promise<User | undefined> => {
    const users = await fetchData()
    return users.find((user) => user.id === id)
}

//  CREATE USER
//  -----------

export const createUser = async ({ name, isAdmin }: UserDetails): Promise<string> => {
    const users = await fetchData()

    const newUser: User = {
        id: createId(),
        name,
        isAdmin,
        added: new Date()
    }

    await persistData([...users, newUser])
    return newUser.id
}

//  UPDATE USER
//  -----------

export const updateUser = async (id: string, { name, isAdmin }: UserDetails): Promise<string> => {
    const user = await getUser(id)

    if (!user) {
        throw new Error('User not found')
    }

    const updatedUser: User = {
        ...user,
        name,
        isAdmin
    }

    const users = await fetchData()
    const filteredUsers = users.filter(user => user.id !== id)
    persistData([...filteredUsers, updatedUser])
    return updatedUser.id
}

//  DELETE USER
//  -----------

export const deleteUser = async (id: string): Promise<void> => {
    const users = await getUsers()
    const filteredUsers = users.filter(user => user.id !== id)
    persistData(filteredUsers)
}