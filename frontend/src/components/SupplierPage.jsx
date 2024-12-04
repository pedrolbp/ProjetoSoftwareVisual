import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SupplierPage.css'; // Arquivo CSS básico

const SupplierPage = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [newSupplier, setNewSupplier] = useState({
        name: '',
        cnpj: '',
        product: '',
        address: ''
    });

    // Carregar todos os fornecedores ao carregar a página
    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/supplier/allSuppliers');
                setSuppliers(response.data);
            } catch (error) {
                console.error('Erro ao buscar fornecedores:', error);
            }
        };
        fetchSuppliers();
    }, []);

    // Manipula os inputs do formulário
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewSupplier({ ...newSupplier, [name]: value });
    };

    // Adicionar um novo fornecedor
    const addSupplier = async () => {
        try {
            const response = await axios.post('http://localhost:3000/supplier/createSupplier', newSupplier);
            setSuppliers([...suppliers, response.data]); // Atualiza a lista de fornecedores
            setNewSupplier({ name: '', cnpj: '', product: '', address: '' }); // Limpa os campos
        } catch (error) {
            console.error('Erro ao adicionar fornecedor:', error);
        }
    };

    return (
        <div className="supplier-page">
            <h2>Fornecedores</h2>
            <div className="form-container">
                <h3>Adicionar Novo Fornecedor</h3>
                <input
                    type="text"
                    name="name"
                    placeholder="Nome do Fornecedor"
                    value={newSupplier.name}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="cnpj"
                    placeholder="CNPJ"
                    value={newSupplier.cnpj}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="product"
                    placeholder="Produto Fornecido"
                    value={newSupplier.product}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Endereço"
                    value={newSupplier.address}
                    onChange={handleInputChange}
                />
                <button onClick={addSupplier}>Adicionar Fornecedor</button>
            </div>
            <div className="supplier-list">
                <h3>Lista de Fornecedores</h3>
                {suppliers.length === 0 ? (
                    <p>Nenhum fornecedor cadastrado.</p>
                ) : (
                    <ul>
                        {suppliers.map((supplier) => (
                            <li key={supplier.id}>
                                <strong>Nome:</strong> {supplier.name}<br />
                                <strong>CNPJ:</strong> {supplier.cnpj}<br />
                                <strong>Produto:</strong> {supplier.product}<br />
                                <strong>Endereço:</strong> {supplier.address}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default SupplierPage;
