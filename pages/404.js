import Head from 'next/head'
import Meta from '@hackclub/meta'
import Link from 'next/link'
import Icon from '@hackclub/icons'

const pageNotFound = () => (
  <main>
    <Meta as={Head} name="Hack Club's Scrapbook" title="404" />
    <h1>404!</h1>
    <Link href="/">
      <button className="button-home">Go home</button>
    </Link>
    <style jsx>{`
      main {
        padding: 32px 16px;
        text-align: center;
      }
      h1 {
        font-size: 128px;
        margin: 0;
        line-height: 1.25;
      }
      @media (min-width: 32em) {
        h1 {
          -webkit-text-stroke-width: 4px;
          font-size: 256px;
        }
      }
      .button-home {
        font-size: 24px;
        text-decoration: none;
        background-color: white;
        color: black;
      }
      a :global(svg) {
        margin-right: 8px;
      }
    `}</style>
  </main>
)

export default pageNotFound
