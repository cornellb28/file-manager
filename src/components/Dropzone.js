import React, { useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import { FETCH_AUDIO_FILES, METADATA_COMPLETED } from '../utils/constants';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import { FileContext } from '../contexts/FileContext';

const { ipcRenderer } = window.require('electron');

const Dropzone = (props) => {
  const [files, setFiles] = useContext(FileContext);

  const addFiles = (f) => {
    _.map(f, ({ name, path, size, type, tags, id }) => {
      setFiles(prevFiles => [...prevFiles, { id: id, name: name, path: path, size: size, type: type, tags: tags }])
    })
  }

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'audio/*',
    onDrop: files => {
      
      const filesData = _.map(files, ({ id = uuidv4(), name, path, size, type, tags = {} }) => {
        return { id, name, path, size, type, tags };
      });
      
      ipcRenderer.send(FETCH_AUDIO_FILES, filesData);
      ipcRenderer.on(METADATA_COMPLETED, (event, filesWithData) => {
        addFiles(filesWithData);
      })
    }
  });

  return (
    <>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
    </>
  );

}

export default Dropzone;