import React from 'react';

import { IReactionDisposer, reaction } from 'mobx';
import { observer } from 'mobx-react';
import { Button, Input, Menu, Modal } from 'antd';
import { Link, Location } from 'react-router-dom';

import { SearchOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';

import Logo from '../../assets/logo.webp';
import Login from '../Profile/Login/Login';
import IProduct from '../../interfaces/IProduct';
import withLocation from '../../hooks/withLocation';
import Register from '../Profile/Register/Register';
import CartDropdown from './CartDropdown/CartDropdown';
import DataCartStores from '../../stores/DataCartStores';

import 'bootstrap/dist/css/bootstrap.min.css';

import './Header.css';
import DataLikeStores from '../../stores/DataLikeStores';
import LikeDropdown from './LikeDropdown/LikeDropDovn';

interface AppState {
    isModalVisible: boolean;
    modalType: 'login' | 'register';
    cartProducts: IProduct[];
    likedProducts: IProduct[];
}

interface ShopProps {
    location: Location; // Указываем что location обязателен
}

@observer
class Header extends React.Component<ShopProps, AppState> {
    private cartDisposer?: IReactionDisposer;
    private likesDisposer?: IReactionDisposer;

    constructor(props: ShopProps) {
        super(props);
        this.state = {
            isModalVisible: false, // Modal visibility for registration form
            modalType: 'login',
            cartProducts: [],
            likedProducts: [],
        };
    }

    componentDidMount() {
        // Получаем данные корзины
        DataCartStores.fetchCartProducts();

        // Получаем данные лайков
        DataLikeStores.fetchLikesProducts();

        // Реакция для обновления состояния при изменении данных корзины
        this.cartDisposer = reaction(
            () => DataCartStores.getCartProducts(), // Observable data для отслеживания
            (cartProducts) => {
                this.setState({ cartProducts }); // Обновляем состояние компонента
            }
        );

        // Реакция для обновления состояния при изменении данных лайков
        this.likesDisposer = reaction(
            () => DataLikeStores.getLikes(), // Observable data для отслеживания
            (likedProducts) => {
                this.setState({ likedProducts }); // Обновляем состояние компонента
            }
        );
    }

    componentWillUnmount() {
        if (this.cartDisposer) {
            this.cartDisposer(); // Очищаем реакцию для корзины
        }

        if (this.likesDisposer) {
            this.likesDisposer(); // Очищаем реакцию для лайков
        }
    }

    // Check localStorage for token and show registration form if no token exists
    protected handleUserClick = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            this.setState({ isModalVisible: true, modalType: 'login' });
        }
    };

    // Switch to the login form in the modal
    protected handleSwitchToLogin = () => {
        this.setState({ modalType: 'login' }); // Switch to login modal
    };

    // Switch to the registration modal
    protected handleSwitchToRegister = () => {
        this.setState({ modalType: 'register' }); // Switch to registration modal
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

    // Открытие модального окна для логина
    private openLoginModal = () => {
        this.setState({ isModalVisible: true, modalType: 'login' });
    };

    // Открытие модального окна для регистрации
    private openRegisterModal = () => {
        this.setState({ isModalVisible: true, modalType: 'register' });
    };

    // Закрытие модального окна
    private closeModal = () => {
        this.setState({ isModalVisible: false });
    };

    render() {
        const { isModalVisible, modalType, cartProducts, likedProducts } = this.state;

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
                        <LikeDropdown likes={likedProducts} />
                        <Button icon={<UserOutlined />} shape="circle" className="me-2" onClick={this.handleUserClick} />
                        <CartDropdown cart={cartProducts} />
                        <Modal
                            title={modalType === 'login' ? 'Login' : 'Register'}
                            visible={isModalVisible}
                            onCancel={this.closeModal}
                            footer={null} // Убираем нижние кнопки
                            destroyOnClose={true} // Уничтожаем содержимое после закрытия
                        >
                            {modalType === 'login' ? (
                                <Login onRegisterClick={this.openRegisterModal} />
                            ) : (
                                <Register onLoginClick={this.openLoginModal} />
                            )}
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
                        {/* <Menu.Item key="2" className="text-menu">
                            <Link to="/about" style={{ textDecorationLine: 'none' }}>ABOUT</Link>
                        </Menu.Item> */}
                        <Menu.Item key="3" className="text-menu">
                            <Link to="/shop" style={{ textDecorationLine: 'none' }}>SHOP</Link>
                        </Menu.Item>
                        {/* <Menu.Item key="5" className="text-menu">
                            <Link to="/contacts" style={{ textDecorationLine: 'none' }}>CONTACTS</Link>
                        </Menu.Item> */}
                    </Menu>
                </div>
            </div >
        );
    }
}

export default withLocation(Header);
