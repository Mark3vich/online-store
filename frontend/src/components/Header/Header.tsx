import React from 'react';
import { Input, Button, Menu } from 'antd';
import { SearchOutlined, SettingOutlined, HeartOutlined, UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../../assets/logo.webp';
import './Header.css'; 

class Header extends React.Component {
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
                        <Button icon={<UserOutlined />} shape="circle" className="me-2" />
                        <Button icon={<ShoppingCartOutlined />} shape="circle" />
                    </div>
                </div>

                <div className="menu-bar">
                    <Menu mode="horizontal" defaultSelectedKeys={['1']} className="w-100 pt-2 pb-4">
                        <Menu.Item key="1" className="text-menu">HOME</Menu.Item>
                        <Menu.Item key="2" className="text-menu">ABOUT</Menu.Item>
                        <Menu.Item key="3" className="text-menu">SHOP</Menu.Item>
                        <Menu.Item key="4" className="text-menu">BLOG</Menu.Item>
                        <Menu.Item key="5" className="text-menu">CONTACTS</Menu.Item>
                    </Menu>
                </div>
            </div>
        );
    }
}

export default Header;
