import { ProgressBar } from '@tremor/react'
import Image from 'next/image'
import React from 'react'


const VacancyBar = ({vehicleType,occupiedCount,totalCount,icon,color}) => {
    

  return (
    <div>
        
        <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content flex items-center justify-between">
          <div className='flex items-center justify-between w-full'>
            <div>{vehicleType} {occupiedCount} </div>
            <div>{calculatePercentage(totalCount,occupiedCount)}</div>
          <div>{totalCount}</div>
          </div>
        </p>
       
    </div>
  )
}

export default VacancyBar