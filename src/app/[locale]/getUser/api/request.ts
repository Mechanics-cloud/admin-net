import { gql } from '@/src/appLayer/apolloClient/__generated__'

export const CHECK_QUERY = gql(`
  query getUser($Id:Int!) {
    getUser(userId:$Id){
      email
      userName   
  }
}
`)
