import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './css/Viewall.css'
import { useNavigate } from 'react-router-dom';


const ViewAll = () => {
  const navigate=useNavigate()
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const buscaCars = async () => {
      try {
        const response = await axios.get("http://localhost:3030/viewall");
        setCars(response.data);
        toast.success("Veiculos encontrados!")
        
      } catch (err) {
        toast.error("Erro ao buscar veiculos.");
    
    }
};

    buscaCars(); 
  }, []); 

  const rem = async (id) => {
    try {
      await axios.delete(`http://localhost:3030/remover/${id}`);
      setCars((prevCars) => prevCars.filter((car) => car.id !== id)); 
      toast.success("Veículo removido");
    } catch (err) {
      toast.error("Erro ao remover");
    }
  };
 

    const editar= (id)=>{
       navigate(`editar/${id}`)
    }
    if(cars.length>=1){
  return (
    <div>
      <ToastContainer />
      <header className=" text-white py-3" style={{ position: "fixed", width: "100vw", top: 0 }}>
                <h1 className="text-center">Sistema de Gerenciamento de veiculos</h1>
                <a href="/" className="btn ">Cadastrar</a>
                <a href="/viewall"  className="btn">Ver Todos os veiculos</a>
                <a href="/busca" className="btn">Buscar</a>
            </header>
      <div className="container pb-4">
        <h1 className="text-center">Veículos Cadastrados</h1>
        <div className="row">
          {cars.map((car) => (
            <div className="col-12 col-md-6 mb-4" key={car.id}>
              <div className="card h-100 mx-4">
                <div className="card-body">
                  <h5 className="card-title">ID: {car.id}</h5>
                  <p className="card-text">
                    Marca: {car.marca} <br />
                    Modelo: {car.modelo} <br /> 
                    Ano: {car.ano} <br />
                    Dono: {car.proprietario} <br />
                    Cor: {car.cor}
                  </p>
                  <a href="#" onClick={()=>editar(car.id)} className="btn btn-success me-2" >
                    Editar
                  </a>
                  <a href="#" className="btn btn-danger" onClick={() => rem(car.id)}>Remover</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
else{
  return(
 <div className=" d-flex flex-column justify-content-center align-items-center" >
   <h1>Nenhum veiculo encontrado</h1>
   <a href="/" className="btn btn-success " >cadastrar veiculo</a>
 </div> );
  
};
}




export default ViewAll;