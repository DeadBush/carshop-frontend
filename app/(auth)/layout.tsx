import React from 'react'

const AuthLayout = ({children}:{children: React.ReactNode}) => {
  return (
    <div className='flex item-center justify-center h-[calc(100%-170px)]'>
      {children}
    </div>
  )
};

export default AuthLayout;
