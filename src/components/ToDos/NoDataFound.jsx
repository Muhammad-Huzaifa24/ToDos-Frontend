import React from 'react'

const NoDataFound = () => {
  return (
    <>
        <img className='m-auto' src="/src/assets/no-data-light.svg" alt="" />
        <p className='text-center mt-5 text-[#252525] text-xl'>Empty...</p>
    </>
  )
}

export default NoDataFound;