
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

    generateRandomId(){
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
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

    userId(){
        return JSON.parse(localStorage.getItem('user'))._id; 
    }

    wait(time){        
        return new Promise((resolve) => {        
            setTimeout(function() { resolve() }, time)              
        })                
    }
}

export const utils = new Utils()