import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const UserAccountForm = ({ isLogin }) => {
  const [formData, setFormData] = useState({
    email: "",
    data_nasc: "",
    password: "",
  });

  const [responseMessage, setResponseMessage] = useState("");

  // Handle form input change
  const handleChange = (e) => {
    console.log("Entrou aqui");
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const endpoint = isLogin ? "login" : "createuser";
      const { data } = await axios.post(
        `http://localhost:3000/users/${endpoint}`,
        formData
      );

      if (data) {
        setResponseMessage(
          isLogin ? "Login bem sucedido!" : "Conta criada com sucesso!"
        );
        localStorage.setItem('token', data.Token)
        navigate("/")
      } else {
        setResponseMessage(
          isLogin ? "Dados inválidos" : "Erro ao criar a conta"
        );
      }
    } catch (error) {
      setResponseMessage("Erro ao conectar com servidor.");
    }
  };

  return (
    <div className="user-account-form">
      <h3>{isLogin ? "Entrar" : "Crie sua conta de usuário"}</h3>
      <form onSubmit={handleSubmit} className="form-group">
        <div>
          <label>Email:</label>
          <input
            className="form-control"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {!isLogin && (
          <div>
            <label>Data Nascimento:</label>
            <input
              className="form-control"
              type="date"
              name="data_nasc"
              value={formData.data_nasc}
              onChange={handleChange}
              required
            />
          </div>
        )}
        <div>
          <label>Senha:</label>
          <input
            className="form-control"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block mt-3">
          {isLogin ? "Entrar" : "Criar conta"}
        </button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default UserAccountForm;
