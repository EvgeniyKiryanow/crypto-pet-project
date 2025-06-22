import { createContext, useEffect, useState } from "react";
import { fakeFetchCryptoData, fakeFetchCryptoAssets } from '../api.js';
const CryptoContext = createContext({
    crypto: [],
    assets: [],
    loading: false,
});

export function CryptoContextProvider({ children, value }) {
    const [loading, setLoading] = useState(false);
    const [crypto, setCrypto] = useState([]);
    const [assets, setAssets] = useState([]);
    useEffect(() => {
        async function preload() {
            setLoading(true);
            const { result } = await fakeFetchCryptoData();
            const assets = await fakeFetchCryptoAssets();

            setAssets(assets.map(asset => {
                const coin = result.find(c => c.id === asset.id);

                return {
                    grow: asset.price < coin.price,
                    growPercent: 100 * Math.abs((asset.price - coin.price) / ((asset.price + coin.price) / 2)),
                    totalAmount: asset.amount * coin.price,
                    totalProfit: (asset.amount * coin.price) - asset.amount * asset.price,
                    ...asset,
                };
            }));
            setCrypto(result);
            setLoading(false);
        }
        preload();
    }, []);

    return (
        <CryptoContext.Provider value={{
            crypto,
            assets,
            loading
        }}>
            {children}
        </CryptoContext.Provider>
    );
}

export default CryptoContext;
