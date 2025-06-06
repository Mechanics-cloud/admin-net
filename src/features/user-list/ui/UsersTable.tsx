import { TableComp } from '@/src/shared'
import { useTranslations } from 'next-intl'
import { useUserListContext, getColumns } from '@/src/features'
import { Loader } from 'car-robots-library'

export const UsersTable = () => {
  const t = useTranslations('UsersPage')
  const {
    users,
    sortUsers,
    currentPage,
    pageSize,
    onPageChange,
    onPageSize,
    totalCount,
    loading,
  } = useUserListContext()

  if (loading) return <Loader />

  return (
    <TableComp
      toggleSort={sortUsers}
      data={users}
      columns={getColumns(t)}
      pageData={{
        currentPage,
        pageSize,
        onPageChange,
        onPageSize,
        totalCount,
      }}
    />
  )
}
