import React from 'react'
import { Modal, Form, Input, Button } from "antd";
import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const Loginmodal = ({ visible, onClose }) => {

    const [form] = Form.useForm();
    const handleSubmit = (values) => {
        console.log('Form values:', values);
        onClose();
    };
    
  return (
    <Modal
        title="Login"
        open={visible}
        onCancel={onClose}
        footer={null}
        destroyOnClose={true}>
        
        <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            name="login"
            initialValues={{ remember: true }}
            style={{ width: 240}}
            >
            <Form.Item name="email" rules={[{required: true,message: 'Please input your E-mail!',},]}>
                <Input prefix={<MailOutlined />} placeholder="Username" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
                <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
            </Form.Item>
            <Form.Item >
                <Link className="login-form-forgot" to ='/forgot'> Forgot password</Link>
            </Form.Item>
            <Form.Item>
                <Button block type="primary" htmlType="submit">Log in</Button>
                or 
                <a >Register now!</a>
            </Form.Item>
        </Form>
    </Modal>
  )
}

export default Loginmodal