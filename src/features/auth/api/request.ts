import { gql } from '@/src/appLayer/apolloClient/__generated__'

export const CHECK_AUTH_QUERY = gql(`
  mutation Login($email: String!, $password: String!) {
    loginAdmin(email: $email, password: $password) {
      logged
    }
  }
`)
