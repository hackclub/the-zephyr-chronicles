import Head from 'next/head'
import Meta from '@hackclub/meta'
import Link from 'next/link'
import Icon from '@hackclub/icons'

const pageNotFound = () => (
  <main>
    <Meta as={Head} name="The Hacker Zephyr Chronicles" title="404" />
    <div class="window" style={{margin: '32px', width: '250px'}}>
      <div class="title-bar">
        <div class="title-bar-text">
          404: Page not found
        </div>

        <div class="title-bar-controls">
          <button aria-label="Minimize"></button>
          <button aria-label="Maximize"></button>
          <button aria-label="Close"></button>
        </div>
      </div>
      <div class="window-body">
        <p>This page could not be found.</p>
        <section class="field-row" style={{justifyContent: 'flex-end'}}>
          <Link href="/"><button>OK</button></Link>
          <a href="/videos/error [レッドゾーン]-5BZLz21ZS_Y.mp4"><button>Cancel</button></a>
        </section>
      </div>
    </div>
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
