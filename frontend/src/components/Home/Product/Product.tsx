import React from 'react';
import './Product.css';

interface ProductProps {
    image: string;
    border?: boolean;
    alt?: string;
    title: string;
    description: string;
    price: string;
    width?: string;
    padding?: string;
}

class Product extends React.Component<ProductProps> {
    static defaultProps = {
        border: false,
        width: '320px',
        padding: '30px',
        alt: 'Whey Protein',
    };

    constructor(props: ProductProps) {
        super(props);
    }

    render() {
        const {
            image,
            title,
            description,
            price,
            border = Product.defaultProps.border,
            width = Product.defaultProps.width,
            padding = Product.defaultProps.padding,
            alt = Product.defaultProps.alt,
        } = this.props;
        return (
            <div className={`product-container ${border ? 'border-start border-end' : ''}`} style={{ width: width, padding: padding }}>
                <img src={image} alt={alt} />
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
                }}>{title}</p>
                <p className='text-title2'>${price}</p>
                <div className="product-show">
                    <p className='text-title2' style={{ color: '#fff', fontSize: '12px' }}>{description}</p>
                    <button className='button-shop' style={{ border: 'none', marginTop: '0px' }}>Add to cart</button>
                </div>
            </div>
        );
    }
}

export default Product;