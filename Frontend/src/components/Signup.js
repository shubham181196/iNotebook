import {React,useState} from "react";
import { useNavigate } from 'react-router';
const Signup =(props)=>{
    const [credentials,setCredentials]=useState({name:"",email:"",password:"",confirmpassword:""});
    const navigate =useNavigate();
    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
      }
      const handleSubmit=async (e)=>{
        e.preventDefault();
       if(credentials.password!==credentials.confirmpassword) {
        const {name,email}=credentials;
        setCredentials({name:name,email:email,password:"",confirmpassword:""});
        return props.showAlert("Invalid credentials","danger");
        }
        
        const response= await fetch(`http://localhost:5000/api/auth/createuser`,{
          method:'POST',
          headers:{
              'Content-Type':'application/json',
             
          },
          body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password})
      });
        const json=await response.json();
        console.log(json);
        if(json.success){
          // save the auth token and redirect the user 
          localStorage.setItem('token',json.jwt_token);
          navigate("/");
          props.showAlert("Succesfully account created","success");
        }else{
          props.showAlert("Invalid Details","danger");
        }
      }
    return (
        <div className="container">
          <h2>Signup to continue to iNotebook</h2>
        <form className="my-10" onSubmit={handleSubmit}>
        <div className="mb-3" style={{"marginTop": "36px"}}>
          <label htmlFor="name" className="form-label" >Name</label>
          <input type="text" className="form-control" id="name" name="name" value={credentials.name} onChange={onChange}/>
        </div>
        <div className="mb-3" >
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={credentials.email} onChange={onChange}/>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label" >Password</label>
          <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmpassword" className="form-label" >Confirm Password</label>
          <input type="password" className="form-control" id="confirmpassword" name="confirmpassword" value={credentials.confirmpassword} onChange={onChange} minLength={5} required/>
        </div>
        
        <button type="submit" className="btn btn-primary" >Submit</button>
      </form >
      </div>
    )
}

export default Signup