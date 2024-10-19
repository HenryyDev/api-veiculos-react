import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './css/Viewall.css'

const ViewAll = () => {
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

  return (
    <div>
      <ToastContainer />
      <div className="container pb-4">
          <h1 className="text-center">Lista de Carros</h1>
          <div className="card d-flex flex-column">
            <ul className="list-group ">
              {cars.map((car) => (
                <li className="list-group-item " key={car.id}>
                id:{car.id},  Marca: {car.marca}, Ano: {car.ano}, Dono: {car.proprietario}, Cor: {car.cor}
                </li>
              ))}
            </ul>
          </div>
      </div>
    </div>
  );
};

export default ViewAll;
