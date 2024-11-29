import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductDataForm = () => {
    const [formData, setFormData] = useState({
        id: '',
        nome: '',
        descricao: '',
        preco: '',
        estoque:''
    });

    const [responseMessage, setResponseMessage] = useState('');

    // Tratar o evento change dos campos do form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Tratar o salvar dados
    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/products/createproduct', formData);
            setResponseMessage(response.data.message);
            handleClear();
        } catch (error) {
            setResponseMessage('Erro ao salvar o produto');
        }
    };

    const handleClear = () => {
        setFormData({
            nome: '',
            descricao: '',
            preco: '',
            estoque:''
        });
        setResponseMessage('');
    };

    return (
        <div className="container d-flex justify-content-center align-items-center">
            <div className="card p-4 shadow-sm">
                <h3>Cadastro de Produtos</h3>
                <form className="form-group" onSubmit={handleSave}>
                    <div className="mb-3">
                        <label className="fw-bold text-center d-block">Produto:</label>
                        <input
                            type='text'
                            name='nome'
                            value={formData.nome}
                            onChange={handleChange}
                            className='form-control'
                        />
                    </div>
                    <div className="mb-3">
                        <label className="fw-bold text-center d-block">Descrição:</label>
                        <input
                            type='text'
                            name='descricao'
                            value={formData.descricao}
                            onChange={handleChange}
                            className='form-control'
                        />
                    </div>
                    <div className="mb-3">
                        <label className="fw-bold text-center d-block">Preço:</label>
                        <input
                            type='text'
                            name='preco'
                            value={formData.preco}
                            onChange={handleChange}
                            className='form-control'
                        />
                    </div>
                    <div className="mb-3">
                        <label className="fw-bold text-center d-block">Estoque:</label>
                        <input
                            type='text'
                            name='estoque'
                            value={formData.estoque}
                            onChange={handleChange}
                            className='form-control'
                        />
                    </div>
                    <button type="submit" className="btn btn-success btn-block mt-3 mx-1" onClick={handleSave}>Salvar</button>
                    <button type="submit" className="btn btn-secondary btn-block mt-3 mx-1" onClick={handleClear}>Limpar</button>
                </form>
                {responseMessage && <div className='alert alert-info mt-3'>{responseMessage}</div>}
            </div>
        </div>    
    );
};

export default ProductDataForm;