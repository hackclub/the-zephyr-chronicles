import { convertTimestampToDate } from '../lib/dates'
import Link from 'next/link'
import Attachment from './attachment'
import WithUsernames from './tags'

const Post = ({
  profile = false,
  User = {
    name: 'abc',
    profilePicture: ''
  },
  text,
  attachments = '',
  user,
  createdAt,
  usState,
  withUsernames = '',
  muted = false
}) => {
  return (
    <>
      <div className="window">
        <div className="title-bar">
          <div
            className="title-bar-text"
            style={{ paddingLeft: '4px', display: 'flex' }}
          >
            {!profile && (
              <>
                <Link href={`/${User.name}`}>
                  <span
                    style={{
                      marginRight: '4px',
                      color: 'white',
                      cursor: 'pointer'
                    }}
                  >
                    @{User.name}
                  </span>
                </Link>
                {' at '}
              </>
            )}
            {convertTimestampToDate(createdAt)}
          </div>
        </div>
        <div className="window-body">
          <p>{text}</p>
          <div className="post-attachments">
            {attachments.split(',').map(a => (<Attachment file={a} key={a} />))}
          </div>
        </div>
        <WithUsernames usernames={withUsernames.split(',')} op={User.name} />
      </div>
    </>
  )
}

export default Post
