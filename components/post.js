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
  createdAt,
  usState,
  withUsernames = [],
  muted = false
}) => {
  return (
    <>
      <div class="window">
        <div class="title-bar">
          <div
            class="title-bar-text"
            style={{ paddingLeft: '4px', display: 'flex' }}
          >
            {!profile && (
              <>
                <Link href={`/${User.name}`}>
                  <span style={{ marginRight: '4px', color: 'white', cursor: 'pointer' }}>
                    @{User.name}
                  </span>
                </Link>
                {' at '}
              </>
            )}
            {convertTimestampToDate(createdAt)}
          </div>
        </div>
        <div class="window-body">
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
        <div class="status-bar">
          <p class="status-bar-field" style={{ whiteSpace: 'nowrap' }}>
            Taken in {usState}
          </p>
          {withUsernames && (
            <p
              class="status-bar-field"
              style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}
              title="With Arsh Shrivastava, Neer Vikas Verma & Neil Ghosh"
            >
              With{' '}
              {withUsernames.map((name, index) => (
                <>
                  <a href={`/${name}`}>@{name}</a>
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
