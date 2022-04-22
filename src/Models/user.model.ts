export interface userModel {
    email: string
    username?: string
    password: string
}

export interface userModelToUpdate{
    Email?: string
    UserName?: string
    Password?: string
}