import React from 'react';

const ItemComponent = ({ availableProducts, outOfStockProducts }) => {
    return (
        <ul> Trạng Thái Sản Phẩm
            <li>
                - Còn Hàng ({outOfStockProducts} sản phẩm)
            </li>
            <li>
                - Hết Hàng ({availableProducts} sản phẩm)
            </li>
        </ul>
    );
};

export default ItemComponent;
