// Credit to https://blog.rstankov.com/building-auto-link-component-in-react/
import { Fragment, memo } from 'react'
import { last } from 'lodash'

const Content = memo(({ children }) => (
  <article className="post-text">{children}</article>
))

export default Content
