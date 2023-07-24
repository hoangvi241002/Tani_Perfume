import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';
import MyContext from '../contexts/MyContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            brands: [],
            txtKeyword: '',
            isPerfumeDropdownOpen: false,
            isBrandDropdownOpen: false,
        };
    }

    static contextType = MyContext; // using this.context to access global state

    togglePerfumeDropdown = () => {
        this.setState((prevState) => ({
            isPerfumeDropdownOpen: !prevState.isPerfumeDropdownOpen
        }));
    };

    toggleBrandDropdown = () => {
        this.setState((prevState) => ({
            isBrandDropdownOpen: !prevState.isBrandDropdownOpen
        }));
    };

    render() {
        const { categories, brands, isPerfumeDropdownOpen, isBrandDropdownOpen } = this.state;

        const perfumeOptions = categories.map((item) => (
            <li key={item._id}>
                <Link to={`/product/category/${item._id}`}>{item.name}</Link>
            </li>
        ));

        const brandOptions = brands.map((item) => (
            <li key={item._id}>
                <Link to={`/product/brand/${item._id}`}>{item.name}</Link>
            </li>
        ));

        return (
            <div className="border-bottom">
                <div className="float-left">
                    <ul className="menu">
                        <li className="menu">
                            <Link to="/"> Trang Chủ</Link>
                        </li>
                        <li
                            className="menu"
                            onMouseEnter={this.togglePerfumeDropdown}
                            onMouseLeave={this.togglePerfumeDropdown}
                        >
                            <span className='menu-hehe'>Nước Hoa</span>
                            {isPerfumeDropdownOpen && (
                                <div className="dropdown">
                                    <ul>{perfumeOptions}</ul>
                                </div>
                            )}
                        </li>
                        <li
                            className="menu"
                            onMouseEnter={this.toggleBrandDropdown}
                            onMouseLeave={this.toggleBrandDropdown}
                        >
                            <span className='menu-hehe'>Thương Hiệu</span>
                            {isBrandDropdownOpen && (
                                <div className="dropdown">
                                    <ul>{brandOptions}</ul>
                                </div>
                            )}
                        </li>
                        <li className="menu">
                            <Link to="/myorders">Đơn Hàng Của Tôi</Link>
                        </li>
                    </ul>

                    <div className="float-right">
                        <form className="search">
                            <input type="search" placeholder="Enter keyword" className="keyword" value={this.state.txtKeyword} onChange={(e) => { this.setState({ txtKeyword: e.target.value }) }} />
                            <FontAwesomeIcon icon={faSearch} className='btn-search' onClick={(e) => this.btnSearchClick(e)} />
                        </form>

                        <div className='icon-user'>
                            <FontAwesomeIcon icon={faUser} />
                            <div className='DropdownProfile-user'>
                                <div className="flex flex-col gap-4 DropdownProfile">
                                    {this.context.token === '' ?
                                        <div><Link to='/login'>Login</Link> | <Link to='/signup'>Sign-up</Link> | <Link to='/active'>Active</Link></div>
                                        :
                                        <div>Hello <b>{this.context.customer.name}</b> | <Link to='/home' onClick={() => this.lnkLogoutClick()}>Logout</Link> | <Link to='/myprofile'>My profile</Link></div>
                                    }
                                </div>
                            </div>
                        </div>

                        <div>
                            <Link to='/mycart'><FontAwesomeIcon icon={faShoppingCart} /></Link><sup>{this.context.mycart.length}</sup>
                        </div>

                    </div>
                </div>


                <div className="float-clear" />
            </div>
        );
    }

    componentDidMount() {
        this.apiGetCategories();
        this.apiGetBrands();
    }

    btnSearchClick = (e) => {
        e.preventDefault();
        this.props.navigate('/product/search/' + this.state.txtKeyword);
    };

    lnkLogoutClick = () => {
        this.context.setToken('');
        this.context.setCustomer(null);
        this.context.setMycart([]);
    };

    apiGetCategories() {
        axios.get('/api/customer/categories').then((res) => {
            const result = res.data;
            this.setState({ categories: result });
        });
    }

    apiGetBrands() {
        axios.get('/api/customer/brands').then((res) => {
            const result = res.data;
            this.setState({ brands: result });
        });
    }
}

export default withRouter(Menu);
