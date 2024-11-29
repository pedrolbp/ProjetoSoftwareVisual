import axios from "axios";
import { useEffect, useState } from "react";
import ShowAllProducts from "./ShowAllProducts";


export default function Home() {
    const token = localStorage.getItem('token'); // Obtém o token do localStorage
    
    return (
        <div>
            <p>{token ? "Usuário logado" : "Usuário não logado"}</p>
            <ShowAllProducts/>
        </div>
    );
}
