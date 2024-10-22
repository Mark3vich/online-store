import React from 'react';
import './Product.css';

interface ProductProps {
    image: string;
    alt: string;
    title: string;
    description: string;
    price: string;
}

class Product extends React.Component<ProductProps> {
    constructor(props: ProductProps) {
        super(props);
    }

    render() {
        return (
            <div className="product-container border-start border-end">
                <img src={this.props.image} alt={this.props.alt} />
                <p style={{
                    color: '#0185ce',
                    fontFamily: "Oswald",
                    fontStyle: "normal",
                    fontSize: '14px',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    lineHeight: '18px',
                    letterSpacing: '0.6px'
                }}>{this.props.title}</p>
                <p className='text-title2'>${this.props.price}</p>
                <div className="product-show">
                    <p className='text-title2' style={{ color: '#fff', fontSize: '12px' }}>{this.props.description}</p>
                    <button className='button-shop' style={{ border: 'none', marginTop: '0px' }}>Add to cart</button>
                </div>
            </div>
        );
    }
}

export default Product;