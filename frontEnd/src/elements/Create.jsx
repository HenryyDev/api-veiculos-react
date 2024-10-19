import React, { useState } from "react";
import axios from "axios";

import "./css/Create.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Create() {
  const [values, setValues] = useState({
    marca: "",
    modelo: "",
    ano: "",
    proprietario: "",
    cor: "",
  });



  function enviar(e) {
    e.preventDefault();

    axios
      .post("http://localhost:3030/add_car", values)
      .then((res) => {
        toast.success("Veiculo cadastrado!");
        console.log(res);
        setValues({
          marca: "",
          modelo: "",
          ano: "",
          proprietario: "",
          cor: "",
        });
      })
      .catch((err) => {
        toast.error("erro ao Cadastrar veiculo. Tente novamente.");
        console.log(err);
      });
  }

  return (
    <>
      <ToastContainer />
      <div className="container d-flex justify-content-center align-items-center">
        <div className="row">
          <h3 className="text-center my-2">Cadastro de veiculos</h3>

          <form onSubmit={enviar}>
            <div className="form-group my-3">
              <label htmlFor="marca">Marca</label>
              <input
                type="text"
                required
                name="marca"
                className="form-control"
                value={values.marca}
                onChange={(e) =>
                  setValues({ ...values, marca: e.target.value })
                }
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="modelo">Modelo</label>
              <input
                type="text"
                required
                name="modelo"
                className="form-control"
                value={values.modelo}
                onChange={(e) =>
                  setValues({ ...values, modelo: e.target.value })
                }
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="ano">Ano</label>
              <input
                type="text"
                required
                name="ano"
                className="form-control"
                value={values.ano}
                onChange={(e) => setValues({ ...values, ano: e.target.value })}
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="proprietario">Proprietário</label>
              <input
                type="text"
                required
                name="proprietario"
                className="form-control"
                value={values.proprietario}
                onChange={(e) =>
                  setValues({ ...values, proprietario: e.target.value })
                }
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="cor">Cor</label>
              <input
                type="text"
                required
                name="cor"
                className="form-control"
                value={values.cor}
                onChange={(e) => setValues({ ...values, cor: e.target.value })}
              />
            </div>
            <div className="form-group my-3">
              <button type="submit" className="btn btn-success w-100">
                Cadastrar
              </button>
              <a href="/viewall" className="btn btn-success w-100 my-2">Buscar</a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Create;
