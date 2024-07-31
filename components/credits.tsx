import React from 'react'

function Credits({icon,title,description}:{icon:React.ReactNode,title:string,description:string}) {
  return (
    <div>
        <div className="flex items-center gap-2">
          {icon}
          <h3>{title}</h3>
        </div>
        <p className='ml-10'>{description}</p>
    </div>
  )
}

export default Credits