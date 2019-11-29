import React from "react";
import CoinExchangesPresenter from "./CoinExchangesPresenter";
import { getCoinExchanges } from "../../api";

export default class extends React.Component {
  state = {
    loading: true,
    exchanges: []
  };
  getExchanges = async () => {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    try {
      const { data: exchanges } = await getCoinExchanges(id);
      this.setState({ exchanges });
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({ loading: false });
    }
  };
  componentDidMount() {
    this.getExchanges();
  }
  render() {
    return <CoinExchangesPresenter {...this.state} />;
  }
}
