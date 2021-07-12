import { convertTimestampToDate } from '../lib/dates'
import { proxy } from '../lib/images'
import { filter } from 'lodash'
import Icon from '@hackclub/icons'
import Link from 'next/link'
import Content from './content'
import Video from './video'
import Image from 'next/image'
import dynamic from 'next/dynamic'
const Tooltip = dynamic(() => import('react-tooltip'), { ssr: false })

const Post = ({
  id = new Date().toISOString(),
  profile = false,
  User = {
    name: 'abc',
    profilePicture: ''
  },
  text,
  attachments = [],
  mux = [],
  user,
  createdAt,
  usState,
  withUsernames = [],
  muted = false
}) => {
  console.log(profile)
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
            {attachments.map(img => (
              <a
                key={img}
                href={img}
                target="_blank"
                title={img}
                className="post-attachment"
              >
                <img alt={img} src={img} loading="lazy" layout={'fill'} />
              </a>
            ))}
            {filter(attachments, a =>
              a?.type?.toString().startsWith('audio')
            ).map(aud => (
              <audio
                key={aud.url}
                className="post-attachment"
                src={aud.url}
                controls
                preload="metadata"
              />
            ))}
            {mux.map(id => (
              <Video key={id} mux={id} />
            ))}
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
