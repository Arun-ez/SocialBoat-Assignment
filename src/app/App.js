import React from 'react';
import PageProvider from '../providers/PageProvider';
import ColorModeProvider from '../providers/ColorModeProvider';
import DataContextProvider from '../providers/DataContextProvider';

import { Navbar } from '../components/Navbar';

const App = () => {

    return (
        <ColorModeProvider>
            <DataContextProvider>
                <Navbar />
                <PageProvider />
            </DataContextProvider>
        </ColorModeProvider>
    )
}

export default App;
