var request = require('request');
var api = require('../lib/api');

exports.members_management = (req,res,next)=>{
    res.render('coop.ejs',{title:"Members Management"});
}

exports.members = (req,res,next)=>{
    req.getConnection((err,conn)=>{
        conn.beginTransaction((err)=>{
            if(err) return next(err);
            console.log(req.session.coop_id);
            conn.query("SELECT * FROM vmembers where coop_id = ?",[req.session.coop_id],function(err, rows) {
                if (err) {
                  return next(err);
                }
                var data = {
                    data: rows,
                    recordsTotal: rows.length,
                    recordsFiltered: rows.length
                  };
                res.send(JSON.stringify(data));
                res.end();
                });
        });
    });
}

exports.reg_page = (req,res,next)=>
{
    res.render('coop_register.ejs',{title:"Register Member"});
}

exports.register = (req,res,next)=>{
    req.getConnection((err,conn)=>{
        if(err) return next(err);
        conn.beginTransaction((err)=>{

            var user_info = req.body.user_info;

            console.log(user_info);

            conn.query('insert into user_info set ?',user_info,(err,result)=>{
                if (err) return next(err);

                var info_id = result.insertId;

                var member_info = {
                    account_number : req.body.acc_num,
                    username: req.body.username,
                    coop_id: req.session.coop_id,
                    user_id: info_id
                }
                conn.query('insert into tbl_members set ?',member_info,(err,result)=>{
                    if (err) return next(err);

                    conn.commit(function(err) {
                        if (err) {
                          return conn.rollback(function() {
                            throw err;
                          });
                        }
                        res.redirect('/coop/manage/members')
                        res.end();
                    });
                })
            });
        });
    });
}

exports.record_trans = (req,res,next)=>{
    var data = {
        type: req.body.type,
        amt: req.body.amt,
        account_number: req.body.acc_num
    };
    req.getConnection((err,conn)=>{
        conn.beginTransaction((err)=>{
            conn.query("insert into transaction_logs set ? ",data,(err)=>{
                if(err) return next(err);
                conn.commit((err)=>{
                    if(err) return next(err);

                    res.redirect('/coop/manage/members');
                });
               
            });
        })
    })
}