function register(){
    var info = $('#frm_info').serialize();
    var coop_form = $('#frm_coop').serialize();
    var acc_form = $('#frm_acc').serialize();

    var acc_num = $.post('https://api-uat.unionbankph.com/partners/sb/sandbox/v1/accounts',{
        username: acc_form.bank_uname,
        password: acc_form.bank_pword,
        account_name:  acc_form.bank_accname
    })
    var coop_info = {
        coop_name: coop_form.coop_name,
        coop_address: coop_form.coop_address,
        coop_cnum: coop_form.coop_cnum
    };
    var user_info = {
        fname: info.info_form.fname,
        lname: info.info_form.lname,
        mname: info.info_form.mname,
        gender: info.info_gender,
        bdate: info.info_bdate,
        address: info.info_address,
        cnum: info.info_cnum
    }

 

    var user_info = {
        fname:"",
        lname:"",
        mname:"",
        gender:"",
        address:"",
        cnum:""
    };
    $.post('admin/register',{info_form,coop_form,acc_form},(response)=>{
        console.log(response);
    });
}