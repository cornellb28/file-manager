import React, { useState, createContext, useEffect } from 'react'

export const TreeContext = createContext();

const TreeProvider = ({ children }) => {
    const initialState = JSON.parse(localStorage.getItem('watchedtree')) || []
    const [watchedtree, setWatchedTrees] = useState(initialState);

    useEffect(() => {
        localStorage.setItem('watchedtree', JSON.stringify(watchedtree))
    }, [watchedtree])

    return (
        <TreeContext.Provider value={[watchedtree, setWatchedTrees]}>
            {children}
        </TreeContext.Provider>
    );
}

export default TreeProvider;