import React, { useState } from 'react';
import { Layout, Menu, Table, Button, Modal, Form, Input, Card, Statistic, Row, Col, Tag } from 'antd';
import { EditOutlined, DeleteOutlined, BarChartOutlined } from '@ant-design/icons';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale, // Import the Category scale
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
const { Header, Content, Sider } = Layout;

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
// Mock Data for Products and Analytics
const initialProducts = [
  { key: '1', name: 'Product 1', price: 50, stock: 20, status: 'Approved' },
  { key: '2', name: 'Product 2', price: 30, stock: 50, status: 'Pending' },
  { key: '3', name: 'Product 3', price: 40, stock: 0, status: 'Rejected' },
];

const Seller = () => {
  const [products, setProducts] = useState(initialProducts);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Data for Analytics (Example)
  const salesData = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Sales',
        data: [100, 200, 150, 300, 250],
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  // Handle adding/editing products
  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsModalVisible(true);
  };

  const handleDelete = (key) => {
    setProducts(products.filter((item) => item.key !== key));
  };

  const handleModalOk = (values) => {
    if (editingProduct) {
      setProducts(
        products.map((item) =>
          item.key === editingProduct.key ? { ...item, ...values } : item
        )
      );
    } else {
      setProducts([...products, { key: `${products.length + 1}`, ...values, status: 'Pending' }]);
    }
    setIsModalVisible(false);
    setEditingProduct(null);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setEditingProduct(null);
  };

  const renderProductStatus = (status) => {
    const colorMap = {
      Approved: 'green',
      Pending: 'orange',
      Rejected: 'red',
    };
    return <Tag color={colorMap[status]}>{status}</Tag>;
  };

  // Product columns for the table
  const columns = [
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `$${price}`,
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: renderProductStatus,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <span>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            style={{ marginRight: 8 }}
          >
            Edit
          </Button>
          <Button
            type="danger"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.key)}
          >
            Delete
          </Button>
        </span>
      ),
    },
  ];

  const productItems = [
    {
      key: 'products',
      label: 'Products',
      icon: <BarChartOutlined />,
    },
    {
      key: 'analytics',
      label: 'Analytics',
      icon: <BarChartOutlined />,
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme="dark">
        <Menu 
          theme="dark" 
          defaultSelectedKeys={['products']}
          items = {productItems}
        />
      </Sider>

      <Layout>
        <Header style={{ backgroundColor: '#fff', textAlign: 'center', padding: 0 }}>
          <h2>Seller Dashboard</h2>
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            {/* Product Management Section */}
            <h3>Product Management</h3>
            <Table columns={columns} dataSource={products} />

            {/* Add/Edit Product Modal */}
            <Modal
              title={editingProduct ? 'Edit Product' : 'Add Product'}
              open={isModalVisible}
              onCancel={handleModalCancel}
              footer={null}
            >
              <ProductForm
                product={editingProduct}
                onFinish={handleModalOk}
              />
            </Modal>

            {/* Analytics Section */}
            <h3 style={{ marginTop: '40px' }}>Sales Analytics</h3>
            <Row gutter={16}>
              <Col span={8}>
                <Card>
                  <Statistic title="Total Sales" value={10234} precision={2} prefix="$" />
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <Statistic title="Total Orders" value={234} />
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <Statistic title="Pending Products" value={2} />
                </Card>
              </Col>
            </Row>
            <div style={{ marginTop: 30 }}>
              <Line data={salesData} />
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

// Form for adding/editing products
const ProductForm = ({ product, onFinish }) => {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      initialValues={product || { name: '', price: '', stock: '' }}
      onFinish={onFinish}
    >
      <Form.Item
        name="name"
        label="Product Name"
        rules={[{ required: true, message: 'Please enter the product name' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="price"
        label="Price"
        rules={[{ required: true, message: 'Please enter the price' }]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        name="stock"
        label="Stock"
        rules={[{ required: true, message: 'Please enter the stock quantity' }]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {product ? 'Update Product' : 'Add Product'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Seller;