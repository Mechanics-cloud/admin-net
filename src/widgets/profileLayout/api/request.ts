import { gql } from '@/src/shared/apolloClient/__generated__'

export const GET_USER_PROFILE = gql(`
  query getUserProfile($Id:Int!) {
    getUser(userId:$Id){
    createdAt
      userName
      id
      profile{
        firstName
        lastName
        avatars{
          url
        }
      }
    }
  }
`)
