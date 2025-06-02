import { TableComp } from '@/src/shared'
import { useTranslations } from 'next-intl'
import { useUserListContext, getColumns } from '@/src/features'

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

  return (
    users && (
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
          loading,
        }}
      />
    )
  )
}
