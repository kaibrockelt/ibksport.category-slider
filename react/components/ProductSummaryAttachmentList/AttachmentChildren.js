import React from 'react'
import { useCssHandles } from 'vtex.css-handles'

import AddedAttachmentsList from './AddedAttachmentsList'
import RemovedAttachmentsList from './RemovedAttachmentsList'

const CSS_HANDLES = ['attachmentChildrenContainer']

const AttachmentChildren = ({ addedOptions, removedOptions }) => {
  const handles = useCssHandles(CSS_HANDLES)
  if (addedOptions.length === 0 && removedOptions.length === 0) {
    return null
  }

  return (
    <div className={`${handles.attachmentChildrenContainer} ml3`}>
      <AddedAttachmentsList addedOptions={addedOptions} showItemPrice={false} />
      <RemovedAttachmentsList removedOptions={removedOptions} />
    </div>
  )
}

export default AttachmentChildren
