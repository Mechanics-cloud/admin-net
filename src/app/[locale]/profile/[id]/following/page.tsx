'use client'

import { useEffect, useState } from 'react'

export default function FollowingPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const [state, setState] = useState<null | string>(null)

  useEffect(() => {
    params.then((res) => {
      setState(res.id)
    })
  }, [params])

  return <div className='m-50 animate-bounce'>{`following id ${state}`}</div>
}
