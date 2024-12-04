import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const token = localStorage.getItem('token'); // Verifica o token no localStorage
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user'); // Remove o token
        navigate('/login'); // Redireciona para a página de login
    };

    return (
        <nav>
            <NavLink to="/" className="nav-title">Produtos Legais</NavLink>
            <div className="links">
                {!token ? (
                    <>
                        <NavLink to="/register">Criar conta</NavLink>
                        <NavLink to="/login">Login</NavLink>
                    </>
                ) : (
                    <>
                        <NavLink to="/product-maintance">Manutenção de Produtos</NavLink>
                        <NavLink to="/suppliers">Fornecedores</NavLink>
                        <NavLink to="/cart">Carrinho</NavLink> {/* Adicionado o link para o Carrinho */}
                        <button type="button" onClick={logout}>Sair</button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
