import React from 'react';
import { Input, Button, Row, Col } from 'antd';
import { FacebookFilled, TwitterSquareFilled, LinkedinFilled, InstagramFilled } from '@ant-design/icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css'; 

class Footer extends React.Component {
    render() {
        return (
            <div className="footer bg-light p-5">
                <div className="newsletter-section text-center mb-4">
                    <h3 className="mb-3">JOIN OUR NEWSLETTER</h3>
                    <p>
                        Be the first to receive exciting news, features, and special offers
                        from Certionix
                    </p>
                    <div className="d-flex justify-content-center">
                        <Input
                            placeholder="Enter Please Your E-mail"
                            style={{ width: '300px', marginRight: '10px' }}
                        />
                        <Button type="primary">SUBSCRIBE</Button>
                    </div>
                </div>

                <div className="connect-section text-center mt-4">
                    <h4 className="mb-3">CONNECT WITH US</h4>
                    <Row justify="center" align="middle" gutter={[16, 16]}>
                        <Col>
                            <Button
                                shape="circle"
                                icon={<FacebookFilled style={{ fontSize: '28px' }}/>}
                                size="large"
                                style={{ backgroundColor: '#3b5998', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                            />
                        </Col>
                        <Col>
                            <Button
                                shape="circle"
                                icon={<TwitterSquareFilled style={{ fontSize: '28px' }}/>}
                                size="large"
                                style={{ backgroundColor: '#1DA1F2', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                            />
                        </Col>
                        <Col>
                            <Button
                                shape="circle"
                                icon={<LinkedinFilled style={{ fontSize: '28px' }}/>}
                                size="large"
                                style={{ backgroundColor: '#0077b5', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                            />
                        </Col>
                        <Col>
                            <Button
                                shape="circle"
                                icon={<InstagramFilled style={{ fontSize: '28px' }}/>}
                                size="large"
                                style={{ backgroundColor: '#C13584', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                            />
                        </Col>
                    </Row>

                </div>

                <div className="copyright-section text-center mt-4">
                    <p>© 2024. All rights reserved.</p>
                </div>
            </div>
        );
    }
}

export default Footer;
