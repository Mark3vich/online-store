import React from 'react';
import { Button, Checkbox, Form, Input, Modal, Typography } from 'antd';
import type { FormProps } from 'antd';
import Register from '../Register/Register'; // Assuming the Register component is available

const { Link, Text } = Typography;

type FieldType = {
    username?: string;
    password?: string;
    remember?: boolean;
};

type LoginState = {
    isLoginVisible: boolean;
    isRegisterVisible: boolean;
};

class Login extends React.Component<{}, LoginState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            isLoginVisible: true, // Login modal initially visible
            isRegisterVisible: false, // Register modal initially hidden
        };
    }

    // Handle form submission for login
    private onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Login Success:', values);
    };

    private onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Login Failed:', errorInfo);
    };

    // Open the registration modal
    private openRegisterModal = () => {
        this.setState({
            isLoginVisible: false, // Hide login modal
            isRegisterVisible: true, // Show register modal
        });
    };

    // Open the login modal
    private openLoginModal = () => {
        this.setState({
            isLoginVisible: true, // Show login modal
            isRegisterVisible: false, // Hide register modal
        });
    };

    // Close the login modal
    private closeLoginModal = () => {
        this.setState({ isLoginVisible: false });
    };

    // Close the register modal
    private closeRegisterModal = () => {
        this.setState({ isRegisterVisible: false });
    };

    render(): JSX.Element {
        const { isLoginVisible, isRegisterVisible } = this.state;

        return (
            <>
                {/* Login Modal */}
                <Modal
                    title="Login"
                    visible={isLoginVisible}
                    onCancel={this.closeLoginModal}
                    footer={null} // Remove footer buttons
                >
                    <Form
                        name="login"
                        layout="vertical"
                        initialValues={{ remember: true }}
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}
                    >
                        <Form.Item<FieldType>
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item<FieldType>
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item<FieldType>
                            name="remember"
                            valuePropName="checked"
                        >
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>
                                Login
                            </Button>
                        </Form.Item>

                        <Text type="secondary">
                            Don't have an account?{' '}
                            <Link onClick={this.openRegisterModal}>Register here</Link>
                        </Text>
                    </Form>
                </Modal>

                {/* Register Modal */}
                <Modal
                    title="Register"
                    visible={isRegisterVisible}
                    onCancel={this.closeRegisterModal}
                    footer={null} // Remove footer buttons
                >
                    <Register />
                    <Text type="secondary">
                        Already have an account?{' '}
                        <Link onClick={this.openLoginModal}>Login here</Link>
                    </Text>
                </Modal>
            </>
        );
    }
}

export default Login;
