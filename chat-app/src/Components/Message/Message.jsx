import React from 'react'
import './Message.css'

const Message = props => {
  const me = props.message.from === props.clientId
  return (
    <div className={me ? 'userMessage':'otherMessage'}>
      {!me &&
        <span className='user-name'>{props.message.from}</span>
      }
      {props.message.text}
    </div>
  )
}

export default Message