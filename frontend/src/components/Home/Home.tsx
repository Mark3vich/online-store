import React from 'react';
import Slide from '../../assets/slide-2.jpg';
import Discount from '../../assets/main-bg-2.jpg';
import Timer from './Timer/Timer';
import './Home.css';

import Brand1 from '../../assets/brand-1.webp';
import Brand2 from '../../assets/brand-2.webp';
import Brand3 from '../../assets/brand-3.webp';
import Brand4 from '../../assets/brand-4.webp';
import Brand5 from '../../assets/brand-5.webp';
import Brand6 from '../../assets/brand-6.webp';

class Home extends React.Component {
    render() {
        return (
            <div>
                <img src={Slide} alt="Slide" />
                <div className='container'>
                    <h1>Home</h1>
                </div>
                <div style={{ backgroundImage: `url(${Discount})`, width: '100%', height: '620px' }}>
                    <div className='container text-center'>
                        <h1>DEALS OF THE DAY</h1>
                        <h3>MUSCLE BUILDING WHEY PROTEIN POWDER</h3>
                        <Timer initialDays={0} initialHours={20} initialMinutes={0} initialSeconds={0} />
                    </div>
                </div>
                <div className='container'>
                    <h3 className='text-center mb-5 mt-5'>TOP BRANDS</h3>
                    <div className="row mb-5 align-items-center">
                        <div className="col brand-column">
                            <img src={Brand1} alt="Brand1" />
                        </div>
                        <div className="col brand-column">
                            <img src={Brand2} alt="Brand2" />
                        </div>
                        <div className="col brand-column">
                            <img src={Brand3} alt="Brand3" />
                        </div>
                        <div className="col brand-column">
                            <img src={Brand4} alt="Brand4" />
                        </div>
                        <div className="col brand-column">
                            <img src={Brand5} alt="Brand5" />
                        </div>
                        <div className="col brand-column">
                            <img src={Brand6} alt="Brand6" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;