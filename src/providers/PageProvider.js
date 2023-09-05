import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Watch from '../pages/Watch';

const PageProvider = () => {
    return (
        <Routes>
            <Route path={'/'} element={<Home />} />
            <Route path={'/watch'} element={<Watch />} />
        </Routes>
    )
}

export default PageProvider;
