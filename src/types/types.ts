export type PostType = {
    link: string,
}

export type UserRequestType = {
    email: string,
}

export type PostResquestRequest = Express.Request & {
    params: {uniqueCode: string}
}

export type PostReqestType = {
    user_id: number,
    uniqueCode: string
}

export type UserType = {
    id: number,
    email: string,
    created_at: Date
}