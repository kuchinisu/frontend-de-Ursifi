import {
    GET_CARPETAS_SUCCESS,
    GET_CARPETAS_FAIL,

    GET_IMAGENES_SUCCESS,
    GET_IMAGENES_FAIL,

    GET_VIDEOS_ARCHIVOS_SUCCESS,
    GET_VIDEOS_FAIL,

    GET_ARCHIVOS_SUCCESS,
    GET_ARCHIVOS_FAIL,
    POST_CARPETA_SUCCESS,
    POST_CARPETA_FAIL,
    GET_SUBCARPETAS_SUCCESS,
    GET_SUBCARPETAS_FAIL,
    GET_VIDEOS_SUCCESS,
    EDITAR_PRIVACIDAD_CARPETA_SUCCESS,
    EDITAR_PRIVACIDAD_CARPETA_FAIL,
    GET_PRIVACIDAD_CARPETA_SUCCESS,
    GET_PRIVACIDAD_CARPETA_FAIL,
    EDITAR_ACCESO_CARPETA_SUCCESS,
    EDITAR_ACCESO_CARPETA_FAIL,
    GET_ACCESO_CARPETA_SUCCESS,
    GET_ACCESO_CARPETA_FAIL,
} from './types';

import axios from 'axios';


export const get_carpetas = () => async dispatch => {
    if(localStorage.getItem('access')){
        const config = {
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };

        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/galeria/lista/carpetas/`, config);
        
            if (res.status === 200) {
                dispatch({
                    type: GET_CARPETAS_SUCCESS,
                    payload: res.data
                });
            } else {
                dispatch({
                    type: GET_CARPETAS_FAIL
                });
            }
        }
        catch(err){
            dispatch({
                type: GET_CARPETAS_FAIL
            });
        }
    } else {
        dispatch({
            type: GET_CARPETAS_FAIL
        });
    }
};

export const get_carpeta_slug = (slug) => async dispatch => {
    if(localStorage.getItem('access')){
        const config = {
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };

        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/galeria/carpeta/slug/${slug}/`, config);
        
            if (res.status === 200) {
                dispatch({
                    type: GET_SUBCARPETAS_SUCCESS,
                    payload: res.data
                });
            } else {
                dispatch({
                    type: GET_SUBCARPETAS_FAIL
                });
            }
        }
        catch(err){
            dispatch({
                type: GET_SUBCARPETAS_FAIL
            });

            console.log('error intentando obtener las subcarpetas', err)
        }
    } else {
        dispatch({
            type: GET_SUBCARPETAS_FAIL
        });
    }
};


export const editar_privacidad_de_carpeta = (slug) => async dispatch => {
    if(localStorage.getItem('access')){
        const config = {
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };

        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/galeria/editar/carpeta/${slug}/`, config);
        
            if (res.status === 200) {
                dispatch({
                    type: EDITAR_PRIVACIDAD_CARPETA_SUCCESS,
                    payload: res.data
                });
            } else {
                dispatch({
                    type: EDITAR_PRIVACIDAD_CARPETA_FAIL
                });
            }
        }
        catch(err){
            dispatch({
                type: EDITAR_PRIVACIDAD_CARPETA_FAIL
            });

            console.log('error al intentar cambiar la privacidad de la carpeta', err)
        }
    } else {
        dispatch({
            type: EDITAR_PRIVACIDAD_CARPETA_FAIL
        });
    }
};

export const get_privacidad_de_carpeta = (slug) => async dispatch => {
    if(localStorage.getItem('access')){
        const config = {
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };
        console.log('slug de la carpeta a consultar privacidad:', slug)
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/galeria/privacidad/carpeta/slug/${slug}/`, config);
            
            

            if (res.status === 200) {
                dispatch({
                    type: GET_PRIVACIDAD_CARPETA_SUCCESS,
                    payload: res.data
                });
            } else {
                dispatch({
                    type: GET_PRIVACIDAD_CARPETA_FAIL
                });
            }
        }
        catch(err){
            dispatch({
                type: GET_PRIVACIDAD_CARPETA_FAIL
            });

            console.log('error al intentar obtener pa privacidad de la carpeta', err)
        }
    } else {
        dispatch({
            type: GET_PRIVACIDAD_CARPETA_FAIL
        });

    }
};

export const editar_acceso_carpeta = (slug, acceso ) => async dispatch => {
    console.log('acceso para la carpeta:', acceso)
    if(localStorage.getItem('access')){
        const config = {
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };

        const body = {
            'accesible_para': acceso
        };

        console.log('slug de la carpeta a consultar privacidad:', slug)
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/galeria/editar/accesibilidad/carpeta/slug/${slug}/`, config, body);
            
            

            if (res.status === 200) {
                dispatch({
                    type: EDITAR_ACCESO_CARPETA_SUCCESS,
                    payload: res.data
                });
            } else {
                dispatch({
                    type: EDITAR_ACCESO_CARPETA_FAIL
                });
            }
        }
        catch(err){
            dispatch({
                type: EDITAR_ACCESO_CARPETA_FAIL
            });

            console.log('error al intentar editar la accesibilidad de la carpeta', err)
        }
    } else {
        dispatch({
            type: EDITAR_ACCESO_CARPETA_FAIL
        });

    }
};

export const get_acceso_carpeta = (slug) => async dispatch => {
    if(localStorage.getItem('access')){
        const config = {
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };
        console.log('slug de la carpeta a consultar privacidad:', slug)
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/galeria/get/accesibilidad/carpeta/slug/${slug}/`, config);
            
            

            if (res.status === 200) {
                dispatch({
                    type: GET_ACCESO_CARPETA_SUCCESS,
                    payload: res.data
                });
            } else {
                dispatch({
                    type: GET_ACCESO_CARPETA_FAIL
                });
            }
        }
        catch(err){
            dispatch({
                type: GET_ACCESO_CARPETA_FAIL
            });

            console.log('error al intentar editar la accesibilidad de la carpeta', err)
        }
    } else {
        dispatch({
            type: GET_ACCESO_CARPETA_FAIL
        });

    }
};


export const get_imagenes = (slug) => async dispatch => {
    if(localStorage.getItem('access')){
        const config = {
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };

        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/galeria/lista/imagenes/${slug}/`, config);
        
            if (res.status === 200) {
                dispatch({
                    type: GET_IMAGENES_SUCCESS,
                    payload: res.data
                });
            } else {
                dispatch({
                    type: GET_IMAGENES_FAIL
                });
            }
        }
        catch(err){
            dispatch({
                type: GET_IMAGENES_FAIL
            });
            console.log('error tratando de obtener las imagenes:', err)
        }
    } else {
        dispatch({
            type: GET_IMAGENES_FAIL
        });
        console.log('no esta autenticado para obtener las imagenes')
    }
};


export const get_archivos = (slug) => async dispatch => {
    if(localStorage.getItem('access')){
        const config = {
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };

        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/galeria/lista/archivos/${slug}/`, config);
        
            if (res.status === 200) {
                dispatch({
                    type: GET_ARCHIVOS_SUCCESS,
                    payload: res.data
                });
            } else {
                dispatch({
                    type: GET_ARCHIVOS_FAIL,
                });
            }
        }
        catch(err){
            dispatch({
                type: GET_ARCHIVOS_FAIL
            });
            console.log('error tratando de obtener los archivos:', err)
        }
    } else {
        dispatch({
            type: GET_ARCHIVOS_FAIL
        });
        console.log('no esta autenticado para obtener los archivos')
    }
};


export const get_videos = (slug) => async dispatch => {
    if(localStorage.getItem('access')){
        const config = {
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };

        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/galeria/lista/videos/${slug}/`, config);
        
            if (res.status === 200) {
                dispatch({
                    type: GET_VIDEOS_SUCCESS,
                    payload: res.data
                });
            } else {
                dispatch({
                    type: GET_VIDEOS_FAIL,
                });
            }
        }
        catch(err){
            dispatch({
                type: GET_VIDEOS_FAIL
            });
            console.log('error tratando de obtener los videos:', err)
        }
    } else {
        dispatch({
            type: GET_VIDEOS_FAIL
        });
        console.log('no esta autenticado para obtener los videos')
    }
};



export const crear_carpeta = () => async dispatch  => {
    if(localStorage.getItem('access')){

        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        };

        const body = {
            token:localStorage.getItem('access')
        }
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/galeria/crear/carpeta/`,body, config);
            if(res.status === 200){
                dispatch({
                    type: POST_CARPETA_SUCCESS,
                })
            }else{
                dispatch({
                    type: POST_CARPETA_FAIL,
                })
            }
        }catch(err){
            dispatch({
                type:POST_CARPETA_FAIL,
            })
            console.log("error creando la carpeta: ", err)
        }
    }else{

    }
}
