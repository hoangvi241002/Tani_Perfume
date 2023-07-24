import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';

class BrandDetail extends Component {
    static contextType = MyContext; // using this.context to access global state
    constructor(props) {
        super(props);
        this.state = {
            txtID: '',
            txtName: ''
        };
    }
    render() {
        return (
            <div className="float-right">
                <h2 className="text-center">BRAND DETAIL</h2>
                <form>
                    <table>
                        <tbody>
                            <tr>
                                <td>ID</td>
                                <td><input type="text" value={this.state.txtID} onChange={(e) => { this.setState({ txtID: e.target.value }) }} readOnly={true} /></td>
                            </tr>
                            <tr>
                                <td>Name</td>
                                <td><input type="text" value={this.state.txtName} onChange={(e) => { this.setState({ txtName: e.target.value }) }} /></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>
                                    <input type="submit" value="ADD NEW" onClick={(e) => this.btnAddClick(e)} />
                                    <input type="submit" value="UPDATE" onClick={(e) => this.btnUpdateClick(e)} />
                                    <input type="submit" value="DELETE" onClick={(e) => this.btnDeleteClick(e)} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
    // event-handlers
    btnAddClick(e) {
        e.preventDefault();
        const name = this.state.txtName;
        if (name) {
            const brand = { name: name };
            this.apiPostBrand(brand);
        } else {
            alert('Please input name');
        }
    }
    btnUpdateClick(e) {
        e.preventDefault();
        const id = this.state.txtID;
        const name = this.state.txtName;
        if (id && name) {
            const brand = { name: name };
            this.apiPutBrand(id, brand);
        } else {
            alert('Please input id and name');
        }
    }
    btnDeleteClick(e) {
        e.preventDefault();
        if (window.confirm('ARE YOU SURE?')) {
            const id = this.state.txtID;
            if (id) {
                this.apiDeleteBrand(id);
            } else {
                alert('Please input id');
            }
        }
    }
    // apis
    apiPostBrand(brand) {
        const config = { headers: { 'x-access-token': this.context.token } };
        axios.post('/api/admin/brands', brand, config).then((res) => {
            const result = res.data;
            if (result) {
                alert('OK BABY!');
                this.apiGetBrands();
            } else {
                alert('SORRY BABY!');
            }
        });
    }
    apiGetBrands() {
        const config = { headers: { 'x-access-token': this.context.token } };
        axios.get('/api/admin/brands', config).then((res) => {
            const result = res.data;
            this.props.updateBrands(result);
        });
    }
    apiPutBrand(id, brand) {
        const config = { headers: { 'x-access-token': this.context.token } };
        axios.put('/api/admin/brands/' + id, brand, config).then((res) => {
            const result = res.data;
            if (result) {
                alert('OK BABY!');
                this.apiGetBrands();
            } else {
                alert('SORRY BABY!');
            }
        });
    }
    apiDeleteBrand(id) {
        const config = { headers: { 'x-access-token': this.context.token } };
        axios.delete('/api/admin/brands/' + id, config).then((res) => {
            const result = res.data;
            if (result) {
                alert('OK BABY!');
                this.apiGetBrands();
            } else {
                alert('SORRY BABY!');
            }
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.item !== prevProps.item) {
            this.setState({ txtID: this.props.item._id, txtName: this.props.item.name });
        }
    }
}
export default BrandDetail;