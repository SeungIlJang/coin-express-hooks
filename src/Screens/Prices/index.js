import React, {useState,useEffect} from "react";
import Loader from "../../Components/Loader";
import Price from "../../Components/Price";
import { getPrices } from "../../api";
import PropTypes from "prop-types";

const usePrices = () => {

    const [loading, setLoading] = useState(true);
    const [prices, setPrices] = useState([]);

    const callPrices = async () => {
        console.log("call getPrices");
        try {
            const { data: prices } = await getPrices();
            setPrices(prices);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect( () => {
        callPrices();
    },  []);

    return {loading,prices};
};

const Prices = () => {

    const {loading,prices} = usePrices();

    return (
        loading ? (
            <Loader />
        ) : (
            prices.map(price => <Price key={price.id} {...price} />)
        )
    );
};

Prices.propTypes = {
    loading: PropTypes.bool.isRequired,
    prices: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            symbol: PropTypes.string.isRequired,
            quotes: PropTypes.shape({
                USD: PropTypes.shape({
                    price: PropTypes.number.isRequired
                }).isRequired
            }).isRequired
        }).isRequired
    ).isRequired
};


export default Prices;
