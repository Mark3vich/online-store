import React from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';

// Define the type for form fields
type FieldType = {
    name: string;
    image: string;
    email: string;
    password: string;
    password2: string; // Password confirmation
};

class Register extends React.Component {
    // Handle form submission success
    private onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
    };

    // Handle form submission failure
    private onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    render(): JSX.Element {
        return (
            <div style={{ maxWidth: '400px', margin: '0 auto' }}>
                <h1>Register</h1>

                {/* Ant Design Form */}
                <Form
                    name="register"
                    initialValues={{ remember: true }}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                    layout="vertical"
                >
                    {/* Name Field */}
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <Input placeholder="Enter your name" />
                    </Form.Item>

                    {/* Image Field */}
                    <Form.Item
                        label="Image URL"
                        name="image"
                        rules={[{ required: true, message: 'Please input the image URL!' }]}
                    >
                        <Input placeholder="Enter image URL" />
                    </Form.Item>

                    {/* Email Field */}
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: 'Please input your email!' },
                            { type: 'email', message: 'Please enter a valid email address!' }
                        ]}
                    >
                        <Input placeholder="Enter your email" />
                    </Form.Item>

                    {/* Password Field */}
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password placeholder="Enter your password" />
                    </Form.Item>

                    {/* Confirm Password Field */}
                    <Form.Item
                        label="Confirm Password"
                        name="password2"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            { required: true, message: 'Please confirm your password!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Passwords do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder="Confirm your password" />
                    </Form.Item>

                    {/* Agreement Checkbox */}
                    <Form.Item
                        name="agreement"
                        valuePropName="checked"
                        rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject('You must agree to the terms') }]}
                    >
                        <Checkbox>
                            I agree to the <a href="#">Terms and Conditions</a>
                        </Checkbox>
                    </Form.Item>

                    {/* Submit Button */}
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default Register;
