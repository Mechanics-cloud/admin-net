import { gql } from '@/src/shared/apolloClient/__generated__'

export const GET_USERS = gql(`
    query GetUsers($pageNumber: Int!, $pageSize: Int!) {
        getUsers(pageNumber: $pageNumber, pageSize: $pageSize) {
            users {
                id
                userName
                createdAt
                email
                profile {
                  id
                  createdAt
                  userName
                }
                userBan {
                    reason
                    createdAt
                }
            }
            pagination {
                page
                pageSize
                pagesCount
                totalCount
            }
        }
    }
`)

export const BAN_USER = gql(`
    mutation BanUser($banReason: String!, $userId: Int!) {
        banUser(banReason: $banReason, userId: $userId) 
    }
`)

export const UNBAN_USER = gql(`
    mutation UnbanUser($userId: Int!) {
        unbanUser(userId: $userId) 
    }
`)
