import { Layout, Select, Space, Button } from 'antd';
import { useCrypto } from '../../context/crypto-context';
import { useState, useEffect } from 'react';
const headerStyle = {
  textAlign: 'center',
  height: 60,
  lineHeight: '60px',
  width: '100%',
  padding: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

export default function AppHeader() {
  const [select, setSelect] = useState(false);
  const { crypto } = useCrypto();

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === '/') {
        e.preventDefault();
        setSelect((prev) => !prev);
      }
    };
    document.addEventListener('keypress', handleKeyPress);
    return () => {
      document.removeEventListener('keypress', handleKeyPress);
    };
  }, []);

  function handleSelect(value) {
    console.log('Selected coin ID:', value);
  }

  return (
    <Layout.Header style={headerStyle}>
      <Select
        style={{ width: 250 }}
        value="press /to  open"
        open={select}
        onSelect={(value) => handleSelect(value)}
        onClick={() => setSelect((prev) => !prev)}
        options={crypto.map(coin => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={option => (
          <Space>
            <img style={{ width: 20 }} src={option.data.icon} alt={option.data.label} />
            {option.data.label}
          </Space>
        )}
      />
      <Button type='default'>Add asset</Button>
    </Layout.Header>
  );
}