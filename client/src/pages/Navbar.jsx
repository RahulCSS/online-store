import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import { Menu, Input, Button, Badge } from 'antd';
import { SearchOutlined, ShoppingCartOutlined } from '@ant-design/icons'
const { Search } = Input;

{/* Menu */}

const items = [
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
    const [current, setCurrent] = useState('1');
    const onClick = (e) => {setCurrent(e.key);};
    
  return (
    <div className="flex justify-between items-center h-[4rem] py-[0.25rem]">

    {/* 1. Logo */}    
        <p className="text-[--logoColor] text-[3rem] tracking-[.5rem] w-[7rem] px-[.5rem]">Zip</p>
    {/* 2. Navigation Menu */}
        <Menu className="gap-[15px] text-[--menuColor] text-[1.25rem] px-[.5rem]" onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
    {/* 3. Search & Cart */}
        <div className="flex items-center gap-[10px]">
            <Search
            placeholder="Search Products..."
            allowClear
            enterButton={<SearchOutlined />}
            style={{ width: '15rem', height: '2rem'}}
            onSearch={onSearch}
            />
            <Button>Login</Button>
            <Badge count={1} size="small">
                <ShoppingCartOutlined style={{fontSize:'1.75rem', color:'#424246'}}/>
            </Badge>
        </div>
    </div>
  )
}

export default Navbar