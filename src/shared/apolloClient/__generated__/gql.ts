/* eslint-disable */
import * as types from './graphql'
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
  '\n  query getUsersStatistic {\n    getUsers(pageSize: 100){\n      users{\n        createdAt\n      }\n    }\n  }\n': typeof types.GetUsersStatisticDocument
  '\n  query getPaymentsStatistic {\n    getPayments(pageSize:100){\n      items {\n        createdAt\n        userId\n      }   \n    }\n  }\n': typeof types.GetPaymentsStatisticDocument
  '\n  query getPostsStatistic {\n    getPosts(pageSize:600, endCursorPostId:0 ){\n      items {\n        createdAt\n        images {\n          fileSize\n        }\n      }\n    }\n  }\n': typeof types.GetPostsStatisticDocument
  '\n  mutation Login($email: String!, $password: String!) {\n    loginAdmin(email: $email, password: $password) {\n      logged\n    }\n  }\n': typeof types.LoginDocument
  '\n    query GetFollowers($userId: Int!, $pageNumber: Int!, $pageSize: Int!) {\n        getFollowers(userId: $userId, pageNumber: $pageNumber, pageSize: $pageSize) {\n            items {\n                id\n                userName\n                firstName\n                lastName\n                createdAt\n                userId\n            }\n            totalCount, \n            pageSize, \n            page, \n            pagesCount\n        }\n    }\n': typeof types.GetFollowersDocument
  '\n    query GetFollowing($userId: Int!, $pageNumber: Int!, $pageSize: Int!) {\n        getFollowing(userId: $userId, pageNumber: $pageNumber, pageSize: $pageSize) {\n            items {\n                id\n                userName\n                firstName\n                lastName\n                createdAt\n                userId\n            }\n            totalCount, \n            pageSize, \n            page, \n            pagesCount\n        }\n    }\n': typeof types.GetFollowingDocument
  '\n    query getPaymentsByUser($pageNumber: Int!, $pageSize: Int!, $Id: Int!,) {\n        getPaymentsByUser(pageNumber: $pageNumber, pageSize: $pageSize, userId: $Id,) {\n            pagesCount\n            page\n            pageSize\n            totalCount\n            items {\n                dateOfPayment\n                endDate\n                price \n                paymentType\n                type\n            }\n        }\n    }\n': typeof types.GetPaymentsByUserDocument
  '\n    query getUserFotos($Id:Int!, $endCursorId: Int!) {\n        getPostsByUser(userId:$Id, endCursorId:$endCursorId){\n            pagesCount\n            pageSize\n            totalCount\n            items {\n                id\n                url\n            }\n        }\n    }\n': typeof types.GetUserFotosDocument
  '\n    query GetUsers($pageNumber: Int!, $pageSize: Int!) {\n        getUsers(pageNumber: $pageNumber, pageSize: $pageSize) {\n            users {\n                id\n                userName\n                createdAt\n                email\n                profile {\n                  id\n                  createdAt\n                  userName\n                }\n                userBan {\n                    reason\n                    createdAt\n                }\n            }\n            pagination {\n                page\n                pageSize\n                pagesCount\n                totalCount\n            }\n        }\n    }\n': typeof types.GetUsersDocument
  '\n    mutation BanUser($banReason: String!, $userId: Int!) {\n        banUser(banReason: $banReason, userId: $userId) \n    }\n': typeof types.BanUserDocument
  '\n    mutation UnbanUser($userId: Int!) {\n        unbanUser(userId: $userId) \n    }\n': typeof types.UnbanUserDocument
  '\n    mutation RemoveUser($userId: Int!) {\n        removeUser(userId: $userId) \n    }\n': typeof types.RemoveUserDocument
  '\n  query getUserProfile($Id:Int!) {\n    getUser(userId:$Id){\n    createdAt\n      userName\n      id\n      profile{\n        firstName\n        lastName\n        avatars{\n          url\n        }\n      }\n    }\n  }\n': typeof types.GetUserProfileDocument
}
const documents: Documents = {
  '\n  query getUsersStatistic {\n    getUsers(pageSize: 100){\n      users{\n        createdAt\n      }\n    }\n  }\n':
    types.GetUsersStatisticDocument,
  '\n  query getPaymentsStatistic {\n    getPayments(pageSize:100){\n      items {\n        createdAt\n        userId\n      }   \n    }\n  }\n':
    types.GetPaymentsStatisticDocument,
  '\n  query getPostsStatistic {\n    getPosts(pageSize:600, endCursorPostId:0 ){\n      items {\n        createdAt\n        images {\n          fileSize\n        }\n      }\n    }\n  }\n':
    types.GetPostsStatisticDocument,
  '\n  mutation Login($email: String!, $password: String!) {\n    loginAdmin(email: $email, password: $password) {\n      logged\n    }\n  }\n':
    types.LoginDocument,
  '\n    query GetFollowers($userId: Int!, $pageNumber: Int!, $pageSize: Int!) {\n        getFollowers(userId: $userId, pageNumber: $pageNumber, pageSize: $pageSize) {\n            items {\n                id\n                userName\n                firstName\n                lastName\n                createdAt\n                userId\n            }\n            totalCount, \n            pageSize, \n            page, \n            pagesCount\n        }\n    }\n':
    types.GetFollowersDocument,
  '\n    query GetFollowing($userId: Int!, $pageNumber: Int!, $pageSize: Int!) {\n        getFollowing(userId: $userId, pageNumber: $pageNumber, pageSize: $pageSize) {\n            items {\n                id\n                userName\n                firstName\n                lastName\n                createdAt\n                userId\n            }\n            totalCount, \n            pageSize, \n            page, \n            pagesCount\n        }\n    }\n':
    types.GetFollowingDocument,
  '\n    query getPaymentsByUser($pageNumber: Int!, $pageSize: Int!, $Id: Int!,) {\n        getPaymentsByUser(pageNumber: $pageNumber, pageSize: $pageSize, userId: $Id,) {\n            pagesCount\n            page\n            pageSize\n            totalCount\n            items {\n                dateOfPayment\n                endDate\n                price \n                paymentType\n                type\n            }\n        }\n    }\n':
    types.GetPaymentsByUserDocument,
  '\n    query getUserFotos($Id:Int!, $endCursorId: Int!) {\n        getPostsByUser(userId:$Id, endCursorId:$endCursorId){\n            pagesCount\n            pageSize\n            totalCount\n            items {\n                id\n                url\n            }\n        }\n    }\n':
    types.GetUserFotosDocument,
  '\n    query GetUsers($pageNumber: Int!, $pageSize: Int!) {\n        getUsers(pageNumber: $pageNumber, pageSize: $pageSize) {\n            users {\n                id\n                userName\n                createdAt\n                email\n                profile {\n                  id\n                  createdAt\n                  userName\n                }\n                userBan {\n                    reason\n                    createdAt\n                }\n            }\n            pagination {\n                page\n                pageSize\n                pagesCount\n                totalCount\n            }\n        }\n    }\n':
    types.GetUsersDocument,
  '\n    mutation BanUser($banReason: String!, $userId: Int!) {\n        banUser(banReason: $banReason, userId: $userId) \n    }\n':
    types.BanUserDocument,
  '\n    mutation UnbanUser($userId: Int!) {\n        unbanUser(userId: $userId) \n    }\n':
    types.UnbanUserDocument,
  '\n    mutation RemoveUser($userId: Int!) {\n        removeUser(userId: $userId) \n    }\n':
    types.RemoveUserDocument,
  '\n  query getUserProfile($Id:Int!) {\n    getUser(userId:$Id){\n    createdAt\n      userName\n      id\n      profile{\n        firstName\n        lastName\n        avatars{\n          url\n        }\n      }\n    }\n  }\n':
    types.GetUserProfileDocument,
}

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query getUsersStatistic {\n    getUsers(pageSize: 100){\n      users{\n        createdAt\n      }\n    }\n  }\n'
): (typeof documents)['\n  query getUsersStatistic {\n    getUsers(pageSize: 100){\n      users{\n        createdAt\n      }\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query getPaymentsStatistic {\n    getPayments(pageSize:100){\n      items {\n        createdAt\n        userId\n      }   \n    }\n  }\n'
): (typeof documents)['\n  query getPaymentsStatistic {\n    getPayments(pageSize:100){\n      items {\n        createdAt\n        userId\n      }   \n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query getPostsStatistic {\n    getPosts(pageSize:600, endCursorPostId:0 ){\n      items {\n        createdAt\n        images {\n          fileSize\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query getPostsStatistic {\n    getPosts(pageSize:600, endCursorPostId:0 ){\n      items {\n        createdAt\n        images {\n          fileSize\n        }\n      }\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  mutation Login($email: String!, $password: String!) {\n    loginAdmin(email: $email, password: $password) {\n      logged\n    }\n  }\n'
): (typeof documents)['\n  mutation Login($email: String!, $password: String!) {\n    loginAdmin(email: $email, password: $password) {\n      logged\n    }\n  }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n    query GetFollowers($userId: Int!, $pageNumber: Int!, $pageSize: Int!) {\n        getFollowers(userId: $userId, pageNumber: $pageNumber, pageSize: $pageSize) {\n            items {\n                id\n                userName\n                firstName\n                lastName\n                createdAt\n                userId\n            }\n            totalCount, \n            pageSize, \n            page, \n            pagesCount\n        }\n    }\n'
): (typeof documents)['\n    query GetFollowers($userId: Int!, $pageNumber: Int!, $pageSize: Int!) {\n        getFollowers(userId: $userId, pageNumber: $pageNumber, pageSize: $pageSize) {\n            items {\n                id\n                userName\n                firstName\n                lastName\n                createdAt\n                userId\n            }\n            totalCount, \n            pageSize, \n            page, \n            pagesCount\n        }\n    }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n    query GetFollowing($userId: Int!, $pageNumber: Int!, $pageSize: Int!) {\n        getFollowing(userId: $userId, pageNumber: $pageNumber, pageSize: $pageSize) {\n            items {\n                id\n                userName\n                firstName\n                lastName\n                createdAt\n                userId\n            }\n            totalCount, \n            pageSize, \n            page, \n            pagesCount\n        }\n    }\n'
): (typeof documents)['\n    query GetFollowing($userId: Int!, $pageNumber: Int!, $pageSize: Int!) {\n        getFollowing(userId: $userId, pageNumber: $pageNumber, pageSize: $pageSize) {\n            items {\n                id\n                userName\n                firstName\n                lastName\n                createdAt\n                userId\n            }\n            totalCount, \n            pageSize, \n            page, \n            pagesCount\n        }\n    }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n    query getPaymentsByUser($pageNumber: Int!, $pageSize: Int!, $Id: Int!,) {\n        getPaymentsByUser(pageNumber: $pageNumber, pageSize: $pageSize, userId: $Id,) {\n            pagesCount\n            page\n            pageSize\n            totalCount\n            items {\n                dateOfPayment\n                endDate\n                price \n                paymentType\n                type\n            }\n        }\n    }\n'
): (typeof documents)['\n    query getPaymentsByUser($pageNumber: Int!, $pageSize: Int!, $Id: Int!,) {\n        getPaymentsByUser(pageNumber: $pageNumber, pageSize: $pageSize, userId: $Id,) {\n            pagesCount\n            page\n            pageSize\n            totalCount\n            items {\n                dateOfPayment\n                endDate\n                price \n                paymentType\n                type\n            }\n        }\n    }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n    query getUserFotos($Id:Int!, $endCursorId: Int!) {\n        getPostsByUser(userId:$Id, endCursorId:$endCursorId){\n            pagesCount\n            pageSize\n            totalCount\n            items {\n                id\n                url\n            }\n        }\n    }\n'
): (typeof documents)['\n    query getUserFotos($Id:Int!, $endCursorId: Int!) {\n        getPostsByUser(userId:$Id, endCursorId:$endCursorId){\n            pagesCount\n            pageSize\n            totalCount\n            items {\n                id\n                url\n            }\n        }\n    }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n    query GetUsers($pageNumber: Int!, $pageSize: Int!) {\n        getUsers(pageNumber: $pageNumber, pageSize: $pageSize) {\n            users {\n                id\n                userName\n                createdAt\n                email\n                profile {\n                  id\n                  createdAt\n                  userName\n                }\n                userBan {\n                    reason\n                    createdAt\n                }\n            }\n            pagination {\n                page\n                pageSize\n                pagesCount\n                totalCount\n            }\n        }\n    }\n'
): (typeof documents)['\n    query GetUsers($pageNumber: Int!, $pageSize: Int!) {\n        getUsers(pageNumber: $pageNumber, pageSize: $pageSize) {\n            users {\n                id\n                userName\n                createdAt\n                email\n                profile {\n                  id\n                  createdAt\n                  userName\n                }\n                userBan {\n                    reason\n                    createdAt\n                }\n            }\n            pagination {\n                page\n                pageSize\n                pagesCount\n                totalCount\n            }\n        }\n    }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n    mutation BanUser($banReason: String!, $userId: Int!) {\n        banUser(banReason: $banReason, userId: $userId) \n    }\n'
): (typeof documents)['\n    mutation BanUser($banReason: String!, $userId: Int!) {\n        banUser(banReason: $banReason, userId: $userId) \n    }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n    mutation UnbanUser($userId: Int!) {\n        unbanUser(userId: $userId) \n    }\n'
): (typeof documents)['\n    mutation UnbanUser($userId: Int!) {\n        unbanUser(userId: $userId) \n    }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n    mutation RemoveUser($userId: Int!) {\n        removeUser(userId: $userId) \n    }\n'
): (typeof documents)['\n    mutation RemoveUser($userId: Int!) {\n        removeUser(userId: $userId) \n    }\n']
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(
  source: '\n  query getUserProfile($Id:Int!) {\n    getUser(userId:$Id){\n    createdAt\n      userName\n      id\n      profile{\n        firstName\n        lastName\n        avatars{\n          url\n        }\n      }\n    }\n  }\n'
): (typeof documents)['\n  query getUserProfile($Id:Int!) {\n    getUser(userId:$Id){\n    createdAt\n      userName\n      id\n      profile{\n        firstName\n        lastName\n        avatars{\n          url\n        }\n      }\n    }\n  }\n']

export function gql(source: string) {
  return (documents as any)[source] ?? {}
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never
