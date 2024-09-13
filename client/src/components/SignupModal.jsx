import React from 'react'
import { Modal, Form, Input, Button, Flex } from "antd";
import { ArrowRightOutlined, UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from'react-redux';
import { hideSignUpModal,showLoginModal } from '../store/ModalSlice';

const SignupModal = () => {
    const dispatch = useDispatch();
    const visible = useSelector((state) => state.modal.isSignUpModalVisible);
    const [form] = Form.useForm();

    const handleSubmit = (values) => {
        console.log('Sign Up Form values:', values);
        dispatch(hideSignUpModal());
    };
    const handleRegisterClick = () => {
        dispatch(hideSignUpModal()); 
        dispatch(showLoginModal());
    };

  return (
    <Modal
      title="Sign Up"
      open={visible}
      onCancel={() => dispatch(hideSignUpModal())}
      footer={null}
      destroyOnClose={true}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item
          name="username"
          label="Username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          dependencies={['password']}
          rules={[
            { required: true, message: 'Please confirm your password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords that you entered do not match!'));
              },
            }),
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Confirm Password" />
        </Form.Item>
        <Form.Item>
            <Flex justify="center" align="center">
                <Button type="primary" htmlType="submit">
                    Sign Up
                </Button>
            </Flex>
            <Flex justify="center" align="center">
                <a onClick={handleRegisterClick}> Already an User, Login <ArrowRightOutlined /></a>
            </Flex>
                
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default SignupModal