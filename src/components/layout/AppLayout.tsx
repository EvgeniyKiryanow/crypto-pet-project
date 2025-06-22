import { Layout, Spin } from 'antd';
import AppHeader from './AppHeader';
import AppSidebar from './AppSidebar';
import AppContent from './AppContents';
import CryptoContext from '../../context/crypto-context.jsx';
import { useContext } from 'react';

export default function AppLayout() {
    const { assets, loading, crypto } = useContext(CryptoContext);
    if (loading) {
        return (
            <Spin fullscreen />
        );
    }
    return (
        <Layout>
            <AppHeader />
            <Layout>
                <AppSidebar />
                <AppContent />
            </Layout>
        </Layout>
    );
}

