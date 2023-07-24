import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import BrandDetail from './BrandDetailComponent';

class Brand extends Component {
    static contextType = MyContext; // using this.context to access global state
    constructor(props) {
        super(props);
        this.state = {
            brands: [],
            itemSelected: null
        };
    }
    render() {
        const Bras = this.state.brands.map((item) => {
            return (
                <tr key={item._id} className="datatable" onClick={() => this.trItemClick(item)}>
                    <td>{item._id}</td>
                    <td>{item.name}</td>
                </tr>
            );
        });
        return (
            <div>
                <div className="float-left">
                    <h2 className="text-center">BRAND LIST</h2>
                    <table className="datatable" border="1">
                        <tbody>
                            <tr className="datatable">
                                <th>ID</th>
                                <th>Name</th>
                            </tr>
                            {Bras}
                        </tbody>
                    </table>
                </div>
                <div className="inline" />
                <BrandDetail item={this.state.itemSelected} updateBrands={this.updateBrands} />
                <div className="float-clear" />
            </div>
        );
    }

    updateBrands = (brands) => { // arrow-function
        this.setState({ brands: brands });
    }
    componentDidMount() {
        this.apiGetBrands();
    }
    // event-handlers
    trItemClick(item) {
        this.setState({ itemSelected: item });
    }
    // apis
    apiGetBrands() {
        const config = { headers: { 'x-access-token': this.context.token } };
        axios.get('/api/admin/brands', config).then((res) => {
            const result = res.data;
            this.setState({ brands: result });
        });
    }
}
export default Brand;