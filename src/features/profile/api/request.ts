import { gql } from '@/src/shared/apolloClient/__generated__'

export const GET_FOLLOWERS = gql(`
    query GetFollowers($userId: Int!, $pageNumber: Int!, $pageSize: Int!) {
        getFollowers(userId: $userId, pageNumber: $pageNumber, pageSize: $pageSize) {
            items {
                id
                userName
                firstName
                lastName
                createdAt
                userId
               
            }
                totalCount, 
                pageSize, 
                page, 
                pagesCount
        }
    }
`)
