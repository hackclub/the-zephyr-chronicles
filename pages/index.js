import Head from 'next/head'
import Meta from '@hackclub/meta'
import Feed from '../components/feed'
import useSWR from 'swr'
import {useState} from 'react'
const Header = ({ status, children }) => {
  const [open, setOpen] = useState(true)
  const fetcher = url => fetch(url).then(r => r.json())
  const { data, error } = useSWR('/api/status', fetcher, {
    initialData: status,
    refreshInterval: 5000
  })
  return (
    <>
      <Meta
        as={Head}
        name="Hacker Zephyr Chronicles"
        title="Home"
        description="The stories that made up an adventure of a lifetime."
        image="https://slack-oauth-starter-test-xy120.hackclub.dev/meta.png"
      />
      <header
        style={{
          backgroundImage: `linear-gradient(300deg, rgba(159,156,156,0.8) 0%, rgba(159,156,156,0.8) ${
            100 - data.percent
          }%, rgba(159,156,156,0) ${100 - data.percent}%), url(/checkers.png)`,
          marginBottom: '12px'
        }}
      >
        {children}
        <h1>
          <span style={{ color: 'white', background: 'rgba(0,0,0,0.4)' }}>
            {500 - data.amount} Contributions To Go
          </span>
        </h1>
      </header>
      <div
        style={{
          position: 'absolute',
          minHeight: '100vh',
          width: '100vw',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 999,
          top: 0,
          display: open ? 'flex' : 'none',
          backgroundImage:
            'linear-gradient(300deg, rgba(1,28,54,0.5480567226890756) 0%, rgba(1,28,54,0.4248074229691877) 100%);'
        }}
      >
        <div
          className="window"
          style={{
            margin: '32px',
            width: '95vh',
            maxWidth: '350px',
            maxHeight: '70vh',
            overflowY: 'scroll'
          }}
        >
          <div className="title-bar">
            <div className="title-bar-text">
              Welcome to the Zephyr Chronicles
            </div>
            <div className="title-bar-controls">
              <button aria-label="Minimize"></button>
              <button aria-label="Maximize"></button>
              <button aria-label="Close"></button>
            </div>
          </div>
          <div className="window-body">
            <p style={{ fontSize: '12px' }}>
              In 2021, we chartered a train across America and hosted the
              world's longest hackathon on land: 3,502 miles long.
            </p>
            <p style={{ fontSize: '12px', marginTop: '8px'  }}>
              We're started at Hack Club HQ in Burlington, Vermont, headed south
              to New York City, then west through Chicago, and crossed the
              Rockies on our way to San Francisco. From there, we followed the
              Pacific Ocean and ended in Los Angeles, where we closed at SpaceX.
            </p>
            <p style={{ fontSize: '12px', marginTop: '8px' }}>
              Passengers were give one goal: to ship 500 experiences to the
              Zephyr Chronicles. Fortunately, that goal was met and the Zephyr
              Chronicles shall now be preserved on this site for an eternity.
            </p>
            <section
              className="field-row"
              style={{ color: 'black', marginTop: '8px' }}
            >
              <button style={{color: 'black'}} onClick={() => setOpen(false)}>OK</button>
            </section>
          </div>
        </div>
      </div>
      <style jsx>{`
        header {
          text-align: left;
          padding: 0 16px 48px;
        }
        h1 {
          margin: 0;
          font-size: 36px;
          line-height: 1;
          padding: 16px;
        }
        @media (min-width: 32em) {
          h1 {
            font-size: 48px;
          }
          p {
            font-size: 24px;
          }
          header {
            padding: 24px 0 24px;
          }
        }
        @media (min-width: 48em) {
          h1 {
            font-size: 64px;
          }
        }
        a {
          color: var(--colors-orange);
          text-decoration: none;
        }
        a:hover,
        a:focus {
          text-decoration: underline;
          text-decoration-style: wavy;
          text-underline-position: under;
        }
        h2 {
          margin: 0 16px 12px;
          font-size: 18px;
        }
      `}</style>
    </>
  )
}

const IndexPage = ({ status, initialData }) => (
  <Feed initialData={initialData}>
    <Header status={status} />
  </Feed>
)

export default IndexPage

export const getServerSideProps = async () => {
  const { getPosts } = require('./api/posts')
  const { getStatus } = require('./api/status')
  const initialData = await getPosts(48)
  const status = await getStatus()
  console.log(initialData)
  return { props: { initialData, status } }
}
