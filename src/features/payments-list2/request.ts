import { gql } from '@/src/shared/apolloClient/__generated__'

export const GET_ALL_PAYMENTS = gql(`
    query getAllPayments($pageNumber: Int!, $pageSize: Int!, $searchTerm: String!,) {
        getPayments(pageNumber: $pageNumber, pageSize: $pageSize, searchTerm: $searchTerm,) {
            pagesCount
            page
            pageSize
            totalCount
            items{
				id
                userId
                paymentMethod
                amount
                currency
                createdAt
                type
                userName
                avatars{
                url
                width
                height
            }
        }
            }
        }
`)
