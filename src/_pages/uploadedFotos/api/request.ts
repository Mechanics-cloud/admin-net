import { gql } from '@/src/shared/apolloClient/__generated__'

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
