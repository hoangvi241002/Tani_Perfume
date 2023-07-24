import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';
import MyContext from '../contexts/MyContext';
import ItemComponent from './ItemComponent';

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            categories: [],
            brands: [],
            txtKeyword: '',
            value: 0,
            rating: 0
        };
    }

    renderStarRating(product, totalStars) {
        const { rating } = product;
        const stars = Array.from({ length: totalStars }, (_, index) => {
            const isFilled = index < rating;
            const starStyle = {
                cursor: 'pointer',
                color: isFilled ? 'gold' : 'grey'
            };
            return (
                <span
                    key={index}
                    style={starStyle}
                    onClick={() => this.handleRatingClick(product, index + 1)}
                >
                    ★
                </span>
            );
        });
        return stars;
    }

    static contextType = MyContext; // using this.context to access global state

    render() {
        const { categories, brands, value } = this.state;
        const { cid, bid } = this.props.params;

        const currentCategory = categories.find(item => item._id === cid);
        const currentBrand = brands.find(item => item._id === bid);

        // Lọc danh sách sản phẩm dựa trên giá trị value
        const filteredProducts = value === 0 ? this.state.products : this.state.products.filter((item) => item.price <= value);

        // Xác định giá tiền tối đa của các sản phẩm trong danh sách products
        const maxProductPrice = this.state.products.reduce((max, product) => {
            return product.price > max ? product.price : max;
        }, 0);

        // Hiển thị thông báo nếu không có sản phẩm ở mức giá này
        if (filteredProducts.length === 0) {
            return (
                <div className='float-main'>
                    <div className='float-left-product'>
                        <Link to="/home"> Trang Chủ </Link> / {currentCategory ? currentCategory.name : currentBrand ? currentBrand.name : ""}
                        <ul> Loại Mặt Hàng
                            <p> - {currentCategory ? currentCategory.name : currentBrand ? currentBrand.name : ""} </p>
                        </ul>
                        <ItemComponent
                            availableProducts={this.getAvailableProductsCount()}
                            outOfStockProducts={this.getOutOfStockProductsCount()}
                        />
                        <ul> Giá <span>{this.state.value}</span>$
                            <div>
                                <input
                                    type="range" id="vol" name="vol" min="0" max="1000"
                                    value={this.state.value} onChange={this.handleChange} />
                            </div>
                        </ul>
                    </div>
                    <div className="float-right-product">
                        <h2 className="text-center">Danh Sách Sản Phẩm</h2>
                        <p>Không có sản phẩm ở mức giá này</p>
                    </div>
                </div>
            );
        } else if (value > maxProductPrice) {
            return (
                <div className='float-main'>
                    <div className='float-left-product'>
                        <Link to="/home"> Trang Chủ </Link> / {currentCategory ? currentCategory.name : currentBrand ? currentBrand.name : ""}
                        <ul> Loại Mặt Hàng
                            <p> - {currentCategory ? currentCategory.name : currentBrand ? currentBrand.name : ""} </p>
                        </ul>
                        <ItemComponent
                            availableProducts={this.getAvailableProductsCount()}
                            outOfStockProducts={this.getOutOfStockProductsCount()}
                        />
                        <ul> Giá <span>{this.state.value}</span>$
                            <div>
                                <input
                                    type="range" id="vol" name="vol" min="0" max="1000"
                                    value={this.state.value} onChange={this.handleChange} />
                            </div>
                        </ul>
                    </div>
                    <div className="float-right-product">
                        <h2 className="text-center">Danh Sách Sản Phẩm</h2>
                        <p>Không có sản phẩm ở mức giá này</p>
                    </div>
                </div>
            );
        }

        // Hiển thị những sản phẩm có giá thấp hơn value
        const prods = filteredProducts.map((item) => {
            return (
                <div key={item._id} className="inline">
                    <figure>
                        <Link to={'/product/' + item._id}><img src={"data:image/jpg;base64," + item.image} width="250px" height="250px" alt="" className='img-products' /></Link>
                        <figcaption className="text-center">
                            {item.name}<br />
                            Price: {item.price}$ <br />
                            {this.renderStarRating(item, 5)} Đánh Giá
                        </figcaption>
                    </figure>
                </div>
            )
        })

        return (
            <div className='float-main'>
                <div className='float-left-product'>
                    <Link to="/home"> Trang Chủ </Link> / {currentCategory ? currentCategory.name : currentBrand ? currentBrand.name : ""}
                    <ul> Loại Mặt Hàng
                        <p> - {currentCategory ? currentCategory.name : currentBrand ? currentBrand.name : ""} </p>
                    </ul>
                    <ItemComponent
                        availableProducts={this.getAvailableProductsCount()}
                        outOfStockProducts={this.getOutOfStockProductsCount()}
                    />
                    <ul> Giá <span>{this.state.value}</span>$
                        <div>
                            <input
                                type="range" id="vol" name="vol" min="0" max="1000"
                                value={this.state.value} onChange={this.handleChange} />
                        </div>
                    </ul>
                </div>
                <div className="float-right-product">
                    <h2 className="text-center">Danh Sách Sản Phẩm</h2>
                    {prods}
                </div>
            </div>
        );
    }
    handleChange = (event) => {
        const value = parseInt(event.target.value);
        this.setState({ value });
    };

    handleRatingClick(product, value) {
        // Lưu đánh giá sản phẩm vào trạng thái của component
        this.setState((prevState) => ({
            products: prevState.products.map((item) => {
                if (item._id === product._id) {
                    return {
                        ...item,
                        rating: value,
                    };
                }
                return item;
            }),
        }));

        // Lưu đánh giá sản phẩm vào Local Storage
        localStorage.setItem(`productRating_${product._id}`, value.toString());
    }

    componentDidMount() {
        const { cid, bid, keyword } = this.props.params;
        if (cid) {
            this.apiGetProductsByCatID(cid);
        } else if (bid) {
            this.apiGetBrandsByCatID(bid);
        } else if (keyword) {
            this.apiGetProductsByKeyword(keyword);
        }
        this.apiGetCategories();
        this.apiGetBrands();

        // Lấy đánh giá sản phẩm từ Local Storage nếu có
        const savedRating = localStorage.getItem(`productRating_${this.props.params.id}`);
        if (savedRating !== null) {
            this.setState({ rating: parseInt(savedRating) });
        }
    }

    componentDidUpdate(prevProps) {
        const { cid, bid, keyword } = this.props.params;
        if (cid && cid !== prevProps.params.cid) {
            this.apiGetProductsByCatID(cid);
        } else if (bid && bid !== prevProps.params.bid) {
            this.apiGetBrandsByCatID(bid);
        } else if (keyword && keyword !== prevProps.params.keyword) {
            this.apiGetProductsByKeyword(keyword);
        }
    }

    apiGetProductsByCatID(cid) {
        axios.get(`/api/customer/products/category/${cid}`)
            .then((res) => {
                const result = res.data;
                this.setState({ products: result }, () => {
                    // Sau khi cập nhật state products, tính toán số lượng sản phẩm
                    const availableProducts = this.getAvailableProductsCount();
                    const outOfStockProducts = this.getOutOfStockProductsCount();
                    // Cập nhật lại state số lượng sản phẩm
                    this.setState({ availableProducts, outOfStockProducts });
                });
            })
            .catch((error) => {
                console.error('Error fetching products by category:', error);
            });
    }

    apiGetBrandsByCatID(bid) {
        axios.get(`/api/customer/products/brand/${bid}`)
            .then((res) => {
                const result = res.data;
                this.setState({ products: result }, () => {
                    // Sau khi cập nhật state products, tính toán số lượng sản phẩm
                    const availableProducts = this.getAvailableProductsCount();
                    const outOfStockProducts = this.getOutOfStockProductsCount();
                    // Cập nhật lại state số lượng sản phẩm
                    this.setState({ availableProducts, outOfStockProducts });
                });
            })
            .catch((error) => {
                console.error('Error fetching products by brand:', error);
            });
    }

    apiGetProductsByKeyword(keyword) {
        axios.get(`/api/customer/products/search/${keyword}`)
            .then((res) => {
                const result = res.data;
                this.setState({ products: result }, () => {
                    // Sau khi cập nhật state products, tính toán số lượng sản phẩm
                    const availableProducts = this.getAvailableProductsCount();
                    const outOfStockProducts = this.getOutOfStockProductsCount();
                    // Cập nhật lại state số lượng sản phẩm
                    this.setState({ availableProducts, outOfStockProducts });
                });
            })
            .catch((error) => {
                console.error('Error fetching products by keyword:', error);
            });
    }

    apiGetCategories() {
        axios.get('/api/customer/categories')
            .then((res) => {
                const result = res.data;
                this.setState({ categories: result });
            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
            });
    }
    apiGetBrands() {
        axios.get('/api/customer/brands')
            .then((res) => {
                const result = res.data;
                this.setState({ brands: result });
            })
            .catch((error) => {
                console.error('Error fetching brands:', error);
            });
    }

    getAvailableProductsCount() {
        const { products } = this.state;
        return products.filter((item) => item.available).length;
    }
    getOutOfStockProductsCount() {
        const { products } = this.state;
        return products.filter((item) => !item.available).length;
    }
}
export default withRouter(Product);