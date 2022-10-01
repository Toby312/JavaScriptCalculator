import React from 'react'




function TheKey({keyData: {value, id}, handleInput}) {
  return (
    
        <button id={id} onClick = { ()=>handleInput(value)}>
            {value}
            </button>
  )
}

export default TheKey