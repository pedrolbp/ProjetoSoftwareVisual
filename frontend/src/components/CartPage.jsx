import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './CartPage.module.css';

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const user = JSON.parse(localStorage.getItem('user'));

    const makeAwait = async () => {
        let cartId = 0;

        const fetchCart = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/carts/getusercart/${user.id}`);
                cartId = response.data.id;
            } catch (err) {
                setError('Erro ao carregar o carrinho.');
            } finally {
                setLoading(false);
            }
        };

        await fetchCart();

        const fetchCartItems = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/carts/${cartId}/viewcartitems`);
                setCartItems(response.data);
            } catch (err) {
                setError('Erro ao carregar itens do carrinho.');
            } finally {
                setLoading(false);
            }
        };

        await fetchCartItems();
    };

    useEffect(() => {
        makeAwait();
    }, []);

    const handlePayment = async (method) => {
        try {
            const response = await axios.post(
                `http://localhost:3000/payment/${method}`,
                { userId: user.id },
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
            );
            alert('Pagamento realizado com sucesso!');
            setCartItems([]);
        } catch (err) {
            console.error('Erro ao processar pagamento:', err);
        }
    };

    const removeItem = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3000/carts/removeitem/${id}`);
            setCartItems(cartItems.filter((cartItem) => id !== cartItem.id));
        } catch (error) {
            console.error('Erro ao remover item:', error);
        }
    };

    if (loading) return <p>Carregando carrinho...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className={styles['cart-container']}>
            <h2 className={styles['cart-title']}>Meu Carrinho</h2>
            {cartItems.length === 0 ? (
                <p className={styles['cart-empty']}>Seu carrinho está vazio.</p>
            ) : (
                <ul className={styles['cart-list']}>
                    {cartItems.map((item) => (
                        <li key={item.id}>
                            <span>
                                Produto: {item.product.name} - Quantidade: {item.quantity}
                            </span>
                            <button onClick={() => removeItem(item.id)}>Remover item</button>
                        </li>
                    ))}
                </ul>
            )}
            <div className={styles['payment-buttons']}>
                <button onClick={() => handlePayment('pix')}>Pagar com PIX</button>
                <button onClick={() => handlePayment('creditcard')}>Pagar com Cartão de Crédito</button>
            </div>
        </div>
    );
};

export default CartPage;
