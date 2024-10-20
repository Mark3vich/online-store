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

import Serve1 from '../../assets/image-serv-1.webp';
import Serve2 from '../../assets/image-serv-2.webp';
import Serve3 from '../../assets/image-serv-3.webp';

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
                    <div className="row align-items-center mb-5">
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
                    <div className='d-flex justify-content-between mb-5 w-100'>
                        <div className='d-flex p-5 flex-grow-1' style={{ backgroundColor: '#0185ce' }}>
                            <img src={Serve1} alt="Serve1" style={{ height: 50 + '%' }} />
                            <div className="ms-2">
                                <h1 className="text-white text-uppercase font-weight-bold mb-24" style={{ fontFamily: 'Oswald', fontStyle: 'sans-serif', fontSize: '16px', letterSpacing: '0.7px' }}>MONEY BACK GUARANTEE</h1>
                                <h3 className="text-white" style={{ fontFamily: 'Oswald', fontStyle: 'sans-serif', fontSize: '15px', letterSpacing: '0.7px' }}>Returns & Exchanges</h3>
                            </div>
                        </div>
                        <div className='d-flex p-5 flex-grow-1' style={{ backgroundColor: '#ffffff', borderColor: '#e7e8e9', borderWidth: '1px', borderStyle: 'solid', marginLeft: '20px', marginRight: '20px' }}>
                            <img src={Serve2} alt="Serve2" style={{ height: 50 + '%' }} />
                            <div className="ms-2">
                                <h1 className="text-uppercase font-weight-bold mb-24" style={{ fontFamily: 'Oswald', fontStyle: 'sans-serif', fontSize: '16px', letterSpacing: '0.7px', color: '#171a25' }}>FREE SHIPPING</h1>
                                <h3 style={{ fontFamily: 'Oswald', fontStyle: 'sans-serif', fontSize: '15px', letterSpacing: '0.7px', color: '#757b91' }}>On orders over $99. <br />This offer is valid on all our store items.</h3>
                            </div>
                        </div>
                        <div className='d-flex p-5 flex-grow-1' style={{ backgroundColor: '#171a25' }}>
                            <img src={Serve3} alt="Serve3" style={{ height: 50 + '%' }} />
                            <div className="ms-2">
                                <h1 className="text-white text-uppercase font-weight-bold mb-24" style={{ fontFamily: 'Oswald', fontStyle: 'sans-serif', fontSize: '16px', letterSpacing: '0.7px', color: '#171a25' }}>3800-2345-6789</h1>
                                <h3 style={{ fontFamily: 'Oswald', fontStyle: 'sans-serif', fontSize: '15px', letterSpacing: '0.7px', color: '#757b91' }}>Customer Support
                                    <br />Days a week from 9:00 am to 7:00 pm</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;