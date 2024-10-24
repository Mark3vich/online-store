import React from 'react';
import { Form, Input, Checkbox, Button, Typography, message } from 'antd';
import ILoginUser from '../../../interfaces/ILoginUser';
import { loginUser } from '../../../services/LoginService';

const { Text, Link } = Typography;


interface LoginProps {
    onRegisterClick: () => void; // Пропс для переключения на форму регистрации
}

class Login extends React.Component<LoginProps> {
    private onFinish = async (values: ILoginUser) => {
        try {
            // Вызов сервиса loginUser
            const response = await loginUser(values);
            console.log('Login Success:', response);

            // Показ успешного сообщения
            message.success('Login successful!');

            // Можете добавить здесь редирект или другую логику после успешного входа
        } catch (error) {
            // Обработка ошибок
            console.error('Login Failed:', error);
            message.error('Failed to login. Please check your credentials.');
        }
    };
    // Обработчик неудачной отправки формы
    private onFinishFailed = (errorInfo: any) => {
        console.log('Login Failed:', errorInfo);
    };

    render() {
        return (
            <Form
                name="login"
                layout="vertical"
                initialValues={{ remember: true }}
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Login
                    </Button>
                </Form.Item>

                <Text type="secondary">
                    Don't have an account?{' '}
                    <Link onClick={this.props.onRegisterClick}>Register here</Link>
                </Text>
            </Form>
        );
    }
}

export default Login;
