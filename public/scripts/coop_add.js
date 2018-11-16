$(document).ready(()=>{

});
(function() {
    Date.prototype.toYMD = Date_toYMD;
    function Date_toYMD() {
        var year, month, day;
        year = String(this.getFullYear());
        month = String(this.getMonth() + 1);
        if (month.length == 1) {
            month = "0" + month;
        }
        day = String(this.getDate());
        if (day.length == 1) {
            day = "0" + day;
        }
        return year + "-" + month + "-" + day;
    }
})();

function toggle(){
    $('.ui.sidebar').sidebar('toggle');
}

function register() {
    var info = $('#frm_info').serializeArray();

    var date = new Date($('#calendar').calendar('get date')).toYMD();
  
    console.log(date);



    var user_info = JSON.parse(`{
        "fname": "${info[0].value}",
        "lname" : "${info[1].value}",
        "mname": "${info[2].value}",
        "gender": "${info[3].value}",
        "bdate": "${date}",
        "address": "${info[5].value}",
        "cnum": "${info[6].value}"
    }`);

    var data = `{
        "username": "${info[7].value}",
        "password": "${info[8].value}",
        "account_name": "${info[0].value} ${info[1].value} ${info[2].value}"
    }`; 
    
    $.ajax({
        url:'https://api-uat.unionbankph.com/partners/sb/sandbox/v1/accounts',
        type:'POST',
        beforeSend: function(request) {
            request.setRequestHeader("accept", 'application/json');
            request.setRequestHeader("content-type", 'application/json');
            request.setRequestHeader("x-ibm-client-id", 'c79ef80b-c25f-406e-8369-6ea87b96bb7b');
            request.setRequestHeader("x-ibm-client-secret",'P4pE8lX2wK3oD1jS4lE2gB6rV7bR3cT4rH6wJ7cN4rF8qC4bY6');
        },
        data: data,
        success:(response)=>{
            var resData = response.data.account;
            $.ajax({
                url:'/coop/register',
                type:'POST',
                data:{user_info, acc_num: resData.account_number , username:info[7].value},
                success:(response)=>{
                    alert(response);
                },
                datatype:'json'
            });
        }
    
    });
}