// takes a string & returns the "with X, Y, Z" co-posters

const Tag = ({username, op=false}) => (
  <a href={`/${username}`} style={{marginLeft: 3}}>@{username}{op && ' (OP)'}</a>
)

const WithUsernames = ({usernames, op}) => {
  const taggedUsers = usernames.filter(username => username !== op).filter(u => u)

  if (taggedUsers.length === 0) {
    return null
  } else {
    return (
      <div className="status-bar">
        <p
          className="status-bar-field"
          style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}
        >
          With {taggedUsers.map(user => <Tag username={user}/>)}
        </p>
      </div>
    )
  }
}

export default WithUsernames