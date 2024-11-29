import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductMaintenance = () => {
    const [products, setProducts] = useState([]); // Estado para armazenar os produtos
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        price: '',
        stock: ''
    });

    // Função para buscar todos os produtos ao carregar a página
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/product/getallproducts'); // Certifique-se de que a rota está correta
                setProducts(response.data); // Atualiza a lista de produtos
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    // Manipula os inputs para criar um novo produto
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    // Adicionar um novo produto
    const addProduct = async () => {
        try {
            const response = await axios.post('http://localhost:3000/product/createproduct', newProduct);
            setProducts([...products, response.data]); // Adiciona o novo produto à lista
            setNewProduct({ name: '', description: '', price: '', stock: '' }); // Limpa os campos
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    // Deletar um produto
    const deleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/product/deleteproduct/${id}`); // Corrigido o URL para incluir a barra "/"
            setProducts(products.filter(product => product.id !== id)); // Remove o produto deletado da lista
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div>
            <h2>Product Maintenance</h2>
            <div>
                <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={newProduct.name}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={newProduct.description}
                    onChange={handleInputChange}
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={newProduct.price}
                    onChange={handleInputChange}
                />
                <input
                    type="number"
                    name="stock"
                    placeholder="Stock"
                    value={newProduct.stock}
                    onChange={handleInputChange}
                />
                <button onClick={addProduct}>Add Product</button>
            </div>
            <h3>Product List</h3>
            {products.length === 0 ? (
                <p>No products found.</p>
            ) : (
                <ul>
                    {products.map(product => (
                        <li key={product.id}>
                            {product.name} - {product.description} - R${product.price} - Stock: {product.stock}
                            <button onClick={() => deleteProduct(product.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ProductMaintenance;
