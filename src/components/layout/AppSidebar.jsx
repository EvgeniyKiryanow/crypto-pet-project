import { Layout, Card, Statistic, List, Typography, Spin, Tag } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import {capitalizeFirstLetter} from '../../utils.js';
import {useContext} from 'react';
import CryptoContext from '../../context/crypto-context.jsx';
const siderStyle = {
  padding: '1rem',
};
export default function AppSidebar() {
  const { assets, loading, crypto } = useContext(CryptoContext);

  return (
    <Layout.Sider width="35%" style={siderStyle}>
      {assets.map(asset => (
        <Card key={asset.id} style={{ marginBottom: '1rem' }} variant="borderless">
          <Statistic
            title={capitalizeFirstLetter(asset.id)}
            value={asset.totalAmount}
            precision={2}
            valueStyle={{ color: asset.grow ? '#3f8600' : '#cf1322' }}
            prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            suffix="$"
          />
          <List
            dataSource={[
              {title: 'Total Profit', value: asset.totalProfit.toFixed(2) + ' $', withTag: true, tag: asset.grow ? 'Profit' : 'Loss'},
              {title: 'Asset Amount', value: asset.amount, isPlainText: true},
            ]}
            size='small'
            renderItem={item => (
              <List.Item>
                <span>{item.title}</span>
                {item.withTag ? (
                  <Tag color={asset.grow ? 'green' : 'red'} style={{ marginLeft: '1rem' }}>
                    {asset.growPercent.toFixed(2)} %
                  </Tag>
                ) : null}
                {item.isPlainText ? (
                  <Typography.Text>{item.value}</Typography.Text>
                ) : (
                  <Typography.Text type={asset.grow ? 'success' : 'danger'}>{item.value}</Typography.Text>
                )}
              </List.Item>
            )} />

        </Card>
      ))}
    </Layout.Sider>
  );
}