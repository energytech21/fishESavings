exports.login = (req,res,next)=>{
    res.render('admin.ejs',{title:"Admin Dashboard"})
}
exports.register = (req,res,next) =>{
    req.getConnection((err,conn)=>{
        if(err) return next(err);
        conn.beginTransaction((err)=>{

            var user_info = req.body.user_info;
            var coop_info = req.body.coop_info;


            conn.query('insert into user_info set ?',user_info,(err,result)=>{
                if (err) return next(err);

                var info_id = result.insertId;

                conn.query('insert into coop_info set ?',coop_info,(err,result)=>{
                    if (err) return next(err);

                    var coopID = result.insertId;
                    
                    var acc_info = {
                        account_number: req.body.acc_num,
                        user_id: info_id,
                        coop_id: coopID
                    }
                    
                    conn.query('insert into tbl_cooperatives set ?',acc_info,(err,result)=>{
                        if (err) return next(err);
                        
                        conn.commit(function(err) {
                            if (err) {
                              return conn.rollback(function() {
                                throw err;
                              });
                            }
                            res.send("success");
                            res.end();
                        });
                    })
                })
            });
        })
    });
}