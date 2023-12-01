const Alert =(props)=>{
  const capitalize=(word)=>{
    if(word==="danger") word="error";
    const lower =word.toLowerCase();
    return lower.charAt(0).toUpperCase()+lower.slice(1);
  }  
    
    return(
        // this height is given to the component inorder to prevent cummalative layout shift CLS
        // Component is given its own height 
        <div style={{height:'50px'}}>
            {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissable fade show`} role="alert">
               <strong>{capitalize(props.alert.type)}</strong>: {props.alert.msg}
            </div>}
        </div>
    )
}

export default Alert