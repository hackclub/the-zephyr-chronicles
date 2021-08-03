import React, { useCallback, useState, useRef } from 'react'
import { useDropzone } from 'react-dropzone'
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import { useRouter } from 'next/router'

export default function New({ users }) {
  let router = useRouter()
  const formEl = useRef(null)
  const withEl = useRef(null)
  const textEl = useRef(null)
  let allowedExtensions = ['jpg', 'png', 'jpeg', 'gif', 'mp4', 'webm', 'mov']
  const [files, setFiles] = useState([])
  const [clearedUser, setClearedUser] = useState(false)
  const cookies = parseCookies()
  console.log(cookies)
  const onDrop = useCallback(acceptedFiles => {
      let allGood = true
      acceptedFiles.forEach(x => {
        const extension = x.name.split('.').pop()
        if (!allowedExtensions.includes(extension)) {
          alert(`Unsupported file type: '${extension}'`)
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
    if(files.length == 0) {
      alert('Please add some files!')
      return
    }
    if(typeof parseCookies().user == 'undefined') {
      alert('Please select yourself!')
      return
    }
    if(textEl.current.value.trim() == '') {
      alert('Please write some text!')
      return
    }
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
          attachments: fileUploadPaths.paths.join(','),
          withUsernames: withEl.current.value.split(',').map(x => x.trim()).join(','),
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
    <>
      <div class="window" style={{margin: '32px'}}>
        <div class="title-bar">
          <div class="title-bar-text">
            Contribute to the Chronicles
          </div>
          <div class="title-bar-controls">
            <button aria-label="Minimize"></button>
            <button aria-label="Maximize"></button>
            <button aria-label="Close"></button>
          </div>
        </div>
        <div class="window-body">
        {!cookies.user || clearedUser ? (
          <fieldset
            onChange={e => handleUserSelection(e.target.value)}
            className="users-fieldset"
          >
            <legend>Select yourself</legend>
            {users.map(user => (
              <div className="field-row">
                <input
                  id={"radio"+user.name}
                  type="radio"
                  name="fieldset-example2"
                  value={JSON.stringify(user)}
                />
                <label htmlFor={"radio"+user.name}>{user.name}</label>
              </div>
            ))}
          </fieldset>
        ) : (
          <span>
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
          </span>
        )}
        <div {...getRootProps()} style={{ maxWidth: '400px', marginTop: '6px' }}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <ul className="tree-view">
              <br />
              <li>
                <strong>Drop your images here!</strong>
              </li>
              <br />
            </ul>
          ) : (
            <ul className="tree-view">
              <br />
              <li>
                <strong>
                  Drag 'n' drop some images here, or click to select images
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
        <section class="field-row" style={{justifyContent: 'flex-end'}}>
          <button
            onClick={submit}
            style={{ maxWidth: '400px', marginTop: '6px', color: 'black' }}
          >
            Submit!
          </button>
        </section>
        </div>
      </div>
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
    </>
  )
}

export const getServerSideProps = async () => {
  const { getProfiles } = require('../pages/api/users/index')
  let users = await getProfiles()
  users = users.map(user => ({ name: user.name, id: user.id }))
  return { props: { users } }
}
