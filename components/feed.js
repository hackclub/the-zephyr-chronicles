import useSWR from 'swr'
import Posts from '../components/posts'
import { orderBy } from 'lodash'

const fetcher = url => fetch(url).then(r => r.json())

const Feed = ({
  src = '/api/posts',
  initialData,
  children,
  footer,
  ...props
}) => {
  const { data, error } = useSWR(src, fetcher, {
    initialData,
    refreshInterval: 5000
  })

  if (error) {
    return (
      <main className="container">
        {children}
        <Posts posts={orderBy([initialData, data], a => a.length)[0]} />
      </main>
    )
  }

  return (
    <main>
      {children}
      <Posts posts={data} />
      {footer}
    </main>
  )
}

export default Feed
