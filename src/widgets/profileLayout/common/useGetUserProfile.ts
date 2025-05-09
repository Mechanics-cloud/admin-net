import { useQuery } from '@apollo/client'
import { GET_USER_PROFILE } from '../api/request'
import { capitalize, formattedDate } from './helper'
import avatarPlaceholder from '@/public/user-avatar-placeholder.jpg'

export function useGetUserProfile(id: string) {
  const { data: profileData, error } = useQuery(GET_USER_PROFILE, {
    variables: { Id: +id },
  })

  const fullName =
    [
      capitalize(profileData?.getUser?.profile?.firstName),
      capitalize(profileData?.getUser?.profile?.lastName),
    ]
      .filter(Boolean)
      .join(' ')
      .trim() || capitalize(profileData?.getUser?.userName)

  const linkUser =
    [
      capitalize(profileData?.getUser?.profile?.firstName),
      profileData?.getUser?.profile?.lastName?.toLowerCase(),
    ]
      .filter(Boolean)
      .join('.')
      .trim() || profileData?.getUser?.userName

  const profileCreateDate = formattedDate(profileData?.getUser.createdAt)

  const avatar =
    profileData?.getUser?.profile?.avatars?.[0]?.url ?? avatarPlaceholder

  return { fullName, linkUser, profileCreateDate, avatar, error }
}
