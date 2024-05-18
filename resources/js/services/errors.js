
/**
 *  Provide in params target object and error response object to handle erros on client side
 *  
 */
export default  function handleErrors(target,errors) {
    // show pop up message 
    $toast.error( errors.message,{
        position : 'top-right'
    });
    // explain evry error default is false
    Object.keys(target).forEach((key)=>{
        target[key].message = "";
    })
    // define error message
    if(errors.errors){
        Object.keys(errors.errors).forEach((key)=>{
            target[key].errorMessage = errors.errors[key][0];
        })
    }

  }