import {
    GET_CARPETAS_SUCCESS,
    GET_CARPETAS_FAIL,

    GET_IMAGENES_SUCCESS,
    GET_IMAGENES_FAIL,

    GET_VIDEOS_SUCCESS,
    GET_VIDEOS_FAIL,

    GET_ARCHIVOS_SUCCESS,
    GET_ARCHIVOS_FAIL,
    GET_SUBCARPETAS_SUCCESS,
    GET_SUBCARPETAS_FAIL,
    GET_PRIVACIDAD_CARPETA_SUCCESS,
    GET_PRIVACIDAD_CARPETA_FAIL,
} from '../actions/types';

const initialState = {
    carpetas:null,
    subcarpetas: null,
    imagenes:null,
    videos:null,
    archivos:null,
    publica:null,
};

export default function galeria(state=initialState, action) {
    const{type, payload} = action;

    switch(type) {
        //success
        case GET_CARPETAS_SUCCESS:
            return{
                ...state,
                carpetas: payload.results.carpetas
            };
        case GET_IMAGENES_SUCCESS:
            return {
                ...state,
                imagenes: payload.results.imagenes
            };
        case GET_VIDEOS_SUCCESS:
            return {
                ...state,
                videos: payload.results.videos
            };
        case GET_ARCHIVOS_SUCCESS:
            return{ 
                ...state,
                archivos: payload.results.archivos,
            };
        case GET_SUBCARPETAS_SUCCESS:
            return{
                ...state,
                subcarpetas: payload.results.subcarpetas,
            };
        case GET_PRIVACIDAD_CARPETA_SUCCESS:
            return {
                ...state,
                publica: payload.publica,
            };
        
            //fail
        case GET_PRIVACIDAD_CARPETA_FAIL:
            return {
                ...state,
                publica: null,
            };
        case GET_CARPETAS_FAIL:
            return {
                ...state,
                carpetas: null,
            };
        case GET_IMAGENES_FAIL:
            return {
                ...state,
                imagenes: null,
            };
        case GET_VIDEOS_FAIL:
            return {
                ...state,
                videos: null,
            };
        case GET_ARCHIVOS_FAIL:
            return {
                ...state,
                archivos: null,
            };
        case GET_SUBCARPETAS_FAIL:
            return {
                ...state,
                subcarpetas: null,
            };
        default:
            return state;
    };
};