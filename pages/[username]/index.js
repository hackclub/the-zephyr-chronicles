import { useRouter } from 'next/router'
import useSWR from 'swr'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
import Meta from '@hackclub/meta'
import CalendarHeatmap from '@hackclub/react-calendar-heatmap'
import Icon from '@hackclub/icons'
import Banner from '../../components/banner'
import Message from '../../components/message'
import { StaticMention } from '../../components/mention'
import Post from '../../components/post'
import AudioPlayer from '../../components/audio-player'
import ExamplePosts from '../../components/example-posts'
import FourOhFour from '../404'
import { clamp } from 'lodash'
import Masonry from 'react-masonry-css'

const HOST =
  process.env.NODE_ENV === 'development' ? '' : 'https://scrapbook.hackclub.com'

const Tooltip = dynamic(() => import('react-tooltip'), { ssr: false })

// Calculate heatmap date range
const today = new Date()
const dateString = dt => dt.toISOString().substring(0, 10)
const heatmapEnd = dateString(today)
const heatmapStart = dateString(new Date(today.setDate(today.getDate() - 62)))

const Profile = ({
  profile = {},
  heatmap = [],
  webring = [],
  posts = [],
  children
}) => (
  <main
    className="container"
    style={{ paddingLeft: '12px', paddingTop: '16px' }}
  >
    <Meta
      as={Head}
      name="the Hacker Zephyr Chronicles"
      title={`@${profile.name}`}
      description={`Follow along with @${profile.name}’s journey on the Hacker Zephyr.`}
      image={profile.profilePicture}
    />
    {profile.css && (
      <link
        rel="stylesheet"
        type="text/css"
        href={HOST + `/api/css?url=${profile.css}`}
      />
    )}
    {children}
    <header className="header">
      <div className="header-col-1 header-title-avatar">
        {profile.profilePicture && (
          <Image
            src={profile.profilePicture}
            key={profile.profilePicture}
            width={96}
            height={96}
            alt={profile.name}
            className="header-title-avatar"
          />
        )}
      </div>
      <section>
        <h1 className="header-title-name">{profile.name}</h1>
        <div className="header-content">
          <button style={{ color: 'black', marginBottom: '10px' }}>{`${
            posts.length + ' contributions'
          }`}</button>
          {profile.audio && <AudioPlayer url={profile.audio} />}
        </div>
      </section>
    </header>
      <Masonry
        key="masonry"
        breakpointCols={{
          10000: 4,
          1024: 3,
          640: 2,
          480: 1,
          default: 1
        }}
        className="masonry-posts"
        columnClassName="masonry-posts-column"
      >
        {posts.map(post => {
          console.log(post)
          return <Post key={post.id} user={profile} profile {...post} />
        })}
      </Masonry>

    {profile.css && (
      <footer className="css" title="External CSS URL">
        <Icon
          glyph="embed"
          size={32}
          className="css-icon"
          aria-label="Code link icon"
        />
        <a
          href={
            profile.css.includes('gist.githubusercontent')
              ? profile.css
                  .replace('githubusercontent.', 'github.')
                  .split('/raw')?.[0]
              : profile.css
          }
          target="_blank"
          className="css-link"
        >
          CSS:{' '}
          {profile.css.includes('gist.githubusercontent')
            ? `Gist by @${profile.css.split('.com/')?.[1]?.split('/')?.[0]}`
            : profile.css}
        </a>
      </footer>
    )}
    <style jsx global key="masonry-style">{`
    .masonry-posts {
      display: flex;
      width: 100%;
      max-width: 100%;
      margin-left: -12px;
    }

    .masonry-posts-column {
      background-clip: padding-box;
    }

    .post {
      margin-bottom: 2px;
    }

    @media (min-width: 32em) {
      .masonry-posts {
        padding-right: 12px;
      }

      .masonry-posts-column {
        padding-left: 12px;
      }

      .post {
        border-radius: 12px;
        margin-bottom: 12px;
      }
    }

    @media (min-width: 64em) {
      .masonry-posts {
        padding-right: 24px;
      }

      .masonry-posts-column {
        padding-left: 12px;
      }

      .post {
        margin-bottom: 24px;
      }
    }
  `}</style>
  </main>
)

const fetcher = url => fetch(url).then(r => r.json())

const Page = ({ username = '', router = {}, initialData = {} }) => {
  const { data, error } = useSWR(`/api/users/${username}`, fetcher, {
    initialData,
    refreshInterval: 5000
  })
  if (!data) {
    return <Message text="Loading…" />
  } else if (error && !data) {
    return <Message text="Error" color1="orange" color2="pink" />
  } else {
    return (
      <Profile
        {...data}
        heatmap={initialData.heatmap}
        webring={initialData.webring}
      >
        <Banner isVisible={router.query.welcome === 'true'}>
          Woah!!! We’re communicating via a website now…welcome to your
          scrapbook page!
          <br />
          Did you know you can{' '}
          <a href="https://scrapbook.hackclub.com/msw" target="_blank">
            customize your scrapbook profile
          </a>
          ?
          <br />
          <a
            href="https://app.slack.com/client/T0266FRGM/C015M6U6JKU"
            target="_blank"
          >
            Join the #scrapbook-css channel
          </a>{' '}
          to see how.
        </Banner>
      </Profile>
    )
  }
}

const UserPage = props => {
  const router = useRouter()

  if (router.isFallback) {
    return <Message text="Loading…" />
  } else if (props.profile?.name) {
    return (
      <Page username={props.profile.name} router={router} initialData={props} />
    )
  } else {
    return <FourOhFour />
  }
}

export default UserPage

export const getStaticPaths = async () => {
  const { map } = require('lodash')
  const { getUsernames } = require('../api/usernames')
  const usernames = await getUsernames()
  const paths = usernames.map(username => ({ params: { username } }))
  return { paths, fallback: true }
}

export const getStaticProps = async ({ params }) => {
  const { getProfile, getPosts } = require('../api/users/[username]/index')
  if (params.name?.length < 2)
    return console.error('No username') || { props: {} }

  const profile = await getProfile(params.username)
  if (!profile || !profile?.name)
    return console.error('No profile') || { props: {} }

  try {
    const posts = await getPosts(profile)
    const { map, groupBy } = require('lodash')
    const days = groupBy(posts, p => p.postedAt?.substring(0, 10))
    const heatmap = Object.keys(days).map(date => ({
      date,
      count: days[date].length || 0
    }))
    console.log({ profile, heatmap, posts })
    return {
      props: { profile, heatmap, posts },
      revalidate: 1
    }
  } catch (error) {
    console.error(error)
    return { props: { profile }, revalidate: 1 }
  }
}
