const API_URL = "http://localhost:8000";

export const getProducts = async () => {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) throw new Error("Failed to fetch products");
    return response.json();
};

export const addProduct = async (product) => {
    const response = await fetch(`${API_URL}/product`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
    });
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(Array.isArray(errorData.detail)
            ? errorData.detail.map(e => `${e.loc.join('.')}: ${e.msg}`).join(', ')
            : errorData.detail || "Failed to add product");
    }
    return response.json();
};

export const updateProduct = async (id, product) => {
    const response = await fetch(`${API_URL}/product?id=${id}`, { // Note: Backend uses query param for update? No, let's check backend.
        // wait, let's double check backend signature for update.
        // @app.put("/product") 
        // def update_product(id: int, p: product...
        // Use query param for id? FastAPI default for simple types is query.
        // Let's verify in a moment. Assuming query param for now based on signature.
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
    });
    // However, requests typically send id in body or path. 
    // The previous backend code showed: update_product(id: int, p: product...)
    // This implies `id` is a query param (since it's not in path template and not Pydantic model).
    // so URL should be /product?id=...
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(Array.isArray(errorData.detail)
            ? errorData.detail.map(e => `${e.loc.join('.')}: ${e.msg}`).join(', ')
            : errorData.detail || "Failed to update product");
    }
    return response.json(); // Backend returns string msg, but let's handle whatever.
};

export const deleteProduct = async (id) => {
    const response = await fetch(`${API_URL}/product?id=${id}`, { // Backend: delete_product(id: int) -> query param.
        method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete product");
    return response.json();
};
