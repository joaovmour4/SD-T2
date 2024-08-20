import React from 'react'
import './Message.css'

const Message = props => {
  return (
    <div className={props.message.from === 'me' ? 'userMessage':'otherMessage'}>
      {props.message.from !== 'me' &&
        <span className='user-name'>{props.message.from}</span>
      }
      {props.message.text}
    </div>
  )
}

export default Message