import React, {useState,useEffect} from "react";
import {getCoinExchanges} from "../../api";
import Loader from "../../Components/Loader";
import Exchange from "../../Components/CoinExchange";
import PropTypes from "prop-types";

const useCoinExchanges = (id) => {

    const [loading, setLoading] = useState(true);
    const [exchanges, setExchanges] = useState([]);

    const getExchanges = async () => {

        try {
            const { data: exchanges } = await getCoinExchanges(id);
            setExchanges(exchanges);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getExchanges();
    }, []);

    return {loading,exchanges};
};

const CoinExchanges = ({match:{params:{id}}})=> {
    const {loading,exchanges} = useCoinExchanges(id);
    return (
        loading ? (
            <Loader />
        ) : (
            exchanges
                .filter(exchange => exchange.fiats.length > 0)
                .map(exchange => <Exchange key={exchange.id} {...exchange} />)
        )
    );
};

CoinExchanges.propTypes = {
    loading: PropTypes.bool.isRequired,
    exchanges: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            adjusted_volume_24h_share: PropTypes.number,
            fiats: PropTypes.arrayOf(
                PropTypes.shape({
                    name: PropTypes.string,
                    symbol: PropTypes.string
                })
            )
        })
    )
};

export default CoinExchanges;
