import {  useParams } from "react-router-dom";
import React, {  useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Editar = () => {
  const { id } = useParams(); 
  const [car, setCar] = useState({
    id:id,
    marca: '',
    modelo: '',
    ano: '',
    proprietario: '',
    cor: ''
  });




  const enviar =  (e) => {
    e.preventDefault();
    try {
      axios.put(`http://localhost:3030/editar/${id}`, car); 
      toast.success("Veículo atualizado com sucesso!");
      
    } catch (err) {
      console.error("Erro ao atualizar veículo:", err);
      toast.error("Erro ao atualizar veículo.");
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
      <div className="container d-flex justify-content-center align-items-center">
        <div className="row">
          <h3 className="text-center my-2">Edição de veiculo</h3>
          <form onSubmit={enviar}>
            <div className="form-group my-3">
              <label>Marca</label>
              <input
                type="text"
                required
                name="marca"
                className="form-control"
                value={car.marca}
                onChange={(e) =>
                  setCar({ ...car, marca: e.target.value })
                }
              />
            </div>
            <div className="form-group my-3">
              <label>Modelo</label>
              <input
                type="text"
                required
                name="modelo"
                className="form-control"
                value={car.modelo}
                onChange={(e) =>
                  setCar({ ...car, modelo: e.target.value })
                }
              />
            </div>
            <div className="form-group my-3">
              <label>Ano</label>
              <input
                type="number"
                required
                name="ano"
                className="form-control"
                value={car.ano}
                onChange={(e) => setCar({ ...car, ano: e.target.value })}
              />
            </div>
            <div className="form-group my-3">
              <label>Proprietário</label>
              <input
                type="text"
                required
                name="proprietario"
                className="form-control"
                value={car.proprietario}
                onChange={(e) =>
                  setCar({ ...car, proprietario: e.target.value })
                }
              />
            </div>
            <div className="form-group my-3">
              <label >Cor</label>
              <input
                type="text"
                required
                name="cor"
                className="form-control"
                value={car.cor}
                onChange={(e) => setCar({ ...car, cor: e.target.value })}
              />
            </div>
            <div className="form-group my-3">
              <button type="submit" className="btn btn-success w-100">
                Atualizar
              </button>
              
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Editar;
