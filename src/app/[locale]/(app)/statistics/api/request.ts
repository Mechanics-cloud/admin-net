import { gql } from '@/src/shared/apolloClient/__generated__'

export const GET_USERS_STATISTIC = gql(`
  query getUsersStatistic {
    getUsers(pageSize: 100){
      users{
        createdAt
      }
    }
  }
`)

export const GET_PAYMENTS_STATISTIC = gql(`
  query getPaymentsStatistic {
    getPayments(pageSize:100){
      items {
        createdAt
        userId
      }   
    }
  }
`)

export const GET_POSTS_STATISTIC = gql(`
  query getPostsStatistic {
    getPosts(pageSize:600, endCursorPostId:0 ){
      items {
        createdAt
        images {
          fileSize
        }
      }
    }
  }
`)
