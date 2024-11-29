import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ShowAllProducts = () => {
    const [products, setProducts] = useState([]); // Estado para armazenar os produtos
    const [loading, setLoading] = useState(true); // Estado para controlar o carregamento
    const [error, setError] = useState(null); // Estado para armazenar erros

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/product/getallproducts');
                setProducts(response.data);
            } catch (err) {
                console.error('Erro ao buscar todos os produtos:', err);
                setError('Ocorreu um erro ao carregar os produtos.');
            } finally {
                setLoading(false); // Finaliza o estado de carregamento
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="container mt-5">
                <h3 className="text-center mb-4">Carregando produtos...</h3>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-5">
                <h3 className="text-center mb-4 text-danger">{error}</h3>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <h3 className="text-center mb-4">Todos os Produtos</h3>
            {products.length === 0 ? (
                <p className="text-center">Nenhum produto encontrado.</p>
            ) : (
                <ul className="list-group mx-5">
                    {products.map(product => (
                        <li key={product.id} className="list-group-item text-center my-1 border border-dark rounded">
                            <strong>Nome:</strong> {product.name}<br />
                            <strong>Descrição:</strong> {product.description}<br />
                            <strong>Preço:</strong> R$ {product.price}<br />
                            <strong>Estoque:</strong> {product.stock}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ShowAllProducts;
