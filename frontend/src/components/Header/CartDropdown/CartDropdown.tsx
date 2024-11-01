import React, { Component } from 'react';
import { Button, Dropdown, Menu, Badge } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import IProduct from '../../../interfaces/IProduct';

interface CartDropdownProps {
    cart: IProduct[];
}

class CartDropdown extends Component<CartDropdownProps> {
    renderCartMenu = () => {
        const { cart } = this.props;

        return (
            <Menu>
                {cart.length > 0 ? (
                    cart.map((item, index) => (
                        <Menu.Item key={index}>
                            {item.title} - ${item.price} - Колличество: {item.quantity_items_cart}
                        </Menu.Item>
                    ))
                ) : (
                    <Menu.Item>Корзина пуста</Menu.Item>
                )}
            </Menu>
        );
    };

    render() {
        const { cart } = this.props;
        const totalQuantity = cart.reduce((total, item) => total + (item.quantity_items_cart || 0), 0);
        return (
            <Dropdown overlay={this.renderCartMenu()} trigger={['click']}>
                <Badge count={totalQuantity} offset={[10, 0]} style={{ backgroundColor: '#007bff', borderColor: '#007bff', color: '#fff' }}>
                    <Button icon={<ShoppingCartOutlined />} shape="circle" />
                </Badge>
            </Dropdown>
        );
    }
}

export default CartDropdown;
