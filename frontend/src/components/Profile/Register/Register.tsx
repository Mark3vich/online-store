import React from 'react';
import { Form, Input, Button, Upload, Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import IRegisterUser from '../../../interfaces/IRegisterUser';
import { registerUser } from '../../../services/RegisterService';

const { Text, Link } = Typography;

interface RegisterProps {
    onLoginClick: () => void; // Пропс для переключения на форму входа
}

interface RegisterState {
    loading: boolean; // Для индикации загрузки
}

class Register extends React.Component<RegisterProps, RegisterState> {
    constructor(props: RegisterProps) {
        super(props);
        this.state = {
            loading: false, // Состояние загрузки
        };
    }
    // Обработчик успешной отправки формы
    private onFinish = async (values: IRegisterUser) => {
        this.setState({ loading: true });
        try {
            const response = await registerUser(values);
            console.log('User registered successfully:', response);
            // Дополнительно: можно сделать редирект на страницу логина или показать уведомление
        } catch (error) {
            console.error('Registration error:', error);
            // Показать уведомление об ошибке
        } finally {
            this.setState({ loading: false });
        }
    };

    // Обработчик неудачной отправки формы
    private onFinishFailed = (errorInfo: any) => {
        console.log('Register Failed:', errorInfo);
    };

    render() {
        return (
            <Form
                name="register"
                layout="vertical"
                initialValues={{ remember: true }}
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
            >
                <Form.Item
                    label="name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your name!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Image"
                    name="image"
                    valuePropName="file"
                    getValueFromEvent={(e) => (e && e.file)}
                >
                    <Upload name="image" listType="picture" beforeUpload={() => false}>
                        <Button icon={<UploadOutlined />}>Upload Avatar</Button>
                    </Upload>
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Confirm Password"
                    name="password_confirmation"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        { required: true, message: 'Please confirm your password!' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The two passwords do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Register
                    </Button>
                </Form.Item>

                <Text type="secondary">
                    Already have an account?{' '}
                    <Link onClick={this.props.onLoginClick}>Login here</Link>
                </Text>
            </Form>
        );
    }
}

export default Register;
