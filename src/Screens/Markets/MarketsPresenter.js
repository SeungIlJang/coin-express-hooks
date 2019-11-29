import React from "react";
import PropTypes from "prop-types";
import Loader from "../../Components/Loader";
import Market from "../../Components/Market";

const MarketsPresenter = ({ loading, markets }) =>
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
  );

MarketsPresenter.propTypes = {
  loading: PropTypes.bool.isRequired,
  markets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  )
};

export default MarketsPresenter;
