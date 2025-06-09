export const capitalize = (str?: string | null): string => {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export const formattedDate = (isoDate: string): string => {
  const date = new Date(isoDate)

  return [
    date.getDate().toString().padStart(2, '0'),
    (date.getMonth() + 1).toString().padStart(2, '0'),
    date.getFullYear(),
  ].join('.')
}

export const tabItems = [
  {
    title: 'uploadedPhotos' as const,
    href: 'uploadedPhotos',
  },
  {
    title: 'payments' as const,
    href: 'payments',
  },
  {
    title: 'followers' as const,
    href: 'followers',
  },
  {
    title: 'following' as const,
    href: 'following',
  },
]
