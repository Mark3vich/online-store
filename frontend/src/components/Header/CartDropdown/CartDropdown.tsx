import React, { Component } from 'react';
import { Button, Dropdown, Menu, Badge } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import IProduct from '../../../interfaces/IProduct';

interface CartDropdownProps {
    cartItems: IProduct[];
}

class CartDropdown extends Component<CartDropdownProps> {
    renderCartMenu = () => {
        const { cartItems } = this.props;

        return (
            <Menu>
                {cartItems.length > 0 ? (
                    cartItems.map((item, index) => (
                        <Menu.Item key={index}>
                            {item.title} - ${item.price}
                        </Menu.Item>
                    ))
                ) : (
                    <Menu.Item>Корзина пуста</Menu.Item>
                )}
            </Menu>
        );
    };

    render() {
        const { cartItems } = this.props;

        return (
            <Dropdown overlay={this.renderCartMenu()} trigger={['click']}>
                <Badge count={cartItems.length} offset={[10, 0]} style={{ backgroundColor: '#007bff', borderColor: '#007bff', color: '#fff' }}>
                    <Button icon={<ShoppingCartOutlined />} shape="circle" />
                </Badge>
            </Dropdown>
        );
    }
}

export default CartDropdown;
