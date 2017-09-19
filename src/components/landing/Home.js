import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Home = () => {
    return (
        <div>
            <Header/>
            <div className="container text-muted">
                <Footer/>
            </div>
        </div>
    );
};

export default Home;
