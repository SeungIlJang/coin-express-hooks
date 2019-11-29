import React from "react";
import PropTypes from "prop-types";
import Loader from "../../Components/Loader";
import Exchange from "../../Components/CoinExchange";

const CoinExchangesPresenter = ({ loading, exchanges }) =>
  loading ? (
    <Loader />
  ) : (
    exchanges
      .filter(exchange => exchange.fiats.length > 0)
      .map(exchange => <Exchange key={exchange.id} {...exchange} />)
  );

CoinExchangesPresenter.propTypes = {
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

export default CoinExchangesPresenter;
