import React, { Component } from "react";
import AppRouter from "./routes/AppRouter";
import { Button, Layout, Menu, message } from "antd";
import { HeaderBar } from "./components/header-bar/HeaderBar";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import Resizer from "react-image-file-resizer";
import {
  loggedInUserInitalState,
  orderSummaryInitialState,
  productInitalState,
  promoInitalState,
} from "./utils/initializer";
import api from "./utils/api-url";
import "./App.css";

import { CheckCircleFilled } from "@ant-design/icons";
import { getToken } from "./services/auth";
import { Content } from "antd/lib/layout/layout";
import MessageModal from "./components/modal/message-modal";
import { getDiscountedPrice } from "./utils/helper";

import storage from "./config/firebase";

const { SubMenu } = Menu;
const { Sider } = Layout;

class App extends Component {
  state = {
    cart: [],
    orders: [],
    products: [],
    promocodes: [],
    oldProducts: [],
    userId: "",
    password: "",
    userPhone: "",
    promoCode: "",
    promoError: "",
    searchText: "",
    userPassword: "",
    imageFileName: "",
    preProductAvatarUrl: "",
    resizedImage: null,
    progress: null,
    orderStatusType: "all",
    isEditProduct: false,
    isModalOpen: false,
    isSignupModalOpen: false,
    isProductModalOpen: false,
    isPromocodeModalOpen: false,
    checkError: false,
    termsChecked: false,
    showProductForm: false,
    isEditPromocode: false,
    product: productInitalState,
    promocodeData: promoInitalState,
    loggedInUser: loggedInUserInitalState,
    orderSummary: orderSummaryInitialState,
  };

  componentDidMount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const orderSummary =
      JSON.parse(localStorage.getItem("order-summary")) ||
      orderSummaryInitialState;
    this.setState({ cart, orderSummary });
  }

  onConfirmTypeOrder = () => {
    this.setState({ orderStatusType: "confirm" });
  };

  onCancelTypeOrder = () => {
    this.setState({ orderStatusType: "cancel" });
  };
  onAllTypeOrder = () => {
    this.setState({ orderStatusType: "all" });
  };

  onPendingTypeOrder = () => {
    this.setState({ orderStatusType: "pending" });
  };

  /**
   * This method is for setting admin user id to state
   *
   * @param {event} e
   */
  handleUserIdChange = (e) => {
    this.setState({ userId: e.target.value });
  };

  /**
   * This method is for setting admin passwords to state
   *
   * @param {event} e
   */
  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  /**
   * This method is for setting products to state getting from API call
   *
   * @param {Array} products
   */
  setProductsToState = (products) => {
    this.setState({ products, oldProducts: products });
  };

  /**
   * This method is for setting promocodes to state getting from API call
   *
   * @param {Array} promocodes
   */
  setPromocodesToState = (promocodes) => {
    this.setState({ promocodes });
  };

  /**
   * This method is for setting orders to state getting from API call
   *
   * @param {Array} orders
   */
  setOrdersToState = (orders) => {
    this.setState({ orders });
  };

  /**
   * Set search text from s=input field to state
   *
   * @param {event} e
   */
  handelSearchTextChange = (e) => {
    this.setState({ searchText: e.target.value });
  };

  uploadImageFile = (imageFileName, image) => {
    const uploadResponse = storage
      .ref(`images/${imageFileName}`)
      .putString(image, "data_url");

    uploadResponse.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ progress });
      },
      (error) => {
        message.error(error);
      },
      () => {
        storage
          .ref("images")
          .child(imageFileName)
          .getDownloadURL()
          .then((url) => {
            this.setState({
              product: { ...this.state.product, avatar: url },
            });
          })
          .catch((err) => {
            message.error(err);
          });
      }
    );
  };

  processImageFile = async (img) => {
    try {
      const resizedImage = await resizeFile(img);
      const imageFileName = Date.now().toString().concat("_", img.name);
      this.setState({
        imageFileName,
        product: { ...this.state.product, avatar: resizedImage },
      });
      this.uploadImageFile(imageFileName, resizedImage);
    } catch (err) {
      message.error(err);
    }
  };

  handleImageUploadChange = (e) => {
    if (e.target.files[0] && e.target.files[0] !== "") {
      this.processImageFile(e.target.files[0]);
    }
    if (this.state.isEditProduct) {
      this.setState({ preProductAvatarUrl: this.state.product.avatar });
    }
  };

  onProductActiveChange = () => {
    this.setState({
      product: {
        ...this.state.product,
        active: !this.state.product.active,
      },
    });
  };

  handleProductTitleChange = (e) => {
    this.setState({
      product: { ...this.state.product, title: e.target.value },
    });
  };

  handlePriceChange = (e) => {
    this.setState({
      product: { ...this.state.product, originalPrice: e.target.value },
    });
  };

  handleDiscountChange = (e) => {
    this.setState({
      product: { ...this.state.product, discount: e.target.value },
    });
  };

  handleShippingChange = (e) => {
    this.setState({
      product: { ...this.state.product, shippingCharge: e.target.value },
    });
  };

  handleColorChange = (e) => {
    this.setState({
      product: { ...this.state.product, color: e.target.value },
    });
  };

  handleSizeChange = (e) => {
    this.setState({
      product: { ...this.state.product, size: e.target.value },
    });
  };

  handlePromocodeTitleChange = (e) => {
    this.setState({
      promocodeData: { ...this.state.promocodeData, title: e.target.value },
    });
  };

  handlePromoDiscountChange = (e) => {
    this.setState({
      promocodeData: {
        ...this.state.promocodeData,
        discountRate: e.target.value,
      },
    });
  };

  handlePromoUseTimeChange = (e) => {
    this.setState({
      promocodeData: { ...this.state.promocodeData, useTime: e.target.value },
    });
  };

  handleStartDateChange = (date, dateString) => {
    if (date) {
      this.setState({
        promocodeData: {
          ...this.state.promocodeData,
          startDate: dateString,
        },
      });
    }
  };

  handleEndDateChange = (date, dateString) => {
    if (dateString) {
      this.setState({
        promocodeData: {
          ...this.state.promocodeData,
          endDate: dateString,
        },
      });
    }
  };

  onPromocodeActiveChange = () => {
    this.setState({
      promocodeData: {
        ...this.state.promocodeData,
        active: !this.state.promocodeData.active,
      },
    });
  };

  orderSummary = (product, count) => {
    const {
      totalItems,
      subTotalPrice,
      totalShippingCharge,
    } = this.state.orderSummary;

    return {
      ...this.state.orderSummary,
      totalItems: totalItems + count,
      subTotalPrice:
        subTotalPrice +
        getDiscountedPrice(product.originalPrice, product.discount) * count,
      totalShippingCharge: totalShippingCharge + product.shippingCharge * count,
    };
  };

  addToCart = (product, count) => {
    const cart = this.state.cart.slice();
    const cartObj = { product: product, quantity: count };

    const cartItem = cart.find(
      (item) => item.product._id.toString() === product._id.toString()
    );

    if (!cartItem) {
      this.setState(
        {
          cart: [...this.state.cart, cartObj],
          orderSummary: this.orderSummary(product, count),
        },
        () => {
          localStorage.setItem("cart", JSON.stringify(this.state.cart));
          localStorage.setItem(
            "order-summary",
            JSON.stringify(this.state.orderSummary)
          );
        }
      );
    } else {
      const cartItemIndex = cart.findIndex(
        (item) => item.product._id.toString() === product._id.toString()
      );
      cartItem.quantity += count;
      cart.splice(cartItemIndex, 1, cartItem);
      this.setState(
        { cart, orderSummary: this.orderSummary(product, count) },
        () => {
          localStorage.setItem("cart", JSON.stringify(this.state.cart));
          localStorage.setItem(
            "order-summary",
            JSON.stringify(this.state.orderSummary)
          );
        }
      );
    }
  };

  removeFromCart = (product, count) => {
    const cart = this.state.cart.slice();

    const cartItem = cart.find(
      (item) => item.product._id.toString() === product._id.toString()
    );

    const cartItemIndex = cart.findIndex(
      (item) => item.product._id.toString() === product._id.toString()
    );

    cartItem.quantity += count;
    if (cartItem.quantity === 0) {
      cart.splice(cartItemIndex, 1);
    } else {
      cart.splice(cartItemIndex, 1, cartItem);
    }
    this.setState(
      { cart, orderSummary: this.orderSummary(product, count) },
      () => {
        localStorage.setItem("cart", JSON.stringify(this.state.cart));
        localStorage.setItem(
          "order-summary",
          JSON.stringify(this.state.orderSummary)
        );
      }
    );
  };

  onDeleteFromCart = (cartObj) => {
    const cart = this.state.cart.slice();

    const cartItem = cart.find(
      (item) => item.product._id.toString() === cartObj.product._id.toString()
    );

    const cartItemIndex = cart.findIndex(
      (item) => item.product._id.toString() === cartObj.product._id.toString()
    );

    cart.splice(cartItemIndex, 1);

    this.setState(
      {
        cart,
        orderSummary: this.orderSummary(
          cartItem.product,
          cartItem.quantity * -1
        ),
      },
      () => {
        localStorage.setItem("cart", JSON.stringify(this.state.cart));
        localStorage.setItem(
          "order-summary",
          JSON.stringify(this.state.orderSummary)
        );
      }
    );
  };

  login = async () => {
    const { userId, password } = this.state;

    try {
      const res = await axios.post(api.LOGIN_POST_URL, {
        userId,
        password,
      });

      if (res.status === 201) {
        localStorage.setItem("user", JSON.stringify(res.data));
        this.props.history.push("/admin/admin-panel");
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  showProductAddForm = () => {
    this.setState({ showProductForm: true });
  };

  resetProductForm = () => {
    this.setState({
      progress: null,
      imageFileName: "",
      preProductAvatarUrl: "",
      isEditProduct: false,
      product: productInitalState,
    });
  };

  addProduct = async () => {
    const {
      title,
      avatar,
      active,
      color,
      discount,
      originalPrice,
      shippingCharge,
      size,
    } = this.state.product;

    const productObj = {
      title,
      avatar,
      active,
      color,
      discount,
      originalPrice,
      shippingCharge,
      size,
    };

    try {
      const token = getToken();
      const config = {
        headers: { "x-autentication-token": `bearer ${token}` },
      };
      const savedData = await axios.post(
        api.ADDPRODUCT_POST_URL,
        { product: productObj },
        config
      );

      if (savedData.status === 201) {
        this.setState({
          progress: null,
          imageFileName: "",
          showProductForm: false,
          isProductModalOpen: true,
          product: productInitalState,
        });
      }
    } catch (error) {
      message.error(error);
    }
  };

  onCheckout = async (totalPrice) => {
    if (this.state.termsChecked) {
      try {
        const order = await axios.post(api.CHECKOUT_POST_URL, {
          totalPrice,
        });
        if (order.status === 201) {
          this.setState({ isModalOpen: true });
        }
      } catch (error) {}
    } else {
      message.warn("Please Check Terms and Condition!");
      this.setState({ checkError: true });
    }
  };

  handlePromoCodeChange = (e) => {
    this.setState({ promoCode: e.target.value });
    if (this.state.promoCode) {
      this.setState({ promoError: "" });
    }
  };

  handleOk = () => {
    this.setState({
      cart: [],
      orderSummary: orderSummaryInitialState,
      isModalOpen: false,
    });
    localStorage.removeItem("cart");
    localStorage.removeItem("order-summary");
    this.props.history.replace("/admin/login");
  };

  handleRadioChange = () => {
    this.setState({ termsChecked: true });
  };

  applyPromoCode = async () => {
    const { promoCode, loggedInUser } = this.state;
    if (!!promoCode) {
      if (!loggedInUser.userId) {
        this.props.history.push("/login");
      } else {
        try {
          const promo = await axios.post(api.APPLYPROMO_POST_URL, {
            promoCode,
          });
          if (promo.status === 201) {
            this.setState({
              orderSummary: {
                ...this.state.orderSummary,
                promoDiscountRate: promo.data.discountRate,
              },
            });
            const updatedOrderSummary = {
              ...this.state.orderSummary,
              promoDiscountRate: promo.data.discountRate,
            };
            localStorage.setItem(
              "order-summary",
              JSON.stringify(updatedOrderSummary)
            );
          }
        } catch (error) {
          this.setState({ promoError: error.response.data.errorMes });
        }
      }
    } else {
      message.warn("No Promocode Provided");
    }
  };

  handleUserPhoneChange = (e) => {
    this.setState({ userPhone: e.target.value });
  };

  handleUserPasswordChange = (e) => {
    this.setState({ userPassword: e.target.value });
  };

  signUp = async () => {
    const { userPhone, userPassword } = this.state;
    try {
      const signUpResponse = await axios.post(api.SIGNUP_POST_URL, {
        phone: userPhone,
        password: userPassword,
      });
      if (signUpResponse.status === 201) {
        this.setState({
          loggedInUser: signUpResponse.data,
          isSignupModalOpen: true,
        });
      }
    } catch (error) {}
  };

  addPromocode = async () => {
    const {
      title,
      active,
      discountRate,
      endDate,
      startDate,
      useTime,
    } = this.state.promocodeData;

    const token = getToken();
    const config = {
      headers: { "x-autentication-token": `bearer ${token}` },
    };
    try {
      const addPromoResponse = await axios.post(
        api.ADDPROMO_POST_URL,
        {
          title,
          active,
          discountRate,
          endDate,
          startDate,
          useTime,
        },
        config
      );
      if (addPromoResponse.status === 201) {
        this.setState({
          promocodeData: promoInitalState,
          isPromocodeModalOpen: true,
        });
      }
    } catch (error) {}
  };

  setStatus = async (order, index, status) => {
    const token = getToken();
    const config = {
      headers: { "x-autentication-token": `bearer ${token}` },
    };
    try {
      const orderResponse = await axios.patch(
        api.ORDERSTATUS_PATCH_URL + order._id,
        {
          status,
        },
        config
      );
      if (orderResponse.status === 201) {
        const oldOrders = this.state.orders.slice();
        oldOrders.splice(index, 1, orderResponse.data.order);
        this.setState({
          orders: oldOrders,
        });
      }
    } catch (error) {}
  };

  setActive = async (promocode, index, active) => {
    const token = getToken();
    const config = {
      headers: { "x-autentication-token": `bearer ${token}` },
    };
    try {
      const promoResponse = await axios.patch(
        api.PROMOACTIVE_PATCH_URL + promocode._id,
        {
          active,
        },
        config
      );
      if (promoResponse.status === 201) {
        const oldPromocodes = this.state.promocodes.slice();
        oldPromocodes.splice(index, 1, promoResponse.data.promocode);
        this.setState({
          promocodes: oldPromocodes,
        });
      }
    } catch (error) {}
  };

  editPromocode = (promocode) => {
    this.setState({ isEditPromocode: true, promocodeData: promocode }, () => {
      this.props.history.push("/admin/edit-promocode");
    });
  };

  updatePromocode = async () => {
    const {
      _id,
      title,
      active,
      discountRate,
      endDate,
      startDate,
      useTime,
      usage,
    } = this.state.promocodeData;

    const promocode = {
      title,
      active,
      discountRate,
      endDate,
      startDate,
      useTime,
      usage,
    };

    const token = getToken();
    const config = {
      headers: { "x-autentication-token": `bearer ${token}` },
    };
    try {
      const updatePromoResponse = await axios.put(
        api.UPDATEPROMO_PUT_URL + _id,
        promocode,
        config
      );

      if (updatePromoResponse.status === 201) {
        const promocodes = this.state.promocodes.slice();
        const { promocode } = updatePromoResponse.data;

        const index = promocodes.findIndex(
          (promo) => promocode._id.toString() === promo._id.toString()
        );

        promocodes.splice(index, 1, promocode);
        this.setState(
          {
            promocodes,
            isEditPromocode: false,
            promocodeData: promoInitalState,
          },
          () => {
            message.success("Promocode Updated Successfully!");
            this.props.history.replace("/admin/promocodes");
          }
        );
      }
    } catch (error) {}
  };

  cancelUpdatePromocode = () => {
    this.setState(
      { isEditPromocode: false, promocodeData: promoInitalState },
      () => {
        this.props.history.replace("/admin/promocodes");
      }
    );
  };

  onEditProduct = (product) => {
    this.setState({ isEditProduct: true, product }, () => {
      this.props.history.push("/admin/edit-product");
    });
  };

  onUpdateProduct = async () => {
    const {
      _id,
      title,
      avatar,
      originalPrice,
      discount,
      color,
      size,
      active,
    } = this.state.product;

    const product = {
      title,
      active,
      avatar,
      originalPrice,
      discount,
      color,
      size,
    };

    if (!!this.state.preProductAvatarUrl) {
      const previousImageUrl = this.state.preProductAvatarUrl;
      const deleteRef = storage.refFromURL(previousImageUrl);
      deleteRef
        .delete()
        .then(() => {
          this.setState({ preProductAvatarUrl: "" });
        })
        .catch((err) => {
          this.setState({ preProductAvatarUrl: "" });
        });
    }

    const token = getToken();
    const config = {
      headers: { "x-autentication-token": `bearer ${token}` },
    };
    try {
      const updateProductResponse = await axios.put(
        api.UPDATEPRODUCT_PUT_URL + _id,
        product,
        config
      );

      if (updateProductResponse.status === 201) {
        const products = this.state.products.slice();
        const { product } = updateProductResponse.data;

        const index = products.findIndex(
          (productObj) => product._id.toString() === productObj._id.toString()
        );

        products.splice(index, 1, product);

        this.setState(
          {
            products,
            isEditProduct: false,
            product: productInitalState,
            progress: null,
          },
          () => {
            message.success("Product Updated Successfully!");
            this.props.history.replace("/admin/products");
          }
        );
      }
    } catch (error) {}
  };

  onCancelUpdateProduct = () => {
    this.setState(
      { isEditProduct: false, product: productInitalState, progress: null },
      () => {
        this.props.history.replace("/admin/products");
      }
    );
  };

  onCancelSuccessModal = () => {
    this.props.history.replace("/cart");
    this.setState({ isSignupModalOpen: false });
  };

  onCancelPromoModal = () => {
    this.setState({ isPromocodeModalOpen: false });
  };

  onCancelProductModal = () => {
    this.setState({ isProductModalOpen: false });
  };

  render() {
    const {
      searchText,
      products,
      userId,
      password,
      userPhone,
      userPassword,
      orders,
      cart,
      orderSummary,
      promoCode,
      promoError,
      checkError,
      termsChecked,
      orderStatusType,
      showProductForm,
      promocodes,
      isEditPromocode,
      product,
      progress,
      isEditProduct,
      promocodeData,
      isSignupModalOpen,
      isProductModalOpen,
      isPromocodeModalOpen,
    } = this.state;

    const appRoutesProps = {
      productProps: {
        products,
        searchText,
        setProductsToState: this.setProductsToState,
        addToCart: this.addToCart,
      },
      adminLoginProps: {
        userId,
        password,
        handleUserIdChange: this.handleUserIdChange,
        handlePasswordChange: this.handlePasswordChange,
        login: this.login,
      },
      loginProps: {
        userPhone,
        userPassword,
        isSignupModalOpen,
        onCancelSuccessModal: this.onCancelSuccessModal,
        handleUserPhoneChange: this.handleUserPhoneChange,
        handleUserPasswordChange: this.handleUserPasswordChange,
        signUp: this.signUp,
      },
      adminProductProps: {
        product,
        progress,
        products,
        isEditProduct,
        showProductForm,
        isProductModalOpen,
        resetProductForm: this.resetProductForm,
        setProductsToState: this.setProductsToState,
        showProductAddForm: this.showProductAddForm,
        addProduct: this.addProduct,
        handleImageUploadChange: this.handleImageUploadChange,
        onProductActiveChange: this.onProductActiveChange,
        handleProductTitleChange: this.handleProductTitleChange,
        handlePriceChange: this.handlePriceChange,
        handleDiscountChange: this.handleDiscountChange,
        handleShippingChange: this.handleShippingChange,
        handleColorChange: this.handleColorChange,
        handleSizeChange: this.handleSizeChange,
        onCancelProductModal: this.onCancelProductModal,
        onEditProduct: this.onEditProduct,
        onUpdateProduct: this.onUpdateProduct,
        onCancelUpdateProduct: this.onCancelUpdateProduct,
      },
      adminOrderProps: {
        orders,
        orderStatusType,
        onCancelTypeOrder: this.onCancelTypeOrder,
        onAllTypeOrder: this.onAllTypeOrder,
        onConfirmTypeOrder: this.onConfirmTypeOrder,
        onPendingTypeOrder: this.onPendingTypeOrder,
        setOrdersToState: this.setOrdersToState,
        setStatus: this.setStatus,
      },
      cartProps: {
        cart,
        orderSummary,
        promoCode,
        promoError,
        checkError,
        termsChecked,
        addToCart: this.addToCart,
        removeFromCart: this.removeFromCart,
        onCheckout: this.onCheckout,
        handleRadioChange: this.handleRadioChange,
        handlePromoCodeChange: this.handlePromoCodeChange,
        applyPromoCode: this.applyPromoCode,
        onDeleteFromCart: this.onDeleteFromCart,
      },
      adminPromoProps: {
        promocodes,
        promocodeData,
        isEditPromocode,
        isPromocodeModalOpen,
        setPromocodesToState: this.setPromocodesToState,
        handleStartDateChange: this.handleStartDateChange,
        handleEndDateChange: this.handleEndDateChange,
        handlePromocodeTitleChange: this.handlePromocodeTitleChange,
        handlePromoDiscountChange: this.handlePromoDiscountChange,
        onPromocodeActiveChange: this.onPromocodeActiveChange,
        handlePromoUseTimeChange: this.handlePromoUseTimeChange,
        addPromocode: this.addPromocode,
        editPromocode: this.editPromocode,
        setActive: this.setActive,
        updatePromocode: this.updatePromocode,
        cancelUpdatePromocode: this.cancelUpdatePromocode,
        onCancelPromoModal: this.onCancelPromoModal,
      },
    };

    const sideBar = (
      <Sider width={200} className="sider-site-layout-background">
        <Menu
          mode="inline"
          style={{ height: "100%", borderRight: 0 }}
          selectedKeys={[this.props.location.pathname]}
        >
          <SubMenu key="sub1" title="Promotion">
            <Menu.Item key="/admin/promocodes">
              <Link to="/admin/promocodes">Promocodes</Link>
            </Menu.Item>
            <Menu.Item key="/admin/add-promocode">
              <Link to="/admin/add-promocode">Add Promocode</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="/admin/orders">
            <Link to="/admin/orders">Orders</Link>
          </Menu.Item>
          <Menu.Item key="/admin/products" className="product-link">
            <Link to="/admin/products">Products</Link>
          </Menu.Item>
        </Menu>
      </Sider>
    );

    const showSideBar = () => {
      const { pathname } = this.props.location;
      if (
        pathname === "/admin/login" ||
        pathname === "/products" ||
        pathname === "/cart" ||
        pathname === "/login"
      ) {
        return "";
      }
      return sideBar;
    };

    const renderHeader = () => {
      const { pathname } = this.props.location;
      const isRendered = pathname === "/admin/login" || pathname === "/login";
      if (!isRendered) {
        return (
          <HeaderBar
            {...this.props}
            searchText={this.state.searchText}
            handelSearchTextChange={this.handelSearchTextChange}
            totalItems={this.state.orderSummary.totalItems}
          />
        );
      }
      return "";
    };

    return (
      <Layout className="container">
        {renderHeader()}
        <Layout>
          {showSideBar()}
          <Content>
            <AppRouter {...appRoutesProps} />
          </Content>
        </Layout>
        <MessageModal
          isModalOpen={this.state.isModalOpen}
          width={200}
          height={210}
          top={150}
        >
          <div className="modal-mes-div">
            <CheckCircleFilled style={{ fontSize: 25 }} />
            <span>Your Order Placed Successfully</span>
            <Button className="modal-mes-button" onClick={this.handleOk}>
              Go To Admin Panel
            </Button>
          </div>
        </MessageModal>
      </Layout>
    );
  }
}

const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      500,
      500,
      "PNG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64",
      500,
      500
    );
  });

export default withRouter(App);
