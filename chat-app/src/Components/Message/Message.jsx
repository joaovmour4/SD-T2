import React from 'react'
import './Message.css'
import { useSession } from '../../Contexts/NameContext'

const Message = props => {
  const session = useSession()
  const me = props.message.from === session.name
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