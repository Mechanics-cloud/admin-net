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
