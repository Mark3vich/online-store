import React from 'react';

import { Carousel } from 'antd';

import Timer from './Timer/Timer';

import Brand1 from '../../assets/brand-1.webp';
import Brand2 from '../../assets/brand-2.webp';
import Brand3 from '../../assets/brand-3.webp';
import Brand4 from '../../assets/brand-4.webp';
import Brand5 from '../../assets/brand-5.webp';
import Brand6 from '../../assets/brand-6.webp';

import Discount from '../../assets/main-bg-2.jpg';

import Serve1 from '../../assets/image-serv-1.webp';
import Serve2 from '../../assets/image-serv-2.webp';
import Serve3 from '../../assets/image-serv-3.webp';

import SportBox1 from '../../assets/sport-box-1.png';
import SportBox2 from '../../assets/sport-box-2.png';
import SportBox3 from '../../assets/sport-box-3.png';
import SportBox4 from '../../assets/sport-box-4.png';

import Slide from './Slide/Slide';

import './Home.css';

class Home extends React.Component {
    render(): JSX.Element {
        return (
            <div>
                <Carousel arrows infinite={false}>
                    <div>
                        <Slide slide="../../../assets/slide-2.jpg" title="20%" description="Discount" subtitle="And free shipping" />
                    </div>
                </Carousel>
                <div className='container'>
                    <h3 className='text-title2 text-center mb-5 mt-5'>SHOP TOP CATEGORIES</h3>
                    <div className="d-flex mb-5">
                        <div className='d-flex p-5 flex-grow-1 border-start'>
                            <div>
                                <img src={SportBox1} alt="SportBox1" />
                                <div className='block-category'>
                                    <h3 className='mt-3 mb-3' style={{
                                        color: '#0185ce',
                                        fontFamily: "Oswald",
                                        fontStyle: "normal",
                                        fontSize: '14px',
                                        fontWeight: 'bold',
                                        textTransform: 'uppercase',
                                        textDecoration: 'none',
                                        lineHeight: '18px',
                                        letterSpacing: '0.6px'
                                    }}>BUILD MUSCLE</h3>
                                    <p>Intra-Workouts</p>
                                    <p>Pre-Workouts</p>
                                    <p>Muscle Building Stacks</p>
                                    <p>Creatine</p>
                                    <p>Post-Workouts</p>
                                    <p>Protein</p>
                                    <p>Amino Acids</p>
                                    <p>Glutamine</p>
                                </div>
                            </div>
                        </div>
                        <div className='d-flex p-5 flex-grow-1 border-start border-end'>
                            <div>
                                <img src={SportBox2} alt="SportBox2" />
                                <div className='block-category'>
                                    <h3 className='mt-3 mb-3' style={{
                                        color: '#0185ce',
                                        fontFamily: "Oswald",
                                        fontStyle: "normal",
                                        fontSize: '14px',
                                        fontWeight: 'bold',
                                        textTransform: 'uppercase',
                                        textDecoration: 'none',
                                        lineHeight: '18px',
                                        letterSpacing: '0.6px'
                                    }}>INCREASE ENERGY</h3>
                                    <p>Herbal Energy Enhancers</p>
                                    <p>Energy Shots</p>
                                    <p>Energy Chews</p>
                                    <p>Energy Gels</p>
                                    <p>Energy Drinks</p>
                                    <p>Pre-Workout Supplements</p>
                                    <p>Non-Stimulant Energy</p>
                                    <p>Caffeine / Stimulants</p>
                                </div>
                            </div>
                        </div>
                        <div className='d-flex p-5 flex-grow-1 border-end'>
                            <div>
                                <img src={SportBox3} alt="SportBox3" />
                                <div className='block-category'>
                                    <h3 className='mt-3 mb-3' style={{
                                        color: '#0185ce',
                                        fontFamily: "Oswald",
                                        fontStyle: "normal",
                                        fontSize: '14px',
                                        fontWeight: 'bold',
                                        textTransform: 'uppercase',
                                        textDecoration: 'none',
                                        lineHeight: '18px',
                                        letterSpacing: '0.6px'
                                    }}>IMPROVE WORKOUT</h3>
                                    <p>Post-Workout Recovery</p>
                                    <p>Pre-Workout Supplements</p>
                                    <p>Creatine</p>
                                    <p>Creatine</p>
                                </div>
                            </div>
                        </div>
                        <div className='d-flex p-5 flex-grow-1 border-end'>
                            <div>
                                <img src={SportBox4} alt="SportBox4" />
                                <div className='block-category'>
                                    <h3 className='mt-3 mb-3' style={{
                                        color: '#0185ce',
                                        fontFamily: "Oswald",
                                        fontStyle: "normal",
                                        fontSize: '14px',
                                        fontWeight: 'bold',
                                        textTransform: 'uppercase',
                                        textDecoration: 'none',
                                        lineHeight: '18px',
                                        letterSpacing: '0.6px'
                                    }}>LOSE FAT</h3>
                                    <p>Fat Burners</p>
                                    <p>Stimulant-Free Fat Burners</p>
                                    <p>Fat Control</p>
                                    <p>Carbohydrate Management</p>
                                    <p>Fat Loss Stacks</p>
                                    <p>Fat Loss Stacks</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ backgroundImage: `url(${Discount})`, width: '100%', height: '620px' }}>
                    <div className='container text-center'>
                        <h1 className='text-title mb-3 pt-5'>DEALS OF THE DAY</h1>
                        <h3 className='text-subtitle'>MUSCLE BUILDING WHEY PROTEIN POWDER</h3>
                        <Timer initialDays={0} initialHours={20} initialMinutes={0} initialSeconds={0} />
                    </div>
                </div>
                <div className='container'>
                    <h3 className='text-title2 text-center mb-5 mt-5'>TOP BRANDS</h3>
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