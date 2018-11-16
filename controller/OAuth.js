var api = require('../lib/api');
var request = require('request');

exports.redirect = (req,res,next) =>{
    
    if(typeof req.query.code != 'undefined'){
  
        let options = {
            "url" : api.upb.url + '/token', //set the url
            headers: {  //set the headers
                'content-type' : 'application/x-www-form-urlencoded',
                'accept': 'text/html'
            },
            method: 'POST', 
            form: { 
                client_id: api.upb.client_id,          //client ID of Application
                code: req.query.code,                       //put the code we receive from UnionBank Online Login
                redirect_uri: api.upb.redirect_uri,    //this must be same with the redirect URI we used initially
                grant_type: 'authorization_code'            //set the grant type to authorization_code
            }
        };
        request(options, function(err, response, body){
            if(!err){
                console.log('Error', err);
            }
            if(response){   //output the result of request
                try{
                    var token_data = JSON.parse(body);  
                    if(req.query.state == "account_info"){
                        let get_options ={
                            "url" : 'https://api-uat.unionbankph.com/partners/sb/accounts/v1/info',
                            headers:{
                                'accept':'application/json',
                                'content-type': 'application/json',
                                'x-ibm-client-id' : api.upb.client_id,
                                'x-ibm-client-secret' : api.upb.client_secret,
                                'authorization': 'Bearer '+token_data.access_token
                                },
                            method:'GET'
                        } 
                        request(get_options,(err,response,body)=>{
                            if(!err){
                                console.log('Error', err);
                            }
                            var acc_data = JSON.parse(body);  
                            if(response){   //output the result of request
                                try{
                                    var acc_num = acc_data.account_number;
                                    var last_four= acc_num.substring(acc_num.length-4);
                                    req.getConnection((err,conn)=>{
                                        conn.query('select * FROM vaccounts WHERE right(vaccounts.account_number,4) = ?',[last_four],(err,result)=>{
                                            if(result[0].title == 'Coop Owner'){
                                            
                                                conn.query('select * from vcoop where account_number = ?',[result[0].account_number],(err,result)=>{
                                                    req.session.auth_code = req.query.code;
                                                    req.session.acc_number =  result[0].account_number;
                                                    req.session.coop_id = result[0].coop_id;
                                                    res.redirect('/coop/manage/members');
                                                });
                                    
                                            }
                                            else{
                                                console.log(result[0]);
                                            }
                                        });
                                    })
                                }catch(e){
                                    console.log(e)
                                    res.json(e);    
                                }
                            }
                            else{
                                res.send(body); 
                            }
                        });
                    }
                    if(req.query.state == "transfers"){
                        res.render('withdraw.ejs',{token_data: token_data.access_token});
                    }
                    if(req.query.state == "accounts_sandbox"){
                       res.render('deposit.ejs',{token_data: token_data.access_token});
                       res.end();
                    }
                }catch(e){
                    console.log(e)
                    res.json(e);    
                }
            }else{
                res.send(body); 
            }
        });
        
    }
}

exports.get_link = (req,res,next) =>{
    let link = `${api.upb.url}/authorize?response_type=code&client_id=${api.upb.client_id}&redirect_uri=${api.upb.redirect_uri}&scope=${req.query.scope}&state=${req.query.scope}`;
    res.send(link);
}
