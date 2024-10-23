import React from 'react';
import { Form, Input, Button, Upload, Checkbox, Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Text, Link } = Typography;

interface RegisterProps {
    onLoginClick: () => void; // Пропс для переключения на форму входа
}

interface FieldType {
    username?: string;
    name?: string;
    avatar?: File;
    password?: string;
    confirmPassword?: string;
    remember?: boolean;
}

class Register extends React.Component<RegisterProps> {
    // Обработчик успешной отправки формы
    private onFinish = (values: FieldType) => {
        console.log('Register Success:', values);
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
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Avatar"
                    name="avatar"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
                >
                    <Upload name="avatar" listType="picture" beforeUpload={() => false}>
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
                    name="confirmPassword"
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

                <Form.Item name="remember" valuePropName="checked">
                    <Checkbox>Remember me</Checkbox>
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
