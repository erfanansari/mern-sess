/*
 *
 * List
 *
 */

import React from "react";

import { connect } from "react-redux";

import actions from "../../actions";

import AddressList from "../../components/Manager/AddressList";
import SubPage from "../../components/Manager/SubPage";
import NotFound from "../../components/Common/NotFound";

class List extends React.PureComponent {
  // componentDidMount() {
  //   this.props.fetchAddresses();
  // }

  render() {
    // const { history, addresses, noHeader } = this.props;

    const { list, noHeader, history } = this.props;
    console.log({ list });

    if (noHeader) {
      return <AddressList list={list} noHeader={noHeader} />;
      // return (
      //   <>
      //     {list.length > 0 ? (
      //       <AddressList list={list} noHeader={noHeader} />
      //     ) : (
      //       <NotFound message="هیچ شغلی پیدا نشد" />
      //     )}
      //   </>
      // );
    }

    return (
      <>
        <SubPage
          title="شغل"
          actionTitle="افزودن"
          handleAction={() => history.push("/dashboard/job/add")}
        >
          {list.length > 0 ? (
            <AddressList addresses={list} />
          ) : (
            <NotFound message="هیچ شغلی پیدا نشد" />
          )}
        </SubPage>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    addresses: state.address.addresses,
  };
};

export default connect(mapStateToProps, actions)(List);
