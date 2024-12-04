import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ProductMaintenance.module.css';

const ProductMaintenance = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        price: '',
        stock: ''
    });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/product/getallproducts');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    const addProduct = async () => {
        try {
            const response = await axios.post('http://localhost:3000/product/createproduct', newProduct);
            setProducts([...products, response.data]);
            setNewProduct({ name: '', description: '', price: '', stock: '' });
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/product/deleteproduct/${id}`);
            setProducts(products.filter(product => product.id !== id));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    return (
        <div className={styles['maintenance-container']}>
            <h2 className={styles['maintenance-title']}>Manutenção de Produtos</h2>
            <div className={styles['maintenance-form']}>
                <input
                    type="text"
                    name="name"
                    placeholder="Nome do Produto"
                    value={newProduct.name}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Descrição"
                    value={newProduct.description}
                    onChange={handleInputChange}
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Preço"
                    value={newProduct.price}
                    onChange={handleInputChange}
                />
                <input
                    type="number"
                    name="stock"
                    placeholder="Estoque"
                    value={newProduct.stock}
                    onChange={handleInputChange}
                />
                <button onClick={addProduct}>Adicionar Produto</button>
            </div>
            <div className={styles['product-list']}>
                <h3>Lista de Produtos</h3>
                {products.length === 0 ? (
                    <p>Nenhum produto encontrado.</p>
                ) : (
                    <ul>
                        {products.map(product => (
                            <li key={product.id}>
                                <span>
                                    {product.name} - {product.description} - R${product.price} - Estoque: {product.stock}
                                </span>
                                <button onClick={() => deleteProduct(product.id)}>Deletar</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default ProductMaintenance;
