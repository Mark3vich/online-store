import React from 'react';
import Slide from '../../assets/slide-2.jpg';

class Home extends React.Component {
    render() {
        return (
            <div>
                <img src={Slide} alt="Slide" />
                <div className='container'>
                    <h1>Home</h1>
                </div>
            </div>
        );
    }
}

export default Home;