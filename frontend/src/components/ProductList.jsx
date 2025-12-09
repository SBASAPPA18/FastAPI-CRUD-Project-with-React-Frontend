function ProductList({ products, onEdit, onDelete }) {
    return (
        <div className="card table-container">
            <h2>Product List</h2>
            {products.length === 0 ? (
                <p style={{ color: '#a0aec0' }}>No products found.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Qty</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td style={{ fontWeight: '500' }}>{product.name}</td>
                                <td style={{ color: '#cbd5e0' }}>{product.description}</td>
                                <td>${Number(product.price).toFixed(2)}</td>
                                <td>{product.quantity}</td>
                                <td>
                                    <button
                                        className="action-btn edit-btn"
                                        onClick={() => onEdit(product)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="action-btn delete-btn"
                                        onClick={() => onDelete(product.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default ProductList;
