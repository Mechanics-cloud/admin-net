import { gql } from '@/src/shared/apolloClient/__generated__'

export const GET_USERS = gql(`
  query getUsers {
    getUsers(pageSize: 100){
      users{
        createdAt
      }
    }
  }
`)

export const GET_PAYMENTS = gql(`
  query getPayments {
    getPayments(pageSize:100){
      items {
        createdAt
        userId
      }   
    }
  }
`)

export const GET_POSTS = gql(`
  query getPosts {
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
