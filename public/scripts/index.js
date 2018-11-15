$(document).ready(()=>{
   
});

function login(){
    $.ajax({
        url: '/auth',
        data: {scope:"account_info"},
        success: (response)=>{
            window.location = response;
        }
      });
      
}