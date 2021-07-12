const Attachment = ({file}) => {
  const type = file.split('.').pop().toLowerCase()
  switch (type) {
    case 'png':
    case 'jpg':
    case 'jpeg':
    case 'gif':
      return <ImageAttachment img={file} />
      break;
    case 'mp3':
    case 'wav':
    case 'ogg':
      return <AudioAttachment audio={file} />
      break;
    case 'mp4':
      return <VideoAttachment video={file} />
      break;
    default:
      return null
      break;
  }
}

const ImageAttachment = ({img}) => (
  <a
    href={img}
    target="_blank"
    title={img}
    className="post-attachment"
  >
    <img alt={img} src={img} loading="lazy" layout={'fill'} />
  </a>
)

const AudioAttachment = ({audio}) => (
  <audio
    src={audio}
    controls
    preload="metadata"
    className="post-attachment" />
)

const VideoAttachment = ({video}) => (
  <video width="100%" controls loop>
    <source src={`${video}#t=0.1`} />
    {/* t=0.1 ensures mobile browsers (safari) render the first frame in a preview */}
    Your browser does not support the video tag.
  </video> 
)

export default Attachment