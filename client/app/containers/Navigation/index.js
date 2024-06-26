/**
 *
 * Navigation
 *
 */

import React from "react";

import { connect } from "react-redux";
import { Link, NavLink as ActiveLink, withRouter } from "react-router-dom";
import Autosuggest from "react-autosuggest";
import AutosuggestHighlightMatch from "autosuggest-highlight/match";
import AutosuggestHighlightParse from "autosuggest-highlight/parse";
import {
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import actions from "../../actions";

import Button from "../../components/Common/Button";
import CartIcon from "../../components/Common/CartIcon";
import { BarsIcon } from "../../components/Common/Icon";
import MiniBrand from "../../components/Store//MiniBrand";
import Menu from "../NavigationMenu";
import Cart from "../Cart";

class Navigation extends React.PureComponent {
  getSuggestionValue(suggestion) {
    return suggestion.name;
  }

  renderSuggestion(suggestion, { query, isHighlighted }) {
    const BoldName = (suggestion, query) => {
      const matches = AutosuggestHighlightMatch(suggestion.name, query);
      const parts = AutosuggestHighlightParse(suggestion.name, matches);

      return (
        <div>
          {parts.map((part, index) => {
            const className = part.highlight
              ? "react-autosuggest__suggestion-match"
              : null;
            return (
              <span className={className} key={index}>
                {part.text}
              </span>
            );
          })}
        </div>
      );
    };

    return (
      <Link to={`/event/${suggestion.slug}`}>
        <div className="d-flex">
          <img
            className="item-image"
            src={`${
              suggestion.imageUrl
                ? suggestion.imageUrl
                : "/images/placeholder-image.png"
            }`}
          />
          <div>
            <Container>
              <Row>
                <Col>
                  <span className="name">{BoldName(suggestion, query)}</span>
                </Col>
              </Row>
              <Row>
                <Col>
                  <span className="price">${suggestion.price}</span>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </Link>
    );
  }

  render() {
    const {
      history,
      authenticated,
      user,
      cartItems,
      brands,
      categories,
      signOut,
      isMenuOpen,
      isCartOpen,
      isBrandOpen,
      toggleCart,
      toggleMenu,
      searchValue,
      suggestions,
      onSearch,
      onSuggestionsFetchRequested,
      onSuggestionsClearRequested,
    } = this.props;

    const inputProps = {
      placeholder: "جستجو در بین شغل ها",
      value: searchValue,
      onChange: (_, { newValue }) => {
        onSearch(newValue);
      },
    };

    return (
      <header className="header fixed-mobile-header">
        <Container>
          <Row className="align-items-center top-header">
            <Col
              xs={{ size: 12, order: 1 }}
              sm={{ size: 12, order: 1 }}
              md={{ size: 3, order: 1 }}
              lg={{ size: 3, order: 1 }}
              className="pr-0"
            >
              <div className="brand">
                {/* {categories && categories.length > 0 && (
                  <Button
                    borderless
                    variant="empty"
                    className="d-none d-md-block"
                    ariaLabel="open the menu"
                    icon={<BarsIcon />}
                    onClick={() => this.toggleMenu()}
                  />
                )} */}
                <Link to="/">
                  <h1 className="logo">SESS</h1>
                </Link>
              </div>
            </Col>
            <Col
              xs={{ size: 12, order: 4 }}
              sm={{ size: 12, order: 4 }}
              md={{ size: 12, order: 4 }}
              lg={{ size: 5, order: 2 }}
              className="pt-2 pt-lg-0"
            >
              <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={this.getSuggestionValue}
                renderSuggestion={this.renderSuggestion}
                inputProps={inputProps}
                onSuggestionSelected={(_, item) => {
                  history.push(`/event/${item.suggestion.slug}`);
                }}
              />
            </Col>
            <Col
              xs={{ size: 12, order: 2 }}
              sm={{ size: 12, order: 2 }}
              md={{ size: 9, order: 1 }}
              lg={{ size: 4, order: 3 }}
            >
              <Navbar color="light" light expand="md" className="mt-1 mt-md-0">
                <Nav navbar>
                  {brands && brands.length > 0 && (
                    <Dropdown
                      nav
                      inNavbar
                      toggle={() => this.toggleBrand()}
                      isOpen={isBrandOpen}
                    >
                      <DropdownMenu right className="nav-brand-dropdown">
                        <div className="mini-brand">
                          <MiniBrand
                            brands={brands}
                            toggleBrand={() => this.toggleBrand()}
                          />
                        </div>
                      </DropdownMenu>
                    </Dropdown>
                  )}
                  <NavItem>
                    <NavLink
                      tag={ActiveLink}
                      to="/users"
                      activeClassName="active"
                    >
                      کاربران
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      tag={ActiveLink}
                      to="/events"
                      activeClassName="active"
                    >
                      رویداد ها
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink tag={ActiveLink} to="/" activeClassName="active">
                      شغل ها
                    </NavLink>
                  </NavItem>
                  {authenticated ? (
                    <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle nav>
                        {user.firstName ? user.firstName : "خوش اومدی"}
                        <span className="fa fa-chevron-down dropdown-caret"></span>
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem
                          onClick={() => history.push("/dashboard")}
                          className="text-right"
                        >
                          داشبورد
                        </DropdownItem>
                        <DropdownItem onClick={signOut} className="text-right">
                          خروج
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  ) : (
                    <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle nav>
                        !خوش اومدی
                        <span className="fa fa-chevron-down dropdown-caret"></span>
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem
                          onClick={() => history.push("/login")}
                          className="text-right"
                        >
                          ورود
                        </DropdownItem>
                        <DropdownItem
                          onClick={() => history.push("/register")}
                          className="text-right"
                        >
                          خروج
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  )}
                </Nav>
              </Navbar>
            </Col>
          </Row>
        </Container>

        {/* hidden cart drawer */}
        <div
          className={isCartOpen ? "mini-cart-open" : "hidden-mini-cart"}
          aria-hidden={`${isCartOpen ? false : true}`}
        >
          <div className="mini-cart">
            <Cart />
          </div>
          <div
            className={
              isCartOpen ? "drawer-backdrop dark-overflow" : "drawer-backdrop"
            }
            onClick={toggleCart}
          />
        </div>

        {/* hidden menu drawer */}
        <div
          className={isMenuOpen ? "mini-menu-open" : "hidden-mini-menu"}
          aria-hidden={`${isMenuOpen ? false : true}`}
        >
          <div className="mini-menu">
            <Menu />
          </div>
          <div
            className={
              isMenuOpen ? "drawer-backdrop dark-overflow" : "drawer-backdrop"
            }
            onClick={toggleMenu}
          />
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isMenuOpen: state.navigation.isMenuOpen,
    isCartOpen: state.navigation.isCartOpen,
    isBrandOpen: state.navigation.isBrandOpen,
    cartItems: state.cart.cartItems,
    brands: state.brand.storeBrands,
    categories: state.category.storeCategories,
    authenticated: state.authentication.authenticated,
    user: state.account.user,
    searchValue: state.navigation.searchValue,
    suggestions: state.navigation.searchSuggestions,
  };
};

export default connect(mapStateToProps, actions)(withRouter(Navigation));
