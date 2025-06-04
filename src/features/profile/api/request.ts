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

export const GET_PAYMENTS = gql(`
    query getPaymentsByUser($pageNumber: Int!, $pageSize: Int!, $Id: Int!,) {
        getPaymentsByUser(pageNumber: $pageNumber, pageSize: $pageSize, userId: $Id,) {
            pagesCount
            page
            pageSize
            totalCount
            items {
                dateOfPayment
                endDate
                price 
                paymentType
                type
            }
        }
    }
`)

export const GET_USER_FOTOS = gql(`
    query getUserFotos($Id:Int!, $endCursorId: Int!) {
        getPostsByUser(userId:$Id, endCursorId:$endCursorId){
            pagesCount
            pageSize
            totalCount
            items {
                id
                url
            }
        }
    }
`)
