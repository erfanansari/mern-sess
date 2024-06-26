/*
 *
 * List
 *
 */

import React from "react";

import { connect } from "react-redux";

import actions from "../../actions";

import ProductList from "../../components/Manager/ProductList";
import SubPage from "../../components/Manager/SubPage";
import LoadingIndicator from "../../components/Common/LoadingIndicator";
import NotFound from "../../components/Common/NotFound";

class List extends React.PureComponent {
  componentDidMount() {
    this.props.fetchProducts();
  }

  render() {
    const { history, products, isLoading, noHeader, searchedEvents } =
      this.props;
    const filteredEvents =
      searchedEvents.length > 0 ? searchedEvents : products;

    if (noHeader) {
      return (
        <>
          {isLoading ? (
            <LoadingIndicator inline />
          ) : products.length > 0 ? (
            <ProductList products={filteredEvents} noHeader={noHeader} />
          ) : (
            <NotFound message="رویدادی یافت نشد." />
          )}
        </>
      );
    }

    return (
      <>
        <SubPage
          title="رویداد ها"
          actionTitle="افزودن"
          handleAction={() => history.push("/dashboard/event/add")}
        >
          {isLoading ? (
            <LoadingIndicator inline />
          ) : products.length > 0 ? (
            <ProductList products={filteredEvents} />
          ) : (
            <NotFound message="رویدادی یافت نشد." />
          )}
        </SubPage>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.product.products,
    isLoading: state.events.isLoading,
    user: state.account.user,
    searchedEvents: state.events.searchedEvents,
  };
};

export default connect(mapStateToProps, actions)(List);
