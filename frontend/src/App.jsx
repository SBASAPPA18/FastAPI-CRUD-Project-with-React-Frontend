import { useState, useEffect } from 'react';
import { getProducts, addProduct, updateProduct, deleteProduct } from './api';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';

function App() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      // Ensure data is array (backend returns list)
      setProducts(Array.isArray(data) ? data : []);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to fetch products. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSave = async (product) => {
    try {
      setLoading(true);
      if (editingProduct) {
        await updateProduct(product.id, product);
      } else {
        await addProduct(product);
      }
      setEditingProduct(null);
      await fetchProducts();
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to save product. Check inputs or connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      setLoading(true);
      await deleteProduct(id);
      await fetchProducts();
    } catch (err) {
      console.error(err);
      setError('Failed to delete product.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  return (
    <div className="app-container">
      <h1>FastAPI CRUD Manager</h1>

      {error && (
        <div style={{
          background: 'rgba(229, 62, 62, 0.2)',
          border: '1px solid #e53e3e',
          padding: '1rem',
          borderRadius: '8px',
          marginBottom: '2rem'
        }}>
          {error}
        </div>
      )}

      <div className="grid-layout">
        <section>
          <ProductForm
            onSave={handleSave}
            editingProduct={editingProduct}
            onCancel={handleCancelEdit}
          />
        </section>
        <section>
          {loading ? (
            <div className="card">Loading...</div>
          ) : (
            <ProductList
              products={products}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </section>
      </div>
    </div>
  );
}

export default App;
