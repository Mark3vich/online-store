import React from 'react';
import { Form, Input, Checkbox, Button, Typography } from 'antd';

const { Text, Link } = Typography;

interface FieldType {
    username?: string;
    password?: string;
    remember?: boolean;
}

interface LoginProps {
    onRegisterClick: () => void; // Пропс для переключения на форму регистрации
}

class Login extends React.Component<LoginProps> {
    // Обработчик успешной отправки формы
    private onFinish = (values: FieldType) => {
        console.log('Login Success:', values);
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
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
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

                <Form.Item name="remember" valuePropName="checked">
                    <Checkbox>Remember me</Checkbox>
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
