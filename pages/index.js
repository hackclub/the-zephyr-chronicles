import Head from 'next/head'
import Meta from '@hackclub/meta'
import Reaction from '../components/reaction'
import Feed from '../components/feed'
import useSWR from 'swr'

const Header = ({ status, children }) => {
  const fetcher = url => fetch(url).then(r => r.json())
  const { data, error } = useSWR('/api/status', fetcher, {
    initialData: status,
    refreshInterval: 5000
  })
  return (
    <>
      <Meta
        as={Head}
        name="Hack Club Scrapbook"
        title="Home"
        description="A daily streak system & portfolio for your projects. Join the Hack Club community of high school hackers & get yours started."
        image="https://cloud-53i932gta-hack-club-bot.vercel.app/0scrapbook.jpg"
      />
      <header
        style={{
          backgroundImage: `linear-gradient(300deg, rgba(159,156,156,0.8) 0%, rgba(159,156,156,0.8) ${
            100 - data.percent
          }%, rgba(159,156,156,0) ${
            100 - data.percent
          }%), url(/checkers.png)`,
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
        .post-reactions {
          justify-content: center;
          align-items: center;
          margin-top: 12px;
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

export const getStaticProps = async () => {
  const { getPosts } = require('./api/posts')
  const { getStatus } = require('./api/status')
  const initialData = await getPosts(48)
  const status = await getStatus()
  console.log(initialData)
  return { props: { initialData, status }, revalidate: 1 }
}
