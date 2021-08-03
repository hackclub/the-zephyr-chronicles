import { File } from 'formidable'
import Formidable from 'formidable-serverless'
import fs from 'fs'

export const config = {
  api: {
    bodyParser: false
  }
}

export default function uploadFormFiles(req, res) {
  try {
    return new Promise(async (resolve, reject) => {
      const form = new Formidable.IncomingForm({
        multiples: true,
        keepExtensions: true
      })

      let paths = []

      form.on('file', (name, file) => {
          console.log(file.path)
          const data = fs.readFileSync(file.path)
          let date =
            new Date().toISOString() +
            '-' +
            Math.random().toString(36).substr(2, 5)
          fs.writeFileSync(`public/files/${date}-${file.name}`, data)
          fs.unlinkSync(file.path)
          paths = [...paths, `/files/${date}-${file.name}`]
        })
        .on('aborted', () => {
          reject(res.status(500).json({ error: 'Aborted' }))
        })
        .on('end', () => {
          resolve(res.status(200).json({ paths }))
        })

      await form.parse(req)
    })
  } catch (e) {
    res.json({ error: e })
  }
}
