import React from 'react';
import Header from './header';

const Layout = (props) => {
    return (
        <div className="layout" role="document">
            <Header />
            <main className="main p-4" role="main">
                {props.children}
            </main>
        </div>
    );
};

export default Layout;