
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

class Utils{
	constructor( ) {
 
	}   

    notify(message, type){
      toast(message, {
        autoClose: 3000,
        position: "top-center",
        transition: "slide",
        type: type || "error",
      });
    }

    setAuth(status){
        localStorage.setItem("isAuth", status);
    }

    getAuth(){
        return JSON.parse(localStorage.getItem('isAuth')); 
    }

    setUser(user){
        localStorage.setItem("user", JSON.stringify(user));
    }

    getUser(){
        return JSON.parse(localStorage.getItem('user')); 
    }

    wait(time){        
        return new Promise((resolve) => {        
            setTimeout(function() { resolve() }, time)              
        })                
    }
}

export const utils = new Utils()