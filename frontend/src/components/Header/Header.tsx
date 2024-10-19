import React from 'react';
import { Menu, Input, Button } from 'antd';
import { SearchOutlined, SettingOutlined, HeartOutlined, UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import Logo from '../../assets/logo.webp';
import './Header.css';

class Header extends React.Component {
    render() {
        return (
            <div className="header" style={{ background: '#fff', padding: 0 }}>
                <div className="logo" style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                        src={Logo}
                        alt="logo"
                        style={{ marginRight: '20px' }}
                    />
                </div>
                <div className="search-bar">
                    <Input
                        placeholder="Search Products..."
                        prefix={<SearchOutlined />}
                        style={{ width: 300, marginRight: '20px' }}
                    />
                </div>
                <Menu mode="horizontal" defaultSelectedKeys={['1']} style={{ flexGrow: 1 }}>
                    <Menu.Item key="1">HOME</Menu.Item>
                    <Menu.Item key="2">ABOUT</Menu.Item>
                    <Menu.Item key="3">SHOP</Menu.Item>
                    <Menu.Item key="4">BLOG</Menu.Item>
                    <Menu.Item key="5">CONTACTS</Menu.Item>
                </Menu>
                <div className="actions" style={{ display: 'flex', alignItems: 'center' }}>
                    <Button shape="circle" icon={<SettingOutlined />} style={{ marginRight: '10px' }} />
                    <Button shape="circle" icon={<HeartOutlined />} style={{ marginRight: '10px' }} />
                    <Button shape="circle" icon={<UserOutlined />} style={{ marginRight: '10px' }} />
                    <Button shape="circle" icon={<ShoppingCartOutlined />} />
                </div>
            </div>
        );
    }
}

export default Header;