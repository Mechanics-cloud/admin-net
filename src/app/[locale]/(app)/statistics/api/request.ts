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
