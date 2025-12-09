import { useState, useEffect } from 'react';

function ProductForm({ onSave, editingProduct, onCancel }) {
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        description: '',
        price: '',
        quantity: ''
    });

    useEffect(() => {
        if (editingProduct) {
            setFormData(editingProduct);
        } else {
            // Reset or generate new ID? 
            // For simplicity, user enters ID or we handle it. 
            // Backend allows setting ID. We'll let user enter it for now to match backend logic.
            // A better app would auto-generate, but let's stick to the backend's `id` field requirement.
            setFormData({
                id: '',
                name: '',
                description: '',
                price: '',
                quantity: ''
            });
        }
    }, [editingProduct]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Convert types
        const productToSend = {
            ...formData,
            id: parseInt(formData.id),
            price: parseFloat(formData.price),
            quantity: parseInt(formData.quantity)
        };
        onSave(productToSend);
    };

    return (
        <div className="card">
            <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>ID</label>
                    <input
                        type="number"
                        name="id"
                        value={formData.id}
                        onChange={handleChange}
                        required
                        disabled={!!editingProduct} // ID usually shouldn't change on edit per typical patterns, though backend might allow it? Let's disable for safety.
                        placeholder="Unique ID"
                    />
                </div>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Product Name"
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        placeholder="Description"
                    />
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input
                        type="number"
                        step="0.01"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        placeholder="0.00"
                    />
                </div>
                <div className="form-group">
                    <label>Quantity</label>
                    <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                        placeholder="0"
                    />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                    {editingProduct && (
                        <button type="button" onClick={onCancel} style={{ background: '#718096' }}>
                            Cancel
                        </button>
                    )}
                    <button type="submit" style={{ background: editingProduct ? '#3182ce' : '#48bb78' }}>
                        {editingProduct ? 'Update Product' : 'Add Product'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ProductForm;
