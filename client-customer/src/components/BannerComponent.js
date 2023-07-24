import React, { Component } from 'react';
import Banner from '../images/banner.jpg'
import Banner2 from '../images/banner2.jpg'


class banner extends Component {
    render() {
        return (
            <div className='banner-lead'>
                <img src={Banner} alt='' className='banner-1' />
                <div className='banner-lead-2'>
                    <img src={Banner} alt='' className='banner-2' />
                    <img src={Banner2} alt='' className='banner-3' />
                </div>
            </div>
        );
    }

}
export default banner;