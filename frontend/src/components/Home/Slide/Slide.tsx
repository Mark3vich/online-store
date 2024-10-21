import React from 'react';

import './Slide.css';

interface SlideProps {
    slide: string;
    title: string;
    description: string;
    subtitle: string;
}


class Slide extends React.Component<SlideProps> {
    constructor(props: SlideProps) {
        super(props);
    }
    render() {
        return (
            <div style={{
                backgroundImage: `url(${this.props.slide})`,
                width: '100%',
                height: '620px',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
            }}>
            <div className='container'>
                <p className='slide-title'>{this.props.title}</p>
                <p className='slide-description'>{this.props.description}</p>
                <p className='slide-subtitle'>{this.props.subtitle}</p>
                <a className="button-shop">See all products</a></div>
            </div>
        );
    }
}

export default Slide;