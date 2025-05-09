export const capitalize = (str?: string | null): string => {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export const formattedDate = (isoDate: string): string => {
  const date = new Date(isoDate)

  const formattedDate = [
    date.getDate().toString().padStart(2, '0'),
    (date.getMonth() + 1).toString().padStart(2, '0'),
    date.getFullYear(),
  ].join('.')

  return formattedDate
}

export const tabItems = [
  {
    title: 'Uploaded photos',
    href: ``,
  },
  {
    title: 'Payments',
    href: 'payments',
  },
  {
    title: 'Followers',
    href: 'followers',
  },
  {
    title: 'Following',
    href: 'following',
  },
]
