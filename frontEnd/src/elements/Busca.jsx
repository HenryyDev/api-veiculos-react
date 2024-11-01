import React, { useState } from "react";
import axios from "axios"; 
import "bootstrap/dist/css/bootstrap.min.css"; 
import "bootstrap/dist/js/bootstrap.bundle.min.js"; 
import { useNavigate } from "react-router-dom"; 
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

const Busca = () => {
    const navigate = useNavigate(); 
    const [metodo, setMetodo] = useState("Escolha o método"); 
    const [busca, setBusca] = useState(""); 
    const [cars, setCars] = useState([]);
    const [buscaRealizada, setBuscaRealizada] = useState(false);

    const rem = async (id) => { 
        try {
            await axios.delete(`http://localhost:3030/remover/${id}`);
            setCars((prevCars) => prevCars.filter((car) => car.id !== id)); // Atualiza a lista de veículos, removendo o veículo deletado
            toast.success("Veículo removido");
        } catch (err) {
            toast.error("Erro ao remover o veículo"); 
            console.log(err); 
        }
    };

    const editar = (id) => { // Função para redirecionar para o form de edição 
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
                toast.warn("Por favor, escolha um método de busca."); // Notifica se nenhum método foi selecionado
                return; 
            }

            // Verifica se a resposta da requisição está vazia
            if (resposta.data.length === 0) {
                toast.info("Nenhum veículo encontrado!"); // Notifica que não foram encontrados veículos
                setBuscaRealizada(true); // Marca a busca como realizada
            } else {
                setCars(resposta.data); // Atualiza o estado com os veículos encontrados
                setBuscaRealizada(true); // Marca a busca como realizada
                toast.success("Consulta realizada com sucesso!"); // Notifica que a consulta foi bem-sucedida
            }
        } catch (erro) {
            toast.error("Erro ao realizar a consulta. Verifique os dados e tente novamente."); // Notifica erro na consulta
            console.log(erro); 
        }
    };

    const tecla = (e) => { // Função para detectar pressionamento da tecla enter
        if (e.key === "Enter") { // Se a tecla pressionada for enter
            consulta(); // Chama a função de consulta
        }
    };

    return (
        <>
            <ToastContainer /> 
            <div className="input-group mb-3" style={{ width: "70vw", margin: "0 auto" }}>
                <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {metodo} {/* Exibe o método de busca selecionado */}
                </button>
                <ul className="dropdown-menu">
                    {/* Itens do menu para selecionar o método de busca */}
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
                    onChange={(e) => setBusca(e.target.value)} // Atualiza o estado de busca ao digitar
                />
                <button onClick={consulta} className="btn btn-outline-success">Buscar</button> {/* Btn para realizar a busca */}
            </div>
            <div className="container pb-4">
                <h1 className="text-center">Busca de veículos</h1>
                <div className="row justify-content-center">
                    {/* mensagem exibida enquanto nao buscar */}
                    {!buscaRealizada ? (
                        <p className="text-center">Faça uma busca para encontrar veículos!</p>
                    ) : (
                        <>
                            {/* Se houver veículos encontrados, os exibe */}
                            {cars.length > 0 ? (
                                cars.map((car) => (
                                    <div className="col-12 col-md-6 mb-4" key={car.id}>
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
        </>
    );
};

export default Busca; 
