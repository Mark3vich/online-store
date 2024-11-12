import React from 'react';
import { getProduct } from '../../services/ProductsService';
import withParams from '../../hooks/withParams';
import IProduct from '../../interfaces/IProduct';
import { Button, Row, Col, Typography } from 'antd';
import "./Product.css";
import Reviews from './Reviews/Reviews';

interface ProductState {
    product: IProduct | null;
}

interface Params {
    id: string;
}

interface Props {
    params: Params;
}

class Product extends React.Component<Props, ProductState> {
    constructor(props: Props) {
        super(props);
        this.state = {
            product: null,
        };
    }

    async componentDidMount(): Promise<void> {
        const { id } = this.props.params;
        if (id) {
            const product = await getProduct(id);
            this.setState({ product });
        }
    }

    render() {
        const { product } = this.state;

        if (!product) {
            return <div>Loading...</div>;
        }

        return (
            <div className="container mt-5 mb-5">
                <Row gutter={[32, 32]} align="top">
                    {/* Блок с изображением товара */}
                    <Col xs={24} md={12} lg={8} className="product-image">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="img-fluid rounded shadow-sm"
                        />
                    </Col>

                    {/* Блок с информацией о товаре */}
                    <Col xs={24} md={12} lg={16} className="product-info">
                        <h1 className="text-3xl font-bold mb-3 title-text">{product.title}</h1>
                        <p className="text-muted mb-4 text-description">{product.description}</p>
                        <div className="d-flex align-items-center mb-4">
                            <h1 className="text-3xl font-bold mb-0 me-2 title-text">Category:</h1>
                            <p className="text-3xl font-bold mb-0 me-2" style={{ fontSize: '20px' }}>{product.category}</p>
                        </div>

                        <div className="d-flex align-items-center justify-content-start gap-3 mb-4">
                            <Typography.Title
                                level={3}
                                className="text-3xl font-bold mb-0 title-text"
                                style={{ marginTop: '0.5rem' }}
                            >
                                Price:
                            </Typography.Title>
                            <span
                                className="fs-4 fw-semibold text-price"
                                style={{ marginTop: '0.5rem' }}
                            >
                                ${product.price}
                            </span>
                        </div>

                        <Button type="primary" size="large">
                            Add to Cart
                        </Button>
                    </Col>
                </Row>
                <div>
                    <Reviews params={this.props.params} />
                </div>
            </div>
        );
    }
}

export default withParams(Product);
