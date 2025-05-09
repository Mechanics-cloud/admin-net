'use client'

import { useEffect, useState } from 'react'

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const [state, setState] = useState<null | string>(null)

  useEffect(() => {
    params.then((res) => {
      setState(res.id)
    })
  }, [params])

  return (
    <div className='m-40 animate-bounce'>{`Uploaded photos userId ${state}`}</div>
  )
}
