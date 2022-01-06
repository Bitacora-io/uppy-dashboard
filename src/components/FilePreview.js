const { h } = require('preact')
const getFileTypeIcon = require('../utils/getFileTypeIcon')

module.exports = function FilePreview (props) {
  const { file } = props

  if (file.preview) {
    return (
      <img
        className="uppy-Dashboard-Item-previewImg"
        alt={file.name}
        src={file.preview}
      />
    )
  }

  const { color, icon } = getFileTypeIcon(file.type)

  return (
    <div className="uppy-Dashboard-Item-previewIconWrap">
      <span className="uppy-Dashboard-Item-previewIcon" style={{ color }}>{icon}</span>
      <svg aria-hidden="true" focusable="false" className="uppy-Dashboard-Item-previewIconBg" width="58" height="76" viewBox="0 0 58 76">
        <rect fill="#FFF" width="58" height="76" rx="3" fillRule="evenodd" />
      </svg>
    </div>
  )
}
