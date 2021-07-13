import React from 'react'
import "98.css";
import '../public/app.css'
import Nav from '../components/nav'
import NProgress from '../components/nprogress'

const App = ({ Component, pageProps }) => (
  <>
    <Nav />
    <NProgress color={'#ec3750'} />
    <div style={{
      backgroundImage: "url('windows_background.jpg')",
      maxHeight: 'calc(100vh - 24px)',
      minHeight: 'calc(100vh - 24px)',
      overflowY: 'scroll'
      }}>
      <Component {...pageProps} />
    </div>
  </>
)

export default App
