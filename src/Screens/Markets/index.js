import React, {useState,useEffect} from "react";
import {getCoinMarkets} from "../../api";
import Loader from "../../Components/Loader";
import Market from "../../Components/Market";
import PropTypes from "prop-types";

const useMarkets = (id) => {
    const [loading, setLoading] = useState(true);
    const [markets, setMarkets] = useState([]);

    const getMarkets = async () => {

        try {
            const { data: markets } = await getCoinMarkets(id);
            setMarkets(markets);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };
    useEffect(()=>
    {
        getMarkets();
    },[]);
    return {loading,markets};
};

const Markets = ({match:{params:{id}}})=> {
    const {loading,markets} = useMarkets(id);
    return (
        loading ? (
            <Loader />
        ) : (
            markets
                .filter(market => market.market_url)
                .map((market, index) => (
                    <Market
                        key={market.id || index}
                        url={market.market_url}
                        name={market.exchange_name}
                    />
                ))
        )
    );
};

Markets.propTypes = {
    loading: PropTypes.bool.isRequired,
    markets: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired
        })
    )
};

export default Markets;
