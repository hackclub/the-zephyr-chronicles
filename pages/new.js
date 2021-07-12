import React, { useCallback, useState, useRef } from 'react'
import { useDropzone } from 'react-dropzone'
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import { useRouter } from 'next/router'

export default function New({ users }) {
  let router = useRouter()
  const formEl = useRef(null)
  const withEl = useRef(null)
  const textEl = useRef(null)
  let allowedExtensions = ['jpg', 'png', 'jpeg', 'gif']
  const [files, setFiles] = useState([])
  const [clearedUser, setClearedUser] = useState(false)
  const cookies = parseCookies()
  console.log(cookies)
  const onDrop = useCallback(
    acceptedFiles => {
      let allGood = true
      acceptedFiles.map(x => {
        console.log(x.name.split('.')[x.name.split('.').length - 1])
        console.log()
        if (
          !allowedExtensions.includes(
            x.name.split('.')[x.name.split('.').length - 1]
          )
        ) {
          alert('Unsupported file type!')
          allGood = false
        }
      })
      if (allGood) {
        setFiles([...acceptedFiles, ...files])
      }
    },
    [files]
  )
  function handleUserSelection(value) {
    setCookie(null, 'user', value)
  }
  async function submit() {
    let formData = new FormData(formEl.current)
    files.forEach(file => {
      formData.append('files', file, file.name)
    })
    const fileUploadPaths = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    }).then(r => r.json())
    if (fileUploadPaths.error) {
      alert('Error! ' + fileUploadPaths.error)
    } else {
      const postRequest = await fetch('/api/create', {
        method: 'POST',
        body: JSON.stringify({
          attachments: fileUploadPaths.paths,
          withUsernames: withEl.current.value.split(','),
          text: textEl.current.value,
          userId: JSON.parse(parseCookies().user).id
        })
      }).then(r => r.json())
      if (postRequest.error) {
        alert('Error! ' + postRequest.error)
      }
      else{
        router.push('/')
      }
    }
  }
  console.log(users)
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
  return (
    <div style={{ padding: '0px 12px' }}>
      <h2>Contribute to the Chronicles</h2>
      {!cookies.user || clearedUser ? (
        <fieldset
          onChange={e => handleUserSelection(e.target.value)}
          className="users-fieldset"
        >
          <legend>Select yourself</legend>
          {users.map(user => (
            <div className="field-row">
              <input
                id="radio13"
                type="radio"
                name="fieldset-example2"
                value={JSON.stringify(user)}
              />
              <label htmlFor="radio13">{user.name}</label>
            </div>
          ))}
        </fieldset>
      ) : (
        <p>
          Posting as {JSON.parse(cookies.user).name}, click{' '}
          <span
            style={{ textDecoration: 'underline', cursor: 'pointer' }}
            onClick={() => {
              destroyCookie(null, 'user')
              setClearedUser(true)
            }}
          >
            here
          </span>{' '}
          to clear.
        </p>
      )}
      <div {...getRootProps()} style={{ maxWidth: '400px', marginTop: '6px' }}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <ul className="tree-view">
            <br />
            <li>
              <strong>Drop your files here!</strong>
            </li>
            <br />
          </ul>
        ) : (
          <ul className="tree-view">
            <br />
            <li>
              <strong>
                Drag 'n' drop some files here, or click to select files
              </strong>
            </li>
            {files.length > 0 && (
              <>
                So far, you've uploaded{' '}
                {files.map((x, index) => (
                  <>
                    {x.name}
                    {index == files.length - 1
                      ? '.'
                      : index == files.length - 2
                      ? ' & '
                      : ', '}
                  </>
                ))}
                <br />
              </>
            )}
            <br />
          </ul>
        )}
      </div>
      <form ref={formEl}>
        <div
          className="field-row-stacked"
          style={{ maxWidth: '400px', marginTop: '6px' }}
        >
          <label htmlFor="text20">What is the story behind these?</label>
          <textarea
            id="text20"
            name="text"
            rows="8"
            ref={textEl}
            style={{ color: 'black' }}
          ></textarea>
        </div>
        <div
          className="field-row-stacked"
          style={{ maxWidth: '400px', marginTop: '6px' }}
        >
          <label htmlFor="text18">
            Who was this with? (a comma separated list of usernames)
          </label>
          <input
            id="text18"
            type="text"
            name="withUsernames"
            ref={withEl}
            style={{ color: 'black' }}
          />
        </div>
      </form>
      <button
        onClick={submit}
        style={{ maxWidth: '400px', marginTop: '6px', color: 'black' }}
      >
        Submit!
      </button>
      <style>
        {`
        .users-fieldset{
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
        }
        @media (max-width: 32em) {
          .users-fieldset{
            display: grid;
            grid-template-columns: 1fr 1fr;
          }
        }
        .field-row{
          margin-top: 6px
        `}
      </style>
    </div>
  )
}

export const getServerSideProps = async () => {
  const { getProfiles } = require('../pages/api/users/index')
  let users = await getProfiles()
  users = users.map(user => ({ name: user.name, id: user.id }))
  return { props: { users } }
}
