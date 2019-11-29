import React, {useState,useEffect} from "react";
import {getCoins} from "../../api";
import Loader from "../../Components/Loader";
import Coin from "../../Components/Coin";
import PropTypes from "prop-types";

const useCoins = () => {
    const [loading, setLoading] = useState(true);
    const [coins, setCoins] = useState([]);

    const callCoins = async () => {
        try {
            const { data: coins } = await getCoins();
            setCoins(coins);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };
    useEffect(()=>{
        callCoins();
    },[]);

    return {loading,coins};
};

const Coins = ()=>{
    const {loading,coins}=useCoins();
    return (
        loading ? (
        <Loader />
    ) : (
        coins
            .filter(coin => coin.rank !== 0)
            .sort((first, second) => first.rank - second.rank)
            .map(coin => <Coin key={coin.id} {...coin} />)
    ));
};

Coins.propTypes = {
    loading: PropTypes.bool.isRequired,
    coins: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            symbol: PropTypes.string.isRequired,
            rank: PropTypes.number.isRequired
        }).isRequired
    ).isRequired
};

export default Coins;
