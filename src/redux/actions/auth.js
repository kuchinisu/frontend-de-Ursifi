import axios from 'axios';

import { 
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    SET_AUTH_LOADING,
    REMOVE_AUTH_LOADING,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
    REFRESH_SUCCESS,
    REFRESH_FAIL,
    LOGOUT,
 } from './types'

export const signup = (email, nombre,  password, re_password) => async dispatch => {
    dispatch({
        type: SET_AUTH_LOADING
    });

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({
        
            email,
            nombre,
            password,
            re_password
        
    });

    console.log(body);
    

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/`, body, config);
        
        if (res.status === 201) {
            dispatch({
                type: SIGNUP_SUCCESS,
                payload: res.data
            }); 
        } else {
            dispatch({
                type: SIGNUP_FAIL
            });
        }
        dispatch({
            type: REMOVE_AUTH_LOADING
        });
    } catch (err) {
        dispatch({
            type: SIGNUP_FAIL
        });
        dispatch({
            type: REMOVE_AUTH_LOADING
        });
     
    }
};

export const check_auth = () => async dispatch  => {
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
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/verify/`,body, config);
            if(res.status === 200){
                dispatch({
                    type: AUTHENTICATED_SUCCESS,
                })
            }else{
                dispatch({
                    type: AUTHENTICATED_FAIL,
                })
            }
        }catch(err){
            dispatch({
                type:AUTHENTICATED_FAIL,
            })
            console.log("error en la autenticación: ", err)
        }
    }else{

    }
} 

export const activate = (uid, token) => async dispatch => {
   dispatch({
    type: SET_AUTH_LOADING
   });
   
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({
        uid,
        token
    });
    console.log(body)
    try{
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/activation/`,body, config);

        if (res.status === 204) {
            dispatch({
                type: ACTIVATION_SUCCESS,
            })
        }else {
            dispatch({type: ACTIVATION_FAIL})
        };

        dispatch({
            type: REMOVE_AUTH_LOADING
        })

    }catch (err) {
        dispatch({type: ACTIVATION_FAIL});
        dispatch({
            type: REMOVE_AUTH_LOADING,
        });
        console.log(err)
    };
};



export const load_user = () => async dispatch => {
    if(localStorage.getItem('access')){
        const config = {
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };

        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/users/me/`, config);
        
            if (res.status === 200) {
                dispatch({
                    type: USER_LOADED_SUCCESS,
                    payload: res.data
                });
            } else {
                dispatch({
                    type: USER_LOADED_FAIL
                });
            }
        }
        catch(err){
            dispatch({
                type: USER_LOADED_FAIL
            });
        }
    } else {
        dispatch({
            type: USER_LOADED_FAIL
        });
    }
};




export const login = (email, password) => async dispatch => {
   dispatch({
       type: SET_AUTH_LOADING
   });

   const config = {
       headers: {
           'Content-Type': 'application/json'
       }
   };

   const body = JSON.stringify({
       email,
       password
   });

   try {
       const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/create/`, body, config);
       console.log('respeusta del login: ', res.data)
       if (res.status === 200) {
           dispatch({
               type: LOGIN_SUCCESS,
               payload: res.data
           });
           dispatch(load_user());
           dispatch({
               type: REMOVE_AUTH_LOADING
           });
       } else {
           dispatch({
               type: LOGIN_FAIL
           });
           dispatch({
               type: REMOVE_AUTH_LOADING
           });
       } 
   }
   catch(err){
       dispatch({
           type: LOGIN_FAIL
       });
       dispatch({
           type: REMOVE_AUTH_LOADING
       });
   }
};

export const refresh = () => async dispatch => {
    if (localStorage.getItem('refresh')) {
        
        const config = {
            headers: {
                'Access': 'application/json',
                'Content-Type': 'application/json',
            }
        };

        const body = JSON.stringify({
            refresh: localStorage.getItem('refresh')
        })

        try {
            
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/refresh/`, body, config)
            if(res.status === 200) {
                dispatch({
                    type: REFRESH_SUCCESS,
                    payload: res.data,
                })
            } else {
                dispatch({
                    type:REFRESH_FAIL
                })
            } 

        } catch(err) {

        }

    } else {
        dispatch({
            type: REFRESH_FAIL
        })
    }
}

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    });
};