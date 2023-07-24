import axios from 'axios';
import React, { Component } from 'react';
import withRouter from '../utils/withRouter';
import MyContext from '../contexts/MyContext';

class ProductDetail extends Component {
    static contextType = MyContext; // using this.context to access global state
    constructor(props) {
        super(props);
        this.state = {
            product: null,
            txtQuantity: 1,
            rating: 0
        };
    }

    renderStarRating(totalStars) {
        const { rating } = this.state;
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
                    onClick={() => this.handleRatingClick(index + 1)}
                >
                    ★
                </span>
            );
        });
        return stars;
    }

    render() {
        const prod = this.state.product;
        if (prod != null) {
            return (
                <div className="product-main">
                    <h2 className="text-center">Sản Phẩm</h2>
                    <figure className="caption-right">
                        <div className='product-left'>
                            <img src={"data:image/jpg;base64," + prod.image} width="600px" height="600px" alt="" />
                        </div>

                        <div className='product-right'>
                            <h3>{prod.name}</h3>
                            {this.renderStarRating(5)} Đánh Giá
                            <p>Giá: {prod.price}$</p>
                            <p>Thương Hiệu Sản Phẩm: {prod.brand.name}</p>
                            <input type="number" min="1" max="99" value={this.state.txtQuantity} onChange={(e) => { this.setState({ txtQuantity: e.target.value }) }} />
                            <input type="submit" value="Thêm Vào Giỏ Hàng" onClick={(e) => this.btnAdd2CartClick(e)} className='add-cart' />

                        </div>
                    </figure>

                    <div>
                        <h2 className="text-center"> Phản Hồi Từ Khách hàng </h2>
                    </div>
                </div>
            );
        }
        return (<div />);
    }
    componentDidMount() {
        const params = this.props.params;
        this.apiGetProduct(params.id);

        // Lấy đánh giá sản phẩm từ Local Storage 
        const savedRating = localStorage.getItem(`productRating_${params.id}`);
        if (savedRating !== null) {
            this.setState({ rating: parseInt(savedRating) });
        }
    }
    // event-handlers
    btnAdd2CartClick(e) {
        e.preventDefault();
        const product = this.state.product;
        const quantity = parseInt(this.state.txtQuantity);
        if (quantity) {
            const mycart = this.context.mycart;
            const index = mycart.findIndex(x => x.product._id === product._id); // check if the _id exists in mycart
            if (index === -1) { // not found, push newItem
                const newItem = { product: product, quantity: quantity };
                mycart.push(newItem);
            } else { // increasing the quantity
                mycart[index].quantity += quantity;
            }
            this.context.setMycart(mycart);
            // alert('OK BABY!');
        } else {
            alert('Please input quantity');
        }
    }

    handleRatingClick(value) {
        this.setState({ rating: value });

        // Lưu đánh giá sản phẩm vào Local Storage
        const params = this.props.params;
        localStorage.setItem(`productRating_${params.id}`, value.toString());
    }

    // apis
    apiGetProduct(id) {
        axios.get('/api/customer/products/' + id).then((res) => {
            const result = res.data;
            this.setState({ product: result });
        });
    }
}
export default withRouter(ProductDetail);