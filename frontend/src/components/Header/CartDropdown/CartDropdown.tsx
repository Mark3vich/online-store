import React, { Component } from 'react';
import { Button, Dropdown, Menu, Badge } from 'antd';
import { CloseOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import IProduct from '../../../interfaces/IProduct';
import DataCartStores from '../../../stores/DataCartStores';

interface CartDropdownProps {
    cart: IProduct[];
}

class CartDropdown extends Component<CartDropdownProps> {
    renderCartMenu = () => {
        const { cart } = this.props;

        const totalPrice = cart.reduce(
            (sum, item) => sum + parseFloat(item.price) * (item.quantity_items_cart || 1),
            0
        );

        return (
            <Menu>
                {cart.length > 0 ? (
                    cart.map((item, index) => (
                        <Menu.Item key={index}>
                            <img src={item.image} alt={item.title} style={{ width: '50px', marginRight: '10px' }} />
                            <span>{item.title} - ${item.price} - Колличество: {item.quantity_items_cart}</span>
                            <Button
                                type="text"
                                icon={<CloseOutlined />}
                                onClick={() => DataCartStores.removeCartProduct(item.id)} // Удаляет товар по ID
                                style={{ color: 'red' }}
                            />
                        </Menu.Item>
                    ))
                ) : (
                    <Menu.Item>Корзина пуста</Menu.Item>
                )}
                {cart.length > 0 ? (
                    <Menu.Item disabled style={{ fontWeight: 'bold' }}>
                        Общая стоимость: ${totalPrice.toFixed(2)}
                    </Menu.Item>
                ) : null}
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
