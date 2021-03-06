import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { Icon, Header } from 'semantic-ui-react'
 
const DropzonePage = ({setfiles}) => {
  const onDrop = useCallback(acceptedFiles => {
    setfiles(acceptedFiles.map(file=>Object.assign(file,{
        preview:URL.createObjectURL(file)
    })))
  }, [setfiles])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    multiple:false,
    accept:'image/*'

})
 
  return (
    <div {...getRootProps()} className={'dropzone '+(isDragActive && 'dropzone--isActive')}>
      <input {...getInputProps()} />
        <Icon name='upload' size='huge'/>
        <Header content='Drag image here'/> 
    </div>
  )
}

export default DropzonePage