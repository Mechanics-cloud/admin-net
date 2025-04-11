import { gql } from './__generated__'

export const CHECK_AUTH_QUERY = gql(`
  mutation Login($email: String!, $password: String!) {
    loginAdmin(email: $email, password: $password) {
      logged
    }
  }
`)

export const CHECK_QUERY = gql(`
  query getUser($Id:Int!) {
    getUser(userId:$Id){
      email
      userName   
  }
}
`)
