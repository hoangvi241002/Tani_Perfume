import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import ProductDetail from './ProductDetailComponent';

class Product extends Component {
    static contextType = MyContext; // using this.context to access global state
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            noPages: 0,
            curPage: 1,
            itemSelected: null
        };
    }
    render() {
        const prods = this.state.products.map((item) => {
            const categoryName = item.category ? item.category.name : ''; // Kiểm tra category tồn tại trước khi truy cập thuộc tính name
            const brandName = item.brand ? item.brand.name : ''; // Kiểm tra brand tồn tại trước khi truy cập thuộc tính name

            return (
                <tr key={item._id} className="datatable" onClick={() => this.trItemClick(item)}>
                    <td>{item._id}</td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{new Date(item.cdate).toLocaleString()}</td>
                    <td>{categoryName}</td>
                    <td>{brandName}</td>
                    <td><img src={"data:image/jpg;base64," + item.image} width="100px" height="100px" alt="" /></td>
                </tr>
            );
        });
        const pagination = Array.from({ length: this.state.noPages }, (_, index) => {
            if ((index + 1) === this.state.curPage) {
                return (<span key={index}>| <b>{index + 1}</b> |</span>);
            } else {
                return (<span key={index} className="link" onClick={() => this.lnkPageClick(index + 1)}>| {index + 1} |</span>);
            }
        });
        return (
            <div>
                <div className="float-left">
                    <h2 className="text-center">PRODUCT LIST</h2>
                    <table className="datatable" border="1">
                        <tbody>
                            <tr className="datatable">
                                <th>ID</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Creation date</th>
                                <th>Category</th>
                                <th>Brand</th>
                                <th>Image</th>
                            </tr>
                            {prods}
                            <tr>
                                <td colSpan="7">{pagination}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="inline" />
                <ProductDetail item={this.state.itemSelected} curPage={this.state.curPage} brands={this.state.brands} updateProducts={this.updateProducts} />
                <div className="float-clear" />
            </div>
        );
    }
    updateProducts = (products, brands, noPages) => { // arrow-function
        this.setState({ products: products, brands: brands, noPages: noPages });
    }

    componentDidMount() {
        this.apiGetProducts(this.state.curPage);
    }

    // event-handlers
    lnkPageClick = (index) => {
        this.apiGetProducts(index);
    }
    trItemClick = (item) => {
        this.setState({ itemSelected: item });
    }

    // apis
    apiGetProducts(page) {
        const config = { headers: { 'x-access-token': this.context.token } };
        axios.get('/api/admin/products?page=' + page, config).then((res) => {
            const result = res.data;
            this.setState({ products: result.products, noPages: result.noPages, curPage: result.curPage });
        });
    }
}
export default Product;
