import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Banner from './BannerComponent';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newprods: [],
            hotprods: [],
            cards: []
        };
    }
    render() {
        const newprods = this.state.newprods.map((item) => {
            return (
                <div key={item._id} className="inline-newhot">
                    <figure>
                        <Link to={'/product/' + item._id}><img className='img_home' src={"data:image/jpg;base64," + item.image} width="300px" height="300px" alt="" /></Link>
                        <figcaption className="text-center">{item.name}<br />Price: {item.price}$</figcaption>
                    </figure>
                </div>
            );
        });
        const hotprods = this.state.hotprods.map((item) => {
            return (
                <div key={item._id} className="inline-newhot">
                    <figure>
                        <Link to={'/product/' + item._id}><img className='img_home' src={"data:image/jpg;base64," + item.image} width="300px" height="300px" alt="" /></Link>
                        <figcaption className="text-center">{item.name}<br />Price: {item.price}$ </figcaption>
                    </figure>
                </div>
            );
        });
        return (
            <div>
                <Banner />

                <div className="align-center">
                    <h2 className="text-center">Sản Phẩm Mới</h2>
                    {newprods}
                </div>

                {this.state.hotprods.length > 0 ?
                    <div className="align-center">
                        <h2 className="text-center">Sản Phẩm Nổi Bật</h2>
                        {hotprods}
                    </div>
                    : <div />}
            </div>
        );
    }
    componentDidMount() {
        this.apiGetNewProducts();
        this.apiGetHotProducts();
    }
    // apis
    apiGetNewProducts() {
        axios.get('/api/customer/products/new').then((res) => {
            const result = res.data;
            this.setState({ newprods: result });
        });
    }
    apiGetHotProducts() {
        axios.get('/api/customer/products/hot').then((res) => {
            const result = res.data;
            this.setState({ hotprods: result });
        });
    }
}
export default Home;