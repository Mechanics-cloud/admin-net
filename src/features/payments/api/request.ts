import { gql } from '@/src/shared/apolloClient/__generated__'

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
