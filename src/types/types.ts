export type PostType = {
    link: string,
    postType: string,
    uniqueCode: string
}

export type PostSaveType = {
    title: string,
    user_id: number,
    post_type_id: number,
    unique_code: string,
    link: string
}

export type PostModelType = {
    id: number,
    title: string,
    user_id: number,
    post_type_id: number,
    unique_code: string,
    link: string
    created_at: Date,
    updated_at: Date
}

export type PostRequestModelType = {
    id: number,
    title: string,
    user_id: number,
    post_id: number,
    unique_code: string,
    created_at: Date,
    expires_at: Date,
    is_submitted: boolean
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

export type QueueModelType = {
    id: number,
    post_id: string,
    updated_at: Date
}