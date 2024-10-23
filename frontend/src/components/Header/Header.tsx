import React from 'react';
import { Input, Button, Menu, Modal } from 'antd';
import { SearchOutlined, SettingOutlined, HeartOutlined, UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../../assets/logo.webp';
import './Header.css';
import { Link, Location } from 'react-router-dom';
import withLocation from '../../hooks/withLocation';
import Login from '../Profile/Login/Login';

interface AppState {
    isModalVisible: boolean;
}

interface ShopProps {
    location: Location; // Указываем что location обязателен
}

class Header extends React.Component<ShopProps, AppState> {
    constructor(props: ShopProps) {
        super(props);
        this.state = {
            isModalVisible: false, // Modal visibility for registration form
        };
    }

    // Check localStorage for token and show registration form if no token exists
    protected handleUserClick = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            this.setState({ isModalVisible: true });
        } else {
            // Handle the case where token exists, e.g., redirect to the user's profile
            console.log('Token found:', token);
        }
    };

    // Close the registration modal
    protected handleModalClose = () => {
        this.setState({ isModalVisible: false });
    };
    private getSelectedKey = () => {
        const { location } = this.props;// Получаем текущий маршрут
        switch (location.pathname) {
            case '/':
                return '1';
            case '/about':
                return '2';
            case '/shop':
                return '3';
            case '/contacts':
                return '5';
            default:
                return '1'; // Значение по умолчанию, если маршрут не найден
        }
    };
    render() {
        return (
            <div className="header bg-white pt-4 container">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <div className="d-flex align-items-center">
                        <div className="logo">
                            <img
                                src={Logo}
                                alt="logo"
                                style={{ height: '50px', marginRight: '20px' }}
                            />
                        </div>

                        <div className="search-bar">
                            <Input
                                placeholder="Search Products..."
                                prefix={<SearchOutlined />}
                                style={{ width: 300 }}
                            />
                        </div>
                    </div>

                    <div className="actions d-flex">
                        <Button icon={<SettingOutlined />} shape="circle" className="me-2" />
                        <Button icon={<HeartOutlined />} shape="circle" className="me-2" />
                        <Button icon={<UserOutlined />} shape="circle" className="me-2" onClick={this.handleUserClick} />
                        <Button icon={<ShoppingCartOutlined />} shape="circle" />
                        <Modal
                            visible={this.state.isModalVisible}
                            onCancel={this.handleModalClose}
                            footer={null} // No footer buttons
                        >
                            <Login /> 
                        </Modal>
                    </div>
                </div>

                <div className="menu-bar">
                    <Menu mode="horizontal"
                        selectedKeys={[this.getSelectedKey()]}
                        className="w-100 pt-2 pb-4"
                    >
                        <Menu.Item key="1" className="text-menu">
                            <Link to="/" style={{ textDecorationLine: 'none' }}>HOME</Link>
                        </Menu.Item>
                        <Menu.Item key="2" className="text-menu">
                            <Link to="/about" style={{ textDecorationLine: 'none' }}>ABOUT</Link>
                        </Menu.Item>
                        <Menu.Item key="3" className="text-menu">
                            <Link to="/shop" style={{ textDecorationLine: 'none' }}>SHOP</Link>
                        </Menu.Item>
                        <Menu.Item key="5" className="text-menu">
                            <Link to="/contacts" style={{ textDecorationLine: 'none' }}>CONTACTS</Link>
                        </Menu.Item>
                    </Menu>
                </div>
            </div >
        );
    }
}

export default withLocation(Header);
