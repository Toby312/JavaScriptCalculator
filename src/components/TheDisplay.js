import React from 'react'

function theDisplay({input, output}) {
  return (
    <div className='output'>
        <span id= "display" className='input'>
            {input}
        </span>
        <span className='answers'>
            {output}
        </span>
      
    </div>
  )
}
export default theDisplay