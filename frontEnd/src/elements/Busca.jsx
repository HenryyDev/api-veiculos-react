import React, { useState } from "react";
import axios from "axios"; 
import "bootstrap/dist/css/bootstrap.min.css"; 
import "bootstrap/dist/js/bootstrap.bundle.min.js"; 
import { useNavigate } from "react-router-dom"; 
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

import "./css/Busca.css"

const Busca = () => {
    const navigate = useNavigate(); 
    const [metodo, setMetodo] = useState("Escolha o método"); 
    const [busca, setBusca] = useState(""); 
    const [cars, setCars] = useState([]);
    const [buscaRealizada, setBuscaRealizada] = useState(false);

    const rem = async (id) => { 
        try {
            await axios.delete(`http://localhost:3030/remover/${id}`);
            setCars((prevCars) => prevCars.filter((car) => car.id !== id)); 
            toast.success("Veículo removido");
        } catch (err) {
            toast.error("Erro ao remover o veículo"); 
            console.log(err); 
        }
    };

    const editar = (id) => {
        navigate(`/viewall/editar/${id}`); 
    };

    const consulta = async () => { 
        if (!busca) {
            toast.warn("Por favor, insira um valor para busca."); 
            return; 
        }

        try {
            let resposta; 
            if (metodo === "id") {
                resposta = await axios.get(`http://localhost:3030/viewid/${busca}`); 
            } else if (metodo === "ano") {
                resposta = await axios.get(`http://localhost:3030/viewYear/${busca}`);
            } else if (metodo === "cor") {
                resposta = await axios.get(`http://localhost:3030/searchColor/${busca}`);
            } else {
                toast.warn("Por favor, escolha um método de busca."); 
                return; 
            }

            // Verifica se a resposta da requisição está vazia
            if (resposta.data.length === 0) {
                toast.info("Nenhum veículo encontrado!"); 
                setBuscaRealizada(true); 
            } else {
                setCars(resposta.data); 
                setBuscaRealizada(true); 
                toast.success("Consulta realizada com sucesso!"); 
            }
        } catch (erro) {
            toast.error("Erro ao realizar a consulta. Verifique os dados e tente novamente."); 
            console.log(erro); 
        }
    };

    const tecla = (e) => { 
        if (e.key === "Enter") { // Se a tecla pressionada for enter
            consulta(); 
        }
    };

    return (
        <>
            <ToastContainer /> 
            <header className=" text-white py-3" style={{ position: "fixed", width: "100vw", top: 0 }}>
            <h1 className="text-center">Sistema de Gerenciamento de veiculos</h1>
                <a href="/" className="btn ">Cadastrar</a>
                <a href="/viewall"  className="btn">Ver Todos os veiculos</a>
                <a href="/busca" className="btn">Buscar</a>
            </header>
            <main>

            <div className=" container d-flex " style={{flexDirection:"column", alignItems:"center",justifyContent:"center",backgroundColor:"#cacaca"}}>
                <div className="input-group my-2 px-4" >
                    <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {metodo} 
                    </button>
                    <ul className="dropdown-menu">
                        
                        <li><a className="dropdown-item" href="#" onClick={() => setMetodo("ano")}>ano</a></li>
                        <li><a className="dropdown-item" href="#" onClick={() => setMetodo("id")}>id</a></li>
                        <li><a className="dropdown-item" href="#" onClick={() => setMetodo("cor")}>cor</a></li>
                    </ul>
                    <input
                        onKeyUp={tecla} // Detecta  tecla
                        type="text"
                        className="form-control"
                        placeholder="Escolha o método de busca e digite"
                        value={busca} // Valor do campo de entrada
                        required
                        onChange={(e) => setBusca(e.target.value)}
                    />
                    <button onClick={consulta} className="btn btn-outline-success">Buscar</button> 
                </div>
           
            <div className="container cards pb-4">
                <h1 className="text-center">Busca de veículos</h1>
                <div className="row justify-content-center">
                    
                    {!buscaRealizada ? (
                        <p className="text-center">Faça uma busca para encontrar veículos!</p>
                    ) : (
                        <>
                          
                            {cars.length > 0 ? (
                                cars.map((car) => (
                                    <div className="col-12 col-md-6 mb-4 " key={car.id}>
                                        <div className="card h-100 text-center">
                                            <div className="card-body">
                                                <h5 className="card-title">ID: {car.id}</h5>
                                                <p className="card-text">
                                                    Marca: {car.marca} <br />
                                                    Modelo: {car.modelo} <br />
                                                    Ano: {car.ano} <br />
                                                    Dono: {car.proprietario} <br />
                                                    Cor: {car.cor}
                                                </p>
                                                <a href="#" onClick={() => editar(car.id)} className="btn btn-success me-2">
                                                    Editar
                                                </a>
                                                <a href="#" className="btn btn-danger" onClick={() => rem(car.id)}>Remover</a>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center">Nenhum veículo encontrado. Digite uma busca válida.</p> //  se nenhum veículo for encontrado
                            )}
                        </>
                    )}
                </div>
            </div>
            </div>
            </main>
        </>
    );
};

export default Busca; 
