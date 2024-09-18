import React from 'react'
import { Modal, Form, Input, Button, Flex, message } from "antd";
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { hideLoginModal, showSignUpModal } from '../store/ModalSlice';
import { setUser } from '../store/UserSlice';
import { LoginUser } from '../apicalls/users';
import { useNavigate } from 'react-router-dom';

const Loginmodal = () => {

    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const visible = useSelector((state) => state.modal.isLoginModalOpen);
    const {role, token} = useSelector((state) => state.users);
    const handleRegisterClick = () => {
        dispatch(hideLoginModal()); 
        dispatch(showSignUpModal());
    };

    const submit = async (values) => {
        dispatch(hideLoginModal());
        //console.log('Form values:', values);
        try{
            const response = await LoginUser(values);
            if(response.success){
                message.success(response.message);
                localStorage.setItem('token', response.accessToken);
                dispatch(setUser({role: response.roles, token: response.accessToken}));
                //console.log(response.message);
                if(role === 'admin'){
                    console.log(1);
                    navigate('/admin');
                }
                else if(role === 'seller'){
                    console.log(2);
                    navigate('/seller');
                }
                else if(role === 'delivery'){
                    console.log(3);
                    navigate('/delivery');
                }
            }else{
                message.error(response.message);
                //console.error(response.message);
            }
        }catch(error){
            message.error(error.message);
            //console.error(response.message);
        }
        form.resetFields();
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