var api = require('../lib/api');


exports.redirect = (req,res,next) =>{
    req.session.auth_code = req.query.code;
}

exports.get_link = (req,res,next) =>{
    let link = `${api.upb.url}/authorize?response_type=code&client_id=${api.upb.client_id}&redirect_uri=${api.upb.redirect_uri}&scope=${req.query.scope}`;
    res.send(link);
}