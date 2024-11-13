import React from 'react';
import IProduct from '../../../interfaces/IProduct';
import { Menu, Dropdown, Button, Typography, Badge } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react';

interface LikeDropdownProps { 
    likes: IProduct[];
}

@observer
class LikeDropdown extends React.Component<LikeDropdownProps> {
    render() {
        const { likes } = this.props;

        // Функция для генерации элементов меню
        const menuItems = likes.map((product) => (
            <Menu.Item key={product.id}>
                <div className="d-flex align-items-center">
                    {/* Отображаем изображение продукта, если оно есть */}
                    {product.image && (
                        <img
                            src={product.image}
                            alt={product.title}
                            style={{ width: 40, height: 40, marginRight: 10, objectFit: 'cover' }}
                        />
                    )}
                    <span>{product?.title}</span>
                </div>
            </Menu.Item>
        ));

        // Создаем меню для Dropdown
        const menu = (
            <Menu>
                {likes.length > 0 ? (
                    menuItems
                ) : (
                    <Menu.Item disabled>
                        <Typography.Text type="secondary">Нет лайков</Typography.Text>
                    </Menu.Item>
                )}
            </Menu>
        );

        return (
            <Dropdown overlay={menu} trigger={['click']} >
                <Badge count={likes.length} offset={[10, 0]} className='me-2' style={{ backgroundColor: '#007bff', borderColor: '#007bff', color: '#fff'}}>
                    <Button icon={<HeartOutlined />} shape="circle" />
                </Badge>
            </Dropdown>
        );
    }
}

export default LikeDropdown;
