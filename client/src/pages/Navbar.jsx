import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//Components
import { Menu, Input, Button, Badge, message, Avatar, Space, Dropdown} from 'antd';
const { Search } = Input;
import { SearchOutlined, ShoppingCartOutlined, UserOutlined} from '@ant-design/icons';
import Loginmodal from '../components/Loginmodal';
import SignupModal from '../components/SignupModal';
// API
import { GetCurrentUser } from '../apicalls/users';
// Actions
import { showLoginModal } from '../store/ModalSlice';
import { clearUser } from '../store/UserSlice';
import { showLoading,hideLoading } from '../store/LoaderSlice';

{/* Menu */}

const menuItems = [
    {
      label: (<Link to="/">Home</Link>),
      key: 1,
    },
    {
      label: 'Products',
      key: 2,
    },
    {
      label: 'Store',
      key: 3,
      children: [
        {
          type: 'group',
          label: 'Item 1',
          children: [
            {
              label: 'Option 1',
              key: 'setting:1',
            },
            {
              label: 'Option 2',
              key: 'setting:2',
            },
          ],
        },
        {
          type: 'group',
          label: 'Item 2',
          children: [
            {
              label: 'Option 3',
              key: 'setting:3',
            },
            {
              label: 'Option 4',
              key: 'setting:4',
            },
          ],
        },
      ],
    },
    {
      key: 4,
      label: "Getapp",
    },
  ];
const onSearch = (value, _e, info) => console.log(info?.source, value);


const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [current, setCurrent] = useState('1');
  const onClick = (e) => {setCurrent(e.key);};
  const showModal = () => {
      dispatch(showLoginModal());
  };

  const logout = () => {
    localStorage.removeItem("token");
    dispatch(clearUser());
    message.info({
      content: "You have been logged out successfully!",
      style: {
        marginTop: "30vh",
      },
    });
    setTimeout(() => {
      navigate("/");
    }, 500);
  };
  
  const items = [
    {
      label: "1st menu item",
      key: "1",
    },
    {
      label: "2nd menu item",
      key: "2",
    },
    {
      type: "divider",
    },
    {
      label: <a onClick={logout}>Log Out</a>,
      key: "3",
      danger: true,
    },
  ];
  const roles = useSelector((state)=> state.users.role);
  useEffect(()=> {
    if(roles === 'admin'){
        console.log(4);
        navigate('/admin');
    }
    else if(roles === 'seller'){
        console.log(5);
        navigate('/seller');
    }
    else if(roles === 'delivery'){
        console.log(6);
        navigate('/delivery');
    }
  },[roles]);
  return (
    <div className="flex justify-between items-center h-[4rem] py-[0.25rem]">

    {/* 1. Logo */}    
        <p className="text-[--logoColor] text-[3rem] tracking-[.5rem] w-[7rem] px-[.5rem]">Zip</p>
    {/* 2. Navigation Menu */}
        {(!roles || roles!='user') && <Menu className="gap-[15px] text-[--menuColor] text-[1.25rem] px-[.5rem]" onClick={onClick} selectedKeys={[current]} mode="horizontal" items={menuItems} />}
    {/* 3. Search & Cart */}
        <div className="flex items-center gap-[10px]">
            <Search
            placeholder="Search Products..."
            allowClear
            enterButton={<SearchOutlined />}
            style={{ width: '15rem', height: '2rem'}}
            onSearch={onSearch}
            />
            {!roles && <Button onClick={showModal}>Login</Button>}
            <Badge count={1} size="small">
                <ShoppingCartOutlined style={{fontSize:'1.75rem', color:'#424246'}}/>
            </Badge>
            {roles && (<Dropdown menu={{ items }}>
                        <a onClick={(e) => e.preventDefault()}>
                          <Space>
                            <Avatar
                              style={{
                                backgroundColor: "#87d068",
                              }}
                              size="large"
                              icon={<UserOutlined />}
                            />
                          </Space>
                        </a>
                      </Dropdown>)
            }
            <Loginmodal />
            <SignupModal />
        </div>
    </div>
  )
}

export default Navbar