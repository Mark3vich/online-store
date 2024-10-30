import React from 'react';
import { HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react';
import './Product.css';
import IProduct from '../../../interfaces/IProduct';
import DataCartStores from '../../../stores/DataCartStores';

interface ProductProps {
    border?: boolean;
    width?: string;
    padding?: string;
    product: IProduct;
}

@observer
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

    handleAddToCart = () => {
        const { product } = this.props;
        DataCartStores.addCartProduct(product);

        console.log("Гг", DataCartStores.getCartProducts());
    };

    render() {
        const {
            border = Product.defaultProps.border,
            width = Product.defaultProps.width,
            padding = Product.defaultProps.padding,
            product
        } = this.props;

        const { image, title, description, price } = product;
        return (
            <div className={`product-container ${border ? 'border-start border-end' : ''}`} style={{ width: width, padding: padding }}>
                <div className="icon-container">
                    <HeartOutlined className="icon-heart" />
                    <ShoppingCartOutlined className="icon-cart" onClick={this.handleAddToCart}/>
                </div>
                <img src={image} alt={product.title} />
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