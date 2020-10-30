import React, { useState, createContext, useEffect } from 'react';

export const FileContext = createContext();

const FileProvider = ({ children }) => {
    const initialState = JSON.parse(localStorage.getItem('files')) || []
    const [files, setFiles] = useState(initialState);

    useEffect(() => {
        localStorage.setItem('files', JSON.stringify(files))
    }, [files])

    return (
        <FileContext.Provider value={[files, setFiles]}>
            {children}
        </FileContext.Provider>
    );
}

export default FileProvider;