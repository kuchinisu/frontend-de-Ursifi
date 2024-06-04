import { useParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { connect, useDispatch } from "react-redux";

import { 
        get_carpeta_slug, get_imagenes, 
        get_archivos, get_videos, 
        editar_privacidad_de_carpeta,
        get_privacidad_de_carpeta,
        editar_acceso_carpeta
    } from "../../redux/actions/galeria";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CarpetaComponent from '../../components/carpeta'; 

const Carpeta = ({subcarpetas, imagenes, archivos, videos, publica}) => {
    const params = useParams();
    const slug = params.slug;
    const ubicacion = params.ubicacion.replace(/\-/g, '/');
    const nombre = params.nombre;
    
    const ubicacionFull = ubicacion + '/' + nombre;

    const [nombreCarpeta, setNombreCarpeta] = useState('');
    const [NombreSubCarpeta, setNombreSubCarpeta] = useState('')
    
    const dispatch = useDispatch();
    useEffect(()=>{

        dispatch(get_carpeta_slug(slug));
        dispatch(get_imagenes(slug));
        dispatch(get_archivos(slug));
        dispatch(get_videos(slug));
        dispatch(get_privacidad_de_carpeta(slug));
        

    }, [dispatch, slug]);


    const handleNombreCarpetaChange = (e) => {
        setNombreCarpeta(e.target.value);
    };
    
    const handleCrearCarpeta = async () => {
        const token = localStorage.getItem('access');
    
        if (!token) {
          console.log('No está autenticado');
          return;
        }
    
        const response = await fetch(`${process.env.REACT_APP_API_URL}/galeria/crear/subcarpeta/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${token}`,
          },
          body: JSON.stringify({
            nombre: nombreCarpeta,
            ubicacion: ubicacionFull.replace("///", "/"),
          }),
        });
    
        if (response.ok) {
          const data = await response.json();
          console.log('Carpeta creada:', data);
          dispatch(get_carpeta_slug(slug));
        } else {
          const errorData = await response.json();
          console.error('Error al crear la carpeta:', errorData);
        }
    };

    const handleEditarPrivasidadCarpeta = () => {
        dispatch(editar_privacidad_de_carpeta(slug));
        dispatch(get_privacidad_de_carpeta(slug))
    }
    
    ////////////////////////////////////////////////////////////

    
    const [fileType, setFileType] = useState(''); 

    const [formData, setFormData] = useState({
        archivo: null,
        nombre: "",
        carpeta: slug,
    });

    const handleNombreFileChange = (e) => {
        setFormData({
            ...formData,
            nombre: e.target.value
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            archivo: file
        });
        setFileType(file.type);  

        console.log('File type:', file.type);
    };
    ////////////////
    const fileSubirTest = () => {
        
    }

    const handleSubirFile = async () => {
        // Obtener el tipo de archivo
        const fileType = document.getElementById('archivo_inp').files[0].type;
    
        let tipo;
        switch (fileType) {
            case 'image/jpeg':
            case 'image/png':
            case 'image/gif':
            case 'image/bmp':
            case 'image/tiff':
                tipo = 'imagen';
                break;
            case 'video/mp4':
            case 'video/avi':
            case 'video/mov':
            case 'video/wmv':
            case 'video/mkv':
                tipo = 'video';
                break;
            default:
                tipo = 'archivo';
                break;
        }
    
        const nombre = document.getElementById('nombre_archivo').value;
        const archivo = document.getElementById('archivo_inp').files[0];
    
        const token = localStorage.getItem('access');
    
        const aMandar = new FormData();
        aMandar.append('nombre', nombre);
        aMandar.append('archivo', archivo);
        aMandar.append('carpeta', slug);
    
        fetch(`${process.env.REACT_APP_API_URL}/galeria/subir/${tipo}/`, {
            method: 'POST',
            body: aMandar,
            headers: {
                'Authorization': `JWT ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('Respuesta del servidor:', data);

            get_imagenes(slug);
        })
        .catch(error => {
            console.error('Error al realizar la solicitud:', error);
        });
    
    };
    
    const handleGuardarCambiosCarpeta = () => {
        const acceso = document.getElementById('accecibilidad').value;

        const aMandarCarpetaAcceso = new FormData();

        aMandarCarpetaAcceso.append('accesible_para', acceso)

        const token = localStorage.getItem('access');


        fetch(`${process.env.REACT_APP_API_URL}/galeria/editar/accesibilidad/carpeta/slug/${slug}/`, {
            method: 'POST',
            body: aMandarCarpetaAcceso,
            headers: {
                'Authorization': `JWT ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('Respuesta del servidor:', data);

            get_imagenes(slug);
        })
        .catch(error => {
            console.error('Error al intentar editar la accesibilidad de la carpeta:', error);
        });
    };

    const handleDescargarImagen = async (imageUrl) => {
        try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}${imageUrl}`);
      
          if (!response.ok) {
            throw new Error(`Error fetching image: ${response.status}`);
          }
      
          const blob = await response.blob();
      
          const filename = imageUrl.split('/').pop();
      
          const downloadLink = URL.createObjectURL(blob);
      
          const link = document.createElement('a');
          link.href = downloadLink;
          link.download = filename;
          link.click();
      
          URL.revokeObjectURL(downloadLink);
        } catch (error) {
          console.error(`Error downloading image: ${error.message}`);
        }
      };
      

    return(
        <Layout>
            <div className="relative min-h-screen">

                <div name='cabeza'>
                    <div className="flex">
                        <div className="font-bold text-3xl">
                            {ubicacion}
                        </div>

                        <div className="font-bold text-3xl">
                            /{nombre}
                        </div>
                    </div>
                </div>

                <div className="min-h-8">
                
                <div className="flex justify-end m-5">
                    <details className="relative dropdown">
                        <summary className="m-1 btn bg-blue-500 text-white hover:bg-blue-600 rounded-full shadow-lg focus:outline-none">
                        ❕
                        </summary>
                        <div className="mt-2 p-4 bg-white shadow-lg rounded-lg w-64">
                            <h2 className="text-lg font-bold mb-2">Detalles</h2>
                            <div className="divider my-2"/>
                            <ul className="menu p-2 shadow bg-base-100 rounded-box w-full">
                                <li className="my-1" 
                                onClick={()=>document.getElementById('my_modal_editar_privacidad').showModal()}>
                                    <a  href="#" 
                                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg border border-blue-500">
                                        
                                        Cambiar privacidad
                                    </a>
                                </li>
                                <li className="my-1">
                                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                                        Item 2
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </details>
                </div>

                    <div name='carpetas'>
                    <div className="divider"></div>
                    <div>
                        {subcarpetas && subcarpetas.length ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {subcarpetas.map((carpeta) =>
                            <Link to={`/carpeta/${carpeta.slug}/${carpeta.ubicacion ? carpeta.ubicacion.replace(/\//g, '-') : '--'}/${carpeta.nombre}`} key={carpeta.id}>
                                <CarpetaComponent id={carpeta.id} nombre={carpeta.nombre}/>
                            </Link>
                            )}
                            <div className="flex justify-center items-center max-h-8">
                            <button onClick={() => document.getElementById('my_modal_1').showModal()}
                                className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-200">
                                Crear nueva carpeta
                            </button>
                            </div>
                        </div>
                        ) : (
                        <div >
                            <div className="min-h-96 flex flex-col items-center justify-center bg-gray-100">
                            <h1 className="text-2xl font-bold mb-4">No hay carpetas para mostrar</h1>
                            <button onClick={() => document.getElementById('my_modal_1').showModal()}
                                className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-200">
                                Crear nueva carpeta
                            </button>
                            </div>
                        </div>
                        )}
                    </div>
                    </div>

                    <div className="min-h-96 m-5">

                        <div name="imagenes">
                            <div className="grid grid-cols-3 gap-4">
                                {imagenes && imagenes.length ? (
                                    imagenes.map((imagen) =>
                                        <div key={imagen.id} className="max-w-sm rounded overflow-hidden shadow-lg">
                                            <img className="w-full" src={`${process.env.REACT_APP_API_URL}${imagen.imagen}`} alt={imagen.nombre} />
                                            <div className="px-6 py-4">
                                                <div className="font-bold text-xl mb-2">{imagen.nombre}</div>
                                            </div>

                                            <div className="flex justify-end">
                                                <div 
                                                className="btn"
                                                onClick={() => handleDescargarImagen(imagen.imagen)}
                                                >...</div>
                                            </div>
                                        </div>
                                    ) 
                                ) : (
                                    <div className="col-span-3">
                                    </div>
                                )}
                            </div>
                        </div>

                        <div name="videos">
                            <div className="grid grid-cols-3 gap-4">
                                {videos && videos.length ? (
                                    videos.map((video) =>
                                        <div key={video.id} className="max-w-sm rounded overflow-hidden shadow-lg">
                                            <video className="w-full" controls>
                                                <source src={`${process.env.REACT_APP_API_URL}${video.video}`} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                            <div className="px-6 py-4">
                                                <div className="font-bold text-xl mb-2">{video.nombre}</div>
                                            </div>
                                            
                                            <div className="flex justify-end">
                                                <div 
                                                className="btn"
                                                onClick={() => handleDescargarImagen(video.video)}
                                                >...</div>
                                            </div>

                                        </div>
                                    )
                                ) : (
                                    <div className="col-span-3">
                                    </div>
                                )}
                            </div>
                        </div>

                        <div name="files" className="p-4">
                            <div className="grid grid-cols-3 gap-4">
                                {archivos && archivos.length ? (
                                    archivos.map((archivo) => (
                                        <div key={archivo.id} className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
                                            <div className="p-6">
                                                {archivo.tipo === 'video' ? (
                                                    <div className="w-full mb-4">
                                                        <video className="w-full" controls>
                                                            <source src={`${process.env.REACT_APP_API_URL}${archivo.url}`} type="video/mp4" />
                                                            Your browser does not support the video tag.
                                                        </video>
                                                    </div>
                                                ) : (
                                                    <div className="w-full mb-4 flex items-center justify-center h-32 bg-gray-200">
                                                        <i className={`fas fa-${archivo.tipo === 'imagen' ? 'image' : 'file-alt'} fa-3x text-gray-500`}></i>
                                                    </div>
                                                )}
                                                <div className="font-bold text-xl mb-2 flex items-center">
                                                    {archivo.tipo === 'video' && <i className="fas fa-video mr-2"></i>}
                                                    {archivo.tipo === 'imagen' && <i className="fas fa-image mr-2"></i>}
                                                    {archivo.tipo === 'archivo' && <i className="fas fa-file-alt mr-2"></i>}
                                                    {archivo.nombre}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-span-3 text-center text-gray-500">
                                    </div>
                                )}
                            </div>
                        </div>
                    
                    </div>
                </div>
                
                <div className="m-5">
                    <div className="divider"></div>
                    <button
                        onClick={()=>document.getElementById('my_modal_file').showModal()}
                        className="absolute bottom-4 right-4 px-4 py-2 bg-red-500 text-white font-semibold rounded-full shadow-md hover:bg-red-700 transition duration-200">
                        Subir archivos
                    </button>
                </div>
                

                {/* Open the modal using document.getElementById('ID').showModal() method */}
                <dialog id="my_modal_file" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Subir archivo</h3>
                    <p className="py-4">preciona ESC para cancelar</p>

                    <input 
                        onChange={handleFileChange} 
                        type="file" 
                        className="file-input file-input-ghost w-full max-w-xs" 
                        id="archivo_inp"/>

                    <div className="modal-action">
                    <input 
                        onChange={handleNombreFileChange} 
                        type="text" placeholder="Type here"
                        className="input input-bordered w-full max-w-xs" 
                        id="nombre_archivo"/>

                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn" onClick={handleSubirFile}>Subir</button>
                    </form>
                    </div>
                </div>
                </dialog>

                <dialog id="my_modal_1" className="modal">
                    <div className="modal-box">
                    <h3 className="font-bold text-lg">Crear Carpeta</h3>
                    <p className="py-4">Nombre de la carpeta</p>
                    
                    <input 
                        type="text" placeholder="Type here" 
                        className="input input-bordered w-full max-w-xs" 
                        onChange={handleNombreCarpetaChange} 
                        />
                    <div className="modal-action">
                        <button className="btn" onClick={handleCrearCarpeta}>Crear</button>
                    </div>
                    </div>
                </dialog>
            </div>

            {/* Open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="my_modal_editar_privacidad" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4">Press ESC key or click the button below to close</p>
                    
                    <div>
                        <div className="form-control">
                            <label className="cursor-pointer label">
                                <span className="label-text" id="check_publico">Público</span>
                                
                                {publica ? (
                                    <div>

                                    
                                    <input 
                                        type="checkbox" 
                                        className="checkbox checkbox-secondary" 
                                        defaultChecked
                                        onChange={handleEditarPrivasidadCarpeta}
                                    />
                                    <select
                                    id="accecibilidad" 
                                    className="select select-bordered w-full max-w-xs">
                                        <option disabled selected>visibilidad</option>
                                        <option>todos</option>
                                    </select>
                                    </div>
                                    
                                ):(
                                    <input 
                                        type="checkbox" 
                                        className="checkbox checkbox-secondary" 
                                        onChange={handleEditarPrivasidadCarpeta}
                                    />
                                )
                                }
                            </label>
                        </div>
                    </div>
                    
                    <div className="modal-action">
                    <form method="dialog">
                        <button onClick={handleGuardarCambiosCarpeta} className="btn">guardar cambios</button>
                    </form>
                    </div>
                </div>
            </dialog>

        </Layout>
    );
};

const mapStateToProps = state => ({
    subcarpetas: state.galeria.subcarpetas,
    imagenes: state.galeria.imagenes,
    archivos: state.galeria.archivos,
    videos: state.galeria.videos,
    publica: state.galeria.publica,
    
})

export default connect(mapStateToProps, {

})(Carpeta);