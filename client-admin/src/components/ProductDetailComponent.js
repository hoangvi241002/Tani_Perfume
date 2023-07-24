import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';

class ProductDetail extends Component {
    static contextType = MyContext;

    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            brands: [],
            txtID: '',
            txtName: '',
            txtPrice: 0,
            cmbCategory: '',
            cmbBrand: '',
            imgProduct: '',
        };
    }

    render() {
        const { categories, brands, txtID, txtName, txtPrice, cmbCategory, cmbBrand, imgProduct } = this.state;

        const categoryOptions = categories.map((cate) => (
            <option
                key={cate._id}
                value={cate._id}
                selected={cate._id === cmbCategory}
            >
                {cate.name}
            </option>
        ));

        const brandOptions = brands.map((brand) => {
            return (
                <option
                    key={brand._id}
                    value={brand._id}
                    selected={brand._id === cmbBrand}
                >
                    {brand.name}
                </option>
            )
        }

        );

        return (
            <div className="float-right">
                <h2 className="text-center">PRODUCT DETAIL</h2>
                <form>
                    <table>
                        <tbody>
                            <tr>
                                <td>ID</td>
                                <td>
                                    <input
                                        type="text"
                                        value={txtID}
                                        onChange={(e) => { this.setState({ txtID: e.target.value }) }}
                                        readOnly={true}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Name</td>
                                <td>
                                    <input
                                        type="text"
                                        value={txtName}
                                        onChange={(e) => { this.setState({ txtName: e.target.value }) }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Price</td>
                                <td>
                                    <input
                                        type="text"
                                        value={txtPrice}
                                        onChange={(e) => { this.setState({ txtPrice: e.target.value }) }}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Image</td>
                                <td>
                                    <input
                                        type="file"
                                        name="fileImage"
                                        accept="image/jpeg, image/png, image/gif"
                                        onChange={(e) => this.previewImage(e)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>Category</td>
                                <td>
                                    <select
                                        onChange={(e) => { this.setState({ cmbCategory: e.target.value }) }}
                                    >
                                        {categoryOptions}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>Brand</td>
                                <td>
                                    <select
                                        onChange={(e) => { this.setState({ cmbBrand: e.target.value }) }}
                                    >
                                        {brandOptions}
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>
                                    <input
                                        type="submit"
                                        value="ADD NEW"
                                        onClick={(e) => this.btnAddClick(e)}
                                    />
                                    <input
                                        type="submit"
                                        value="UPDATE"
                                        onClick={(e) => this.btnUpdateClick(e)}
                                    />
                                    <input
                                        type="submit"
                                        value="DELETE"
                                        onClick={(e) => this.btnDeleteClick(e)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    <img src={imgProduct} width="300px" height="300px" alt="" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }

    componentDidMount() {
        this.apiGetCategories();
        this.apiGetBrands();
    }

    componentDidUpdate(prevProps) {
        if (this.props.item !== prevProps.item) {
            const { _id, name, price, category, brand, image } = this.props.item;
            this.setState({
                txtID: _id,
                txtName: name,
                txtPrice: price,
                cmbCategory: category._id,
                cmbBrand: brand._id,
                imgProduct: 'data:image/jpg;base64,' + image,
            });
        }
    }

    previewImage(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (evt) => {
                this.setState({ imgProduct: evt.target.result });
            };
            reader.readAsDataURL(file);
        }
    }
    // event-handle
    btnAddClick(e) {
        e.preventDefault();
        const { txtName, txtPrice, cmbCategory, cmbBrand, imgProduct } = this.state;
        const image = imgProduct.replace(/^data:image\/[a-z]+;base64,/, '');

        if (txtName && txtPrice && cmbCategory && cmbBrand && image) {
            const prod = {
                name: txtName,
                price: parseInt(txtPrice),
                category: cmbCategory,
                brand: cmbBrand,
                image: image,
            };
            this.apiPostProduct(prod);
        } else {
            alert('Please input all required fields');
        }
    }

    btnUpdateClick(e) {
        e.preventDefault();
        const { txtID, txtName, txtPrice, cmbCategory, cmbBrand, imgProduct } = this.state;
        const image = imgProduct.replace(/^data:image\/[a-z]+;base64,/, '');

        if (txtID && txtName && txtPrice && cmbCategory && cmbBrand && image) {
            const prod = {
                name: txtName,
                price: parseInt(txtPrice),
                category: cmbCategory,
                brand: cmbBrand,
                image: image,
            };
            this.apiPutProduct(txtID, prod);
        } else {
            alert('Please input all required fields');
        }
    }

    btnDeleteClick(e) {
        e.preventDefault();
        if (window.confirm('ARE YOU SURE?')) {
            const { txtID } = this.state;
            if (txtID) {
                this.apiDeleteProduct(txtID);
            } else {
                alert('Please input ID');
            }
        }
    }
    // aip
    apiGetCategories() {
        const config = { headers: { 'x-access-token': this.context.token } };
        axios.get('/api/admin/categories', config).then((res) => {
            const result = res.data;
            this.setState({ categories: result });
        });
    }

    apiGetBrands() {
        const config = { headers: { 'x-access-token': this.context.token } };
        axios.get('/api/admin/brands', config).then((res) => {
            const result = res.data;
            this.setState({ brands: result });
        });
    }

    apiPostProduct(prod) {
        const config = { headers: { 'x-access-token': this.context.token } };
        axios.post('/api/admin/products', prod, config).then((res) => {
            const result = res.data;
            if (result) {
                alert('OK BABY!');
                this.apiGetProducts();
            } else {
                alert('SORRY BABY!');
            }
        });
    }

    apiGetProducts() {
        const config = { headers: { 'x-access-token': this.context.token } };
        axios.get('/api/admin/products?page=' + this.props.curPage, config).then((res) => {
            const result = res.data;
            if (result.products.length !== 0) {
                this.props.updateProducts(result.products, result.noPages);
            } else {
                axios.get('/api/admin/products?page=' + (this.props.curPage - 1), config).then((res) => {
                    const result = res.data;
                    this.props.updateProducts(result.products, result.noPages);
                });
            }
        });
    }

    apiPutProduct(id, prod) {
        const config = { headers: { 'x-access-token': this.context.token } };
        axios.put('/api/admin/products/' + id, prod, config).then((res) => {
            const result = res.data;
            if (result) {
                alert('OK BABY!');
                this.apiGetProducts();
            } else {
                alert('SORRY BABY!');
            }
        });
    }

    apiDeleteProduct(id) {
        const config = { headers: { 'x-access-token': this.context.token } };
        axios.delete('/api/admin/products/' + id, config).then((res) => {
            const result = res.data;
            if (result) {
                alert('OK BABY!');
                this.apiGetProducts();
            } else {
                alert('SORRY BABY!');
            }
        });
    }
}

export default ProductDetail;
