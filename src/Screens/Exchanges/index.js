import React, {useState,useEffect} from "react";
import {getExchanges} from "../../api";
import Loader from "../../Components/Loader";
import Exchange from "../../Components/Exchange";
import PropTypes from "prop-types";

const useExchanges = ()=>{
    const [loading, setLoading] = useState(true);
    const [exchanges, setExchanges] = useState([]);

    const callExchanges = async () => {
        console.log("call getPrices");
        try {
            const { data: exchanges } = await getExchanges();
            setExchanges(exchanges);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect( () => {
        callExchanges();
    },  []);

    return {loading,exchanges};

};

const Exchanges = () => {
    const {loading,exchanges} = useExchanges();
    return (
        loading ? (
            <Loader />
        ) : (
            exchanges.map(exchange => <Exchange key={exchange.id} {...exchange} />)
        )
    );
};

Exchanges.propTypes = {
    loading: PropTypes.bool.isRequired,
    exchanges: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            description: PropTypes.string,
            links: PropTypes.shape({
                website: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
            }).isRequired
        }).isRequired
    ).isRequired
};

export default Exchanges;
