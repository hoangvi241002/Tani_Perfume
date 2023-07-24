import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';


class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <div className='footer-top'>
                    <div className='footer-top-item'>
                        <h3>FREE SHIPPING</h3>
                        <p>Cho đơn hàng từ 599,000đ</p>
                    </div>
                    <div className='footer-top-item'>
                        <h3>CHÍNH HÃNG 100%</h3>
                        <p>Phát hiện hàng giả bồi thường 100 triệu đồng</p>
                    </div>
                    <div className='footer-top-item'>
                        <h3>BẢO HÀNH 1 ĐỔI 1</h3>
                        <p>Nếu sản phẩm có lỗi từ nhà sản xuất</p>
                    </div>
                    <div className='footer-top-item'>
                        <h3>GIAO HÀNG SIÊU TỐC</h3>
                        <p>Chỉ từ 2-3h cho đơn hàng nội thành Hồ Chí Minh</p>
                    </div>
                </div>

                <div className='footer-bottom'>
                    <div className='footer-bottom-item'>
                        <h3>DỊCH VỤ KHÁCH HÀNG</h3>
                        <Link to={"/"}><p>HỎI ĐÁP - FAQS</p></Link>
                        <Link to={"/"}><p>CHÍNH SÁCH 1 ĐỔI 1</p></Link>
                        <Link to={"/"}><p>CHÍNH SÁCH BỒI THƯỜNG 100TR</p></Link>
                        <Link to={"/"}><p>THEO DÕI ĐƠN HÀNG</p></Link>
                    </div>
                    <div className='footer-bottom-item'>
                        <h3>HỢP TÁC CÙNG TANI PERFUME</h3>
                        <Link to={"/"}><p>PHÂN PHỐI ĐẠI LÝ</p></Link>
                        <Link to={"/"}><p>CHƯƠNG TRÌNH SỈ VÀ CTV</p></Link>
                        <Link to={"/"}><p>TUYỂN DỤNG</p></Link>
                    </div>
                    <div className='footer-bottom-item'>
                        <h3>CÔNG TY TNHH TANI CORPORATION</h3>
                        <p>Văn Phòng Đại Diện: 226 Nguyễn Văn Lượng,</p><p> Phường 17, Quân Gò Vấp, Thành Phố HCM</p>
                        <p>Hotline: 0766552858</p>
                        <p>Email: Taniperfume@gmail.com</p>
                        <p>Thời Gian Làm Việc: T2 - T6: 8:30' - 18h:00'</p>
                    </div>
                    <div className='footer-bottom-item'>
                        <h3>ĐỪNG BỎ LỠ NHỮNG ƯU ĐÃI MỚI NHẤT!</h3>
                        <p>NHẬP EMAIL NHẬN VOUCHER NGAY</p>
                        <input type="text" placeholder="Nhập email của bạn" className='btn-text' />
                        <FontAwesomeIcon icon={faPaperPlane} className='btn-submit' />
                    </div>


                </div>
            </div>
        );
    }

}
export default Footer;