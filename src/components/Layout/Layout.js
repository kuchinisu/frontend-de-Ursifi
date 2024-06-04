import { check_auth, load_user, refresh  } from '../../redux/actions/auth';
import { connect,} from "react-redux";
import {ToastContainer} from 'react-toastify'
import { useEffect } from "react";
import  SideBar  from './components/SideBar';
import  Footer  from './components/Footer';
import Nabvar from './components/Nabvar';

const Layout = (props) => {
    useEffect(()=>{
        props.refresh()
        props.check_auth()
        props.load_user()
        
   });
    return (
        <div data-theme='bumblebee'>
            <ToastContainer autoclose={5000}/>
            <div className='flex'> 

                <div className=''> 
                    <SideBar/>
                </div>
                
                <div className='w-full'> 

                    <Nabvar/>
                    <div className='divider divider-neutral'></div>
                    <div name="cuerpo">
                        
                        <div>
                            {props.children}
                        </div>
                    </div>
                    

                </div>

            </div>
            <Footer/>
        </div>
    );
};

export default connect(null, {
    check_auth, 
    load_user, 
    refresh
}) (Layout)