import React from 'react'
import { Modal, Form, Input, Button, Flex } from "antd";
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { hideLoginModal, showSignUpModal } from '../store/ModalSlice';

const Loginmodal = () => {

    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const visible = useSelector((state) => state.modal.isLoginModalOpen);
    const submit = (values) => {
        console.log('Form values:', values);
        dispatch(hideLoginModal());
    };
    const handleRegisterClick = () => {
        dispatch(hideLoginModal()); 
        dispatch(showSignUpModal());
    };
    
  return (
    <Modal
        title="Login"
        open={visible}
        onCancel={() => dispatch(hideLoginModal())}
        footer={null}
        destroyOnClose={true}>
        
        <Form
            form={form}
            layout="vertical"
            onFinish={submit}
            name="login"
            initialValues={{ remember: true }}
            style={{ width: 240}}
            >
            <Form.Item name="email" rules={[{required: true,message: 'Please input your E-mail!',},]}>
                <Input prefix={<MailOutlined />} placeholder="E-mail" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
                <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
            </Form.Item>
            <Form.Item >
                <Link className="login-form-forgot" to ='/forgot'> Forgot password</Link>
            </Form.Item>
            <Form.Item>
                <Button block type="primary" htmlType="submit">Log in</Button>
                <Flex justify="center" align="center">
                <a onClick={handleRegisterClick} >New User, Register now!</a>
                </Flex>
            </Form.Item>
        </Form>
    </Modal>
  )
}

export default Loginmodal