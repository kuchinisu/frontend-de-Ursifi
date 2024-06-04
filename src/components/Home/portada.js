import { connect, useDispatch } from "react-redux";

import { get_carpetas, crear_carpeta } from '../../redux/actions/galeria';
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import CarpetaComponent from '../carpeta';

const Portada = ({ carpetas }) => {
  const dispatch = useDispatch();
  const [nombreCarpeta, setNombreCarpeta] = useState('');

  useEffect(() => {
    dispatch(get_carpetas());
  }, [dispatch]);

  const handleNombreCarpetaChange = (e) => {
    setNombreCarpeta(e.target.value);
  };

  const handleCrearCarpeta = async () => {
    const token = localStorage.getItem('access');

    if (!token) {
      console.log('No está autenticado');
      return;
    }

    const response = await fetch(`${process.env.REACT_APP_API_URL}/galeria/crear/carpeta/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`,
      },
      body: JSON.stringify({
        nombre: nombreCarpeta,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Carpeta creada:', data);
      dispatch(get_carpetas());
    } else {
      const errorData = await response.json();
      console.error('Error al crear la carpeta:', errorData);
    }
  };

  return (
    <div>
      <div name="carpetas">
        <h1>Carpetas</h1>
        <div className="divider"></div>

        <div>
          {carpetas && carpetas.length > 0 ? (
            <div className="min-h-96">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
                {carpetas.map((carpeta) => (
                    <Link to={`carpeta/${carpeta.slug}/${carpeta.ubicacion ? carpeta.ubicacion.replace(/\//g, '-') : '--'}/${carpeta.nombre}`}>
                        <CarpetaComponent id={carpeta.id} nombre={carpeta.nombre}/>
                    </Link>
                ))}
                </div>
                <div className="m-5">
                  <button
                    onClick={() => document.getElementById('my_modal_1').showModal()}
                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                  >
                    Crear nueva carpeta
                  </button>

                  <dialog id="my_modal_1" className="modal">
                    <div className="modal-box">
                      <h3 className="font-bold text-lg">Crear Carpeta</h3>
                      <p className="py-4">Nombre de la carpeta</p>
                      <div className="modal-action">
                        <input
                          type="text"
                          placeholder="Type here"
                          className="input input-bordered w-full max-w-xs"
                          id="nombreCarpeta"
                          value={nombreCarpeta}
                          onChange={handleNombreCarpetaChange}
                        />
                        <button className="btn" onClick={handleCrearCarpeta}>Crear</button>
                      </div>
                    </div>
                  </dialog>
                </div>
            </div>
          ) : (
            <div>
              <div className="min-h-96 flex flex-col items-center justify-center bg-gray-100">
                <h1 className="text-2xl font-bold mb-4">No hay carpetas para mostrar</h1>
                <button
                  onClick={() => document.getElementById('my_modal_1').showModal()}
                  className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                >
                  Crear nueva carpeta
                </button>

                <dialog id="my_modal_1" className="modal">
                  <div className="modal-box">
                    <h3 className="font-bold text-lg">Crear Carpeta</h3>
                    <p className="py-4">Nombre de la carpeta</p>
                    <div className="modal-action">
                      <input
                        type="text"
                        placeholder="Type here"
                        className="input input-bordered w-full max-w-xs"
                        id="nombreCarpeta"
                        value={nombreCarpeta}
                        onChange={handleNombreCarpetaChange}
                      />
                      <button className="btn" onClick={handleCrearCarpeta}>Crear</button>
                    </div>
                  </div>
                </dialog>

              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  carpetas: state.galeria.carpetas
});

export default connect(mapStateToProps, {
  get_carpetas,
})(Portada);
