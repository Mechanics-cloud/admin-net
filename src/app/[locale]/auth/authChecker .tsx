'use client'

// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useMutation } from '@apollo/client';
// import { CHECK_AUTH_QUERY } from '@/src/apolloClient/request';

const AuthChecker = () => {
  // const router = useRouter();
  // const [checkAuth, { data, error }] = useMutation(CHECK_AUTH_QUERY)
  // console.log('AuthChecker')
  // console.log('data', data)
  // useEffect(() => {
  //   const authData = typeof window !== 'undefined' ? sessionStorage.getItem('authData') : null;
  //   if (authData) {
  //     try {
  //       // Декодируем base64
  //       const decodedData = atob(authData).split(':')
  //       console.log('decodedData', decodedData)
  //       checkAuth({ variables: { email: decodedData[0], password: decodedData[1] } }).then((res:any)=>{
  //         console.log(res)
  //         if (res.loginAdmin.logged) {
  //             console.log('router.push(/adminPanel)')
  //             router.push('/')
  //         } else {
  //           sessionStorage.removeItem('authData')
  //           router.push('/auth')
  //         }
  //       })
  //     } catch (error) {
  //       ///sessionStorage.removeItem('authData');
  //     }
  //   } else {
  //     router.push('/auth')
  //   }
  // }, [checkAuth, router]);
  // return null
}

export default AuthChecker
