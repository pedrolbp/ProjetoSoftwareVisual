import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from './ShowAllProducts.module.css';

const ShowAllProducts = () => {
  const [products, setProducts] = useState([]);
  const [cartId, setCartId] = useState(null); // ID do carrinho do usuário
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/product/getallproducts"
        );
        setProducts(response.data);
      } catch (err) {
        setError("Erro ao carregar produtos.");
      } finally {
        setLoading(false);
      }
    };

    const fetchCart = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/carts/getusercart/${user.id}`
        );
        setCartId(response.data.id); // ID do carrinho
      } catch (err) {
        console.error("Erro ao carregar o carrinho:", err);
      }
    };

    fetchProducts();
    fetchCart();
  }, []);

  const addToCart = async (product) => {
    if (!cartId) {
      console.error("Carrinho não encontrado.");
      return;
    }

    try {
      await axios.post("http://localhost:3000/carts/additem", {
        cartId,
        productId: product.id,
        quantity: 1, // Adiciona 1 unidade
      });
    } catch (err) {
      console.error("Erro ao adicionar ao carrinho:", err);
    }
  };

  if (loading) return <p>Carregando produtos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <h2 class={styles['products-title']}>Produtos</h2>
      <div className={styles["home-products"]}>
        {products.map((product) => (
          <div key={product.id} className={styles["home-product"]}>
            <div className={styles["home-product-description"]}>
                <p>
                  <strong>{product.name}</strong>
                </p>
                <p>Preço: R$ {product.price}</p>
            </div>
            <button onClick={() => addToCart(product)}>
              Adicionar ao Carrinho
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default ShowAllProducts;
