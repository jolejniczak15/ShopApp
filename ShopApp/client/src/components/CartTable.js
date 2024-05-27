import React from 'react';
import '../App.css';

const CartTable = ({ products, onQuantityChange, onDeleteProduct }) => {

    const calculateTotalOrderPrice = (products) => {
        return products.reduce((total, product) => {
            return Math.round((total + product.unit_price * product.quantity) * 100) / 100;
        }, 0);
    };


    return (
        <div>
            <table className="table table-striped table-bordered mt-4">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Price</th>
                        <th scope="col">Weight</th>
                        <th scope="col">Category</th>
                        <th scope="col">Quantity</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={index}>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.unit_price}</td>
                            <td>{product.unit_weight}</td>
                            <td>{product.category_name}</td>
                            <td>
                                <input
                                    type="number"
                                    min="1"
                                    value={product.quantity}
                                    onChange={(e) => onQuantityChange(product.product_id, parseInt(e.target.value))}
                                />
                            </td>
                            <td>
                                <button className="btn btn-danger" onClick={() => onDeleteProduct(product.product_id)}>Delete</button>
                            </td>
                        </tr>
                    ))}


                </tbody>
            </table>
            <div>Total price: {calculateTotalOrderPrice(products)} PLN</div>
        </div>
    );
};

export default CartTable;
