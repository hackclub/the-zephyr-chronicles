import { convertTimestampToDate } from '../lib/dates'
import Link from 'next/link'
import Attachment from './attachment'

const Post = ({
  profile = false,
  User = {
    name: 'abc',
    profilePicture: ''
  },
  text,
  attachments = [],
  user,
  createdAt,
  usState,
  withUsernames = [],
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
            {attachments.map(a => (<Attachment file={a} key={a} />))}
          </div>
        </div>
        <div className="status-bar">
          {false && (
            <p className="status-bar-field" style={{ whiteSpace: 'nowrap' }}>
              Taken in {usState}
            </p>
          )}
          {withUsernames && (
            <p
              className="status-bar-field"
              style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}
              title={
                'With ' +
                withUsernames
                  .map(
                    (name, index) =>
                      (profile ? name == user.name ? User.name + ' (OP)' : name : name) +
                      (index == withUsernames.length - 1
                        ? '.'
                        : index == withUsernames.length - 2
                        ? ' & '
                        : ', ')
                  )
                  .join('')
              }
            >
              With{' '}
              {withUsernames.map((name, index) => (
                <>
                  <a href={`/${profile ? name == user.name ? User.name : name : name}`}>
                    @{profile ? name == user.name ? User.name + ' (OP)' : name : name}
                  </a>
                  {index == withUsernames.length - 1
                    ? '.'
                    : index == withUsernames.length - 2
                    ? ' & '
                    : ', '}
                </>
              ))}
            </p>
          )}
        </div>
      </div>
    </>
  )
}

export default Post
