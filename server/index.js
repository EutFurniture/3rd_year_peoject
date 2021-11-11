const express = require("express");
const mysql=require("mysql");
const cors=require("cors");
const app=express();
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { response } = require('express');
const saltRounds = 10;
const fs=require('fs');
const multer=require('multer');
require('dotenv').config();
app.use(express.json());

//const { ConnectionPolicyContext } = require("twilio/lib/rest/voice/v1/connectionPolicy");
const cookieParser=require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
var nodemailer = require('nodemailer')
app.use(cors({
  origin:["http://localhost:3000"],
  methods:["GET","POST","PUT"],
  credentials:true 
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(session({
  key:"customer_id",
  secret:"subscribe",
  resave:false,
  saveUninitialized:false,
  cookie:{
   // expires:60*60*24,
  },
}));
app.set("view engine","ejs");

const db=mysql.createConnection({
  user:"root",
  host:"localhost",
  password:"",
  database:"newdata",
  multipleStatements:true,
});

app.get("/login", (req, res) => {
    if (req.session.user) {
      res.send({ loggedIn: true, user: req.session.user });
    } else {
      res.send({ loggedIn: false });
    }
  });
  
  app.post('/login', (req, res) => {
  
      const email = req.body.email
      const password = req.body.password
      
      console.log(email)
      console.log(password)
      db.query
      ("SELECT * FROM userlogin WHERE u_email = ?;", 
      email, 
      (err, result)=> {
  
          if(err){
              res.send({err: err})
          }
          if(result){
              console.log(result);
              if (result.length > 0) {
                  bcrypt.compare(password, result[0].u_password, (error, response)=>{
                      console.log(response);
                      if(response){
                        req.session.user = result;          
                          res.send(result);
                      }else{
                          res.send({message:"Invalid Username or Password!"})
                      }
                  })
              }else{
                  res.send({message:"User doesn't exist"});
              }
  
              
          }}
      );
  });

  app.post("/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) throw err;
      res.send({ info: 'success' });
      return
    })
  
  
  })
  

  app.get('/validemployee', (req, res) => {
    db.query("SELECT * FROM userlogin  INNER JOIN employee ON userlogin.u_email = employee.email WHERE userlogin.u_email=? OR  employee.NIC = ?", [req.query.email,req.query.NIC], (err, results, fields) => {
      if (err) throw err;
      res.send(results);
    });
  
  });



//Customer BackEnd
app.get('/validcustomer1', (req, res) => {
  db.query("SELECT * FROM  customer WHERE email=? OR  nic = ?", [req.query.email,req.query.nic], (err, results, fields) => {
    if (err) throw err;
    res.send(results);
  });

});



app.get('/validcustomer', (req, res) => {
  db.query("SELECT * FROM userlogin INNER JOIN customer ON userlogin.u_email = customer.email WHERE u_email=? OR  nic = ?", [req.query.email,req.query.nic], (err, results, fields) => {
    if (err) throw err;
    res.send(results);
  });

});

app.post("/customerRegister", (req, res) => {
  const fname = req.body.fname;
  const email = req.body.email;
  const phone = req.body.phone;
  const address = req.body.address;
  const password = req.body.password;
  const cpassword = req.body.cpassword;
  const nic = req.body.nic;
 

  var transport = nodemailer.createTransport(
    {
      service: 'gmail',
      auth: {
        user: 'eutfurniture.group45@gmail.com',
        pass: 'eutgroup45@#'
      }
    }
  )
  const otp = Math.floor(100000 + Math.random() * 900000);
  const head = 'otp code';
  const mess = `Dear ${fname}, 

                Your otp code is ${otp}
                Use this code to verify your Account.

            With regrads,
            Eut Furniture Team`;

  var mailOptions = {
    from: 'eutfurniture.group45@gmail.com',
    to: email,
    subject: head,
    text: mess
  }
  transport.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
    }
    else {

      console.log('Email sent' + info.response)
      
      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
          console.log(err);
        }

        db.query(
          "INSERT INTO customer(fname,password,email,phone,nic,address,proimg,date,points) VALUES (?,?,?,?,?,?,'user.jpg',NOW(),0); INSERT INTO userlogin(u_email,u_otp,u_password,u_name,user_role) VALUES (?,?,?,?,'Customer');", [fname,hash, email, phone, nic, address, email, otp, hash, fname],
          (err, result) => {
            if (err) {
              console.log(err)
            } else {
              res.send({ message: "values sended" });
            }
          });
      })
    }
  })



});

app.get('/customer', (req, res) => {
  db.query("SELECT * FROM customer WHERE email=?", [req.query.email], (err, results, fields) => {
    if (err) throw err;
    res.send(results);
  });

});

app.get('/checkproduct', (req, res) => {


  db.query(
    "SELECT *FROM cart WHERE product_id=? AND  customer_id=? AND date=CURDATE()",
    [req.query.pid, req.query.cid], (err, result) => {
      console.log(result.length);
      if (result.length == 0) {
        db.query("INSERT INTO `cart`(`customer_id`, `product_id`,`totalprice`, `quantity`,`date`) VALUES (?,?,?,1,NOW());", [req.query.cid, req.query.pid, req.query.price], (err, rest) => {
          res.send(rest);

        })
      }
    
    })

});
//Cart

app.get('/cartCount', (req, res) => {
  db.query('SELECT COUNT(cart_id) AS count FROM cart WHERE customer_id=? AND  date=CURDATE()',[req.query.customer_id]  ,(err, result, fields) => {
    if (!err)
      res.send(result);
    else
      console.log(err);
  })
})

app.get('/addtocart', (req, res) => {
  db.query("INSERT INTO `cart`(`customer_id`, `product_id`,`totalprice`, `quantity`,`date`) VALUES (?,?,?,1,NOW());", [req.query.cid, req.query.pid, req.query.price], (err, result) => {
    res.send(result);

  })

})
app.get('/getcart', (req, res) => {
  db.query("SELECT  cart.quantity,product_name,product_img,price,cart.customer_id,cart.totalprice,cart.product_id ,cart.totalprice FROM cart INNER JOIN products ON cart.product_id=products.product_id WHERE cart.customer_id=?  AND cart.date=CURDATE()", [req.query.customer_id], (err, result) => {
    res.send(result);


  })

})


app.get('/qut', (req, res) => {
  db.query("SELECT products.quantity AS pquty ,cart.quantity AS cquty,products.product_name FROM cart INNER JOIN products ON cart.product_id=products.product_id WHERE cart.product_id=?;", [req.query.pid], (err, results, fields) => {
    if (err) throw err;
    res.send(results);
  });
});

app.get('/Allproduct', (req, res) => {
  id = req.params.id;
  db.query("SELECT * FROM products WHERE product_id=?;", [req.query.id], (err, results, fields) => {
    if (err) throw err;
    res.send(results);

  });
});



app.get('/increasequantity', (req, res) => {

  db.query("UPDATE cart SET quantity = quantity +1 ,totalprice=?*quantity WHERE customer_id = ? AND product_id = ?;", [req.query.price, req.query.cid, req.query.pid], (err, result) => {
    res.send(result);

  })
});
app.get('/decreasequantity', (req, res) => {

  db.query("UPDATE cart SET quantity = quantity -1 ,totalprice= ?*quantity WHERE customer_id = ? AND product_id = ? ;", [req.query.price, req.query.cid, req.query.pid], (err, result) => {
    // console.log(result);
    res.send(result);

  })

})

app.get('/removeitem', (req, res) => {

  db.query("DELETE FROM cart WHERE customer_id = ? AND product_id =?;", [req.query.cid, req.query.pid], (err, result) => {
    res.send(result);

  })

})

app.get('/clearcart', (req, res) => {

  db.query("DELETE FROM cart WHERE customer_id = ?;", [req.query.cid], (err, result) => {
    res.send(result);


  })
});


app.get('/ordergift', (req, res) => {
  db.query("INSERT INTO orders(customer_id,total_price,advance_price,o_date,status,order_type) VALUES (?,?,0,NOW(),'Processing','gift');", [req.query.cid,req.query.price], (err, result) => {
    res.send(result);

  });
})


app.get('/orderproduct', (req, res) => {
  db.query("INSERT INTO orders(customer_id,total_price,advance_price,o_date,status,order_type) VALUES (?,?,?,NOW(),'Processing','online');", [req.query.cid, req.query.total, req.query.advance], (err, result) => {
    res.send(result);

  });
})


//order

app.get('/ordergift_id', (req, res) => {
  db.query("SELECT *  FROM orders WHERE customer_id=? ORDER BY order_id DESC LIMIT 1; ", [req.query.cid], (err, results, fields) => {
    if (err) throw err;
    res.send(results);
  });
})

app.get('/insertordergift', (req, res) => {
  db.query("INSERT INTO orderitem(order_id,product_id,quantity,total) VALUES (?,?,1,?);", [req.query.oid, req.query.pid,req.query.price], (err, result) => {
    res.send(result);

  });

});

app.get('/insertorderproduct', (req, res) => {
  db.query("INSERT INTO orderitem(order_id,product_id,quantity,total) VALUES (?,?,?,?);", [req.query.oid, req.query.pid, req.query.quty, req.query.total], (err, result) => {
    res.send(result);

  });

});
app.get('/getorderproduct', (req, res) => {
  db.query("SELECT order_id,product_name,orderitem.product_id,orderitem.quantity,price,orderitem.total FROM orderitem INNER JOIN  products ON orderitem.product_id=products.product_id WHERE order_id=? ; ", [req.query.oid], (err, results, fields) => {
    if (err) throw err;
    res.send(results);
  });
})

app.get('/insertgiftpayment', (req, res) => {
  db.query("INSERT INTO payment(payment_method,payment_status,order_id) VALUES ('free','free',?);", [req.query.oid], (err, result) => {
    res.send(result);

  });
})

app.get('/inventorygiftbalance', (req, res) => {
  

  db.query("UPDATE products SET quantity = quantity - 1  WHERE product_id = ? ;", [ req.query.pid], (err, result) => {
    res.send(result);

  })

});

app.get('/decreasepoint', (req, res) => {

  db.query("UPDATE customer SET points = points - ?  WHERE customer_id = ? ;", [req.query.price, req.query.cid], (err, result) => {
    res.send(result);

  })
});


app.get('/increasepoint', (req, res) => {

  db.query("UPDATE customer SET points = points + ?  WHERE customer_id = ? ;", [req.query.price, req.query.cid], (err, result) => {
    res.send(result);

  })
});


app.get('/insertpayment', (req, res) => {
  db.query("INSERT INTO payment(payment_method,payment_status,order_id) VALUES ('cash on delivery','Advance Paid',?);", [req.query.oid], (err, result) => {
    res.send(result);

  });
})

app.get('/insertfullpayment', (req, res) => {
  db.query("INSERT INTO payment(payment_method,payment_status,order_id) VALUES ('card','Paid',?);", [req.query.oid], (err, result) => {
    res.send(result);

  });
})

app.get('/inventorybalance', (req, res) => {

  db.query("UPDATE products SET quantity = quantity - ?  WHERE product_id = ? ;", [req.query.quty, req.query.pid], (err, result) => {
    res.send(result);

  })
});


app.get('/customercount', (req, res) => {
  db.query("SELECT count(email) AS custemail FROM customer WHERE email=?", [req.query.email], (err, results, fields) => {
    if (err) throw err;
    res.send(results);
  });

});



app.get('/Allcustomer', (req, res) => {
  db.query("SELECT * FROM customer ", (err, results, fields) => {
    if (err) throw err;
    res.send(results);
  });

});


const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, '../client/public')
  },
  filename(req, file, cb) {
    console.log(file)
    cb(null,
      `${file.originalname.split('.')[0]}.jpg`
    )
  }
})
const upload = multer({
  storage,
  limits: {
    fileSize: 5000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png)$/i)) {
      return cb(new Error('pleaseupload image with type of jpg ,png or jpeg'))
    }
    cb(undefined, true)
  }
})

app.post("/customization", (req, res) => {

  const image = req.body.image;
  const name = req.body.name;
  const description = req.body.description;
  const measurement = req.body.measurement;
  const color = req.body.color;
  const material = req.body.material;
  const customer_id = req.body.customer_id;
  console.log("custom" + customer_id);
  db.query(
    "INSERT INTO customized_products(description,color,product_name,measurement,material,design,status,customer_id,date) VALUES (?,?,?,?,?,?,'Pending',?,NOW())", [description, color, name, measurement, material, image, customer_id],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send({message:"Form submited Successfully!"})
        
      }
    }
  );



})

app.post("/imageUpload", upload.single('file'), (req, res) => {

})

app.get("/gift", (req, res) => {
  db.query("SELECT * FROM products WHERE category_id=6", (err, result) => {

    if (err) throw err;
    res.send(result);
  });


})


app.get('/customerorderlist', (req, res) => {

  db.query("SELECT *FROM orders WHERE customer_id = ? ORDER BY order_id  DESC;", [req.query.customer_id], (err, results, fields) => {
    if (err) throw err;
    res.send(results);
  });

});


//order History
app.get('/orderHistory', (req, res) => {
  console.log("nn"+req.query.order_id)
    db.query("SELECT orderitem.quantity,orderitem.product_id,products.product_img,orderitem.total,products.product_name FROM orderitem INNER JOIN products ON orderitem.product_id = products.product_id WHERE orderitem.order_id=?  ;", [req.query.order_id], (err, results, fields) => {
      if (err) throw err;
      res.send(results);
    });
  
  });

//Feedback

app.get("/feedback", (req, res) => {

 console.log(req.query.currentValue)
 console.log(req.query.discript)
  db.query(
    "UPDATE customer SET star=? , feedback=? WHERE customer_id=?", [req.query.currentValue, req.query.discript, req.query.cid],
    (err, result) => {
      if (err) {
        console.log(err)
      }
    }
  );
})

//Notification 

app.get('/CRcustorder', (req, res) => {
  db.query('SELECT COUNT(order_id) AS count FROM orders WHERE customer_id=? AND order_type="customized" AND Active=1', [req.query.customer_id], (err, result, fields) => {
    if (!err)
      res.send(result);
    else
      console.log(err);
  })
})

// app.get('/customerNoficationActive', (req, res) => {

//   db.query("UPDATE customized_products SET active=0 WHERE status ='Accept' OR status='Reject' AND active=1 AND customer_id=? ",[req.query.customer_id],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.send(result);
//       }
//     }
//   );
// });

app.get('/customerNofication', (req, res) => {
   db.query("SELECT * FROM orders INNER JOIN customized_products ON orders.customer_id=customized_products.customer_id WHERE order_type='customized' AND customized_products.status='Accept' AND orders.customer_id=? ORDER BY orders.order_id DESC",[req.query.customer_id], (err, results, fields) => {
    if (err) throw err;
    res.send(results);
    console.log(results);
  });
});

app.get('/customerNoficationRej', (req, res) => {
  db.query("SELECT * FROM  customized_products  WHERE status='Reject' AND customer_id=?",[req.query.customer_id], (err, results, fields) => {
    if (err) throw err;
    res.send(results);
    console.log(results);
  });
});

app.get('/deliverydate', (req, res) => {
  db.query("SELECT order_id,order_last_date FROM orders  WHERE customer_id=?  AND order_last_date<>'0000-00-00' AND status<>'Completed' ORDER BY order_last_date  DESC;", [req.query.customer_id], (err, results, fields) => {
    if (err) throw err;
    res.send(results);
  });
});

//notification count
app.get('/customerNoficationAcount', (req, res) => {
  db.query("SELECT COUNT(cus_product_id) AS acount FROM orders INNER JOIN customized_products ON orders.customer_id=customized_products.customer_id WHERE order_type='customized' AND customized_products.status='Accept' AND customized_products.c_active=1 AND orders.customer_id=? ORDER BY orders.order_id DESC",[req.query.customer_id], (err, results, fields) => {
   if (err) throw err;
   res.send(results);
   console.log(results);
 });
});



app.get('/customerNoficationRcount', (req, res) => {
  db.query("SELECT COUNT(cus_product_id) AS rcount FROM  customized_products  WHERE status='Reject' AND c_active=1 AND customer_id=?",[req.query.customer_id], (err, results, fields) => {
    if (err) throw err;
    res.send(results);
    console.log(results);
  });
});



app.get('/customerNoficationDcount', (req, res) => {
  db.query("SELECT COUNT(order_id) AS dcount  FROM orders  WHERE customer_id=? AND c_active=1 AND order_last_date<>'0000-00-00' AND status<>'Completed' ;", [req.query.customer_id], (err, results, fields) => {
    if (err) throw err;
    res.send(results);
    console.log(results)
  });
});

app.get('/deliverydateDeactive', (req,res) => {
  db.query("UPDATE orders SET c_active=0 WHERE customer_id=? AND c_active=1 AND order_last_date<>'0000-00-00' ",[req.query.customer_id] ,
  (err, result) => {
      if (err) {
          console.log(err);
      } else {
          res.send(result);
      }
     }
  );
});


app.get('/customerNoficationADeactive', (req,res) => {
  db.query("UPDATE customized_products SET c_active=0 WHERE customer_id=? AND c_active=1 AND status='Accept' ",[req.query.customer_id] ,
  (err, result) => {
      if (err) {
          console.log(err);
      } else {
          res.send(result);
      }
     }
  );
});

app.get('/customerNoficationRDeactive', (req,res) => {
  db.query("UPDATE customized_products SET c_active=0 WHERE customer_id=? AND c_active=1 AND status='Reject' ",[req.query.customer_id] ,
  (err, result) => {
      if (err) {
          console.log(err);
      } else {
          res.send(result);
      }
     }
  );
});

//endnotification count


app.get('/updatecuststatus', (req, res) => {

  db.query("UPDATE customized_products SET status='Complete' WHERE cus_product_id =?",[req.query.cuid],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
app.get('/confirmproduct', (req, res) => {
  console.log("cc"+req.query.cid)
  console.log("00"+req.query.oid)
  db.query("SELECT orders.order_id,products.product_id,products.price,orderitem.quantity,products.product_img,orders.o_date,orderitem.total,orders.total_price,orders.advance_price,orders.status,products.product_name  FROM orders Inner JOIN orderitem ON orders.order_id = orderitem.order_id INNER JOIN products ON orderitem.product_id = products.product_id WHERE orders.order_id=? AND orders.customer_id=? ;", [req.query.oid,req.query.cid], (err, results, fields) => {
    if (err) throw err;
    res.send(results);
    
  });
});

app.get('/increasecustquantity', (req, res) => {
  db.query("UPDATE orderitem SET quantity = quantity +1 ,total=?*quantity WHERE order_id = ? AND product_id = ? ;", [req.query.price, req.query.oid, req.query.pid], (err, result) => {
    res.send(result);

  })

});
app.get('/insertcustorder', (req, res) => {
  db.query("UPDATE orders SET total_price=? ,advance_price=? WHERE order_id = ? ;", [req.query.total_price, req.query.advance, req.query.oid], (err, result) => {
    res.send(result);
  })
});

app.get('/decreasecustquantity', (req, res) => {
  db.query("UPDATE orderitem SET quantity = quantity -1 ,total= ?*quantity WHERE order_id = ? AND product_id = ? ;", [req.query.price, req.query.oid, req.query.pid], (err, result) => {
    // console.log(result);
    res.send(result);

  })
});


//products

app.get('/chair', (req, res) => {
  db.query("SELECT * FROM products WHERE category_id=3 ;", (err, results, fields) => {
    if (err) throw err;
    res.send(results);
  });
});

app.get('/dining', (req, res) => {
  db.query("SELECT * FROM products WHERE category_id=1 ;", (err, results, fields) => {
    if (err) throw err;
    res.send(results);
  });
});

app.get('/table', (req, res) => {
  db.query("SELECT * FROM products WHERE category_id=2 ;", (err, results, fields) => {
    if (err) throw err;
    res.send(results);
  });
});

app.get('/sofa', (req, res) => {
  db.query("SELECT * FROM products WHERE category_id=4 ;", (err, results, fields) => {
    if (err) throw err;
    res.send(results);
  });
});

app.get('/bed', (req, res) => {
  db.query("SELECT * FROM products WHERE category_id=5 ;", (err, results, fields) => {
    if (err) throw err;
    res.send(results);
  });
});

app.get('/promotion', (req, res) => {
  db.query("SELECT * FROM products WHERE category_id=8 AND end_date >=CURRENT_TIMESTAMP ;", (err, results, fields) => {
    if (err) throw err;
    res.send(results);
  });
});


//profile

app.get('/profile', (req, res) => {

  db.query("SELECT * FROM customer WHERE customer_id=? ", [req.query.customer_id], (err, results, fields) => {
    if (err) throw err;
    res.send(results);
  });

});


app.put('/updatecustomerimage', (req, res) => {
  const id = req.body.customer_id;
  const name = req.body.fname;
  const email = req.body.email;
  const address = req.body.address;
  const phone_no = req.body.phone;
  const image = req.body.proimg;
  

  db.query("UPDATE customer SET fname = ?,  email=?,  address=?,phone=?,proimg=? WHERE customer_id = ?",
    [name, email, address, phone_no, image,id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.put('/updatecustomer', (req, res) => {
  const id = req.body.customer_id;
  const name = req.body.fname;
  const email = req.body.email;
  const address = req.body.address;
  const phone_no = req.body.phone;
  
  
  db.query("UPDATE customer SET fname = ?,  email=?,  address=?,phone=?  WHERE customer_id = ?",
    [name, email, address, phone_no,id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

  //Admin

  //Admin

  //Admin

  app.post('/addNewEmployee',(req,res)=>{
    
    const name = req.body.name;
    const NIC = req.body.NIC;
    const email = req.body.email;
    const phone_no = req.body.phone_no;
    const job_start_date = req.body.job_start_date;
    const confirm_password = req.body.confirm_password;
    const address = req.body.address;
    const role = req.body.role;
    const password = req.body.password;
  
   
    var transport = nodemailer.createTransport(
      {
          service:'gmail',
          auth: {
              user: 'eutfurniture.group45@gmail.com',
              pass:'eutgroup45@#'
          }
      }
  )
  const otp = Math.floor(100000 + Math.random() * 900000);
  const head = 'otp code';
  const mess = `Dear ${name}, 

                  Your otp code is ${otp}
                  Use this code to verify your Account.

              With regrads,
              Eut Furniture Team`;
  
  var mailOptions = {
      from : 'eutfurniture.group45@gmail.com',
      to: email,
      subject: head,
      text: mess
  }
  
  transport.sendMail(mailOptions,function(error,info){
      if(error){
          console.log(error)
      }
      else{
          console.log('Email sent' + info.response)
          bcrypt.hash(password,saltRounds,(err,hash)=>{
      
              if(err){
                  console.log(err);
              }

              const sqlAdd="INSERT INTO employee(name, NIC, email, phone_no, job_start_date,address, role,password) VALUES ( ?, ?, ?, ?, ?, ?,?, ?) ";
              const values =[name,NIC,email ,phone_no ,job_start_date,address,role,hash];
              db.query(sqlAdd,values,(err,result)=>{
       
      if(err){
        console.log(err)
      }else{
        const sqlUser="INSERT INTO userlogin(u_email, u_name, u_password,user_role,u_otp,u_verify) VALUES ( ?, ?, ?,?,?,'0') ";
              const valuesu =[email,name,hash,role,otp ];
              db.query(sqlUser,valuesu,(err,result)=>{
        res.send({message:"Email has been Sent"});
              })
      }
})

})

}
})    
});

//add Employee
app.post('/addNewEmployee1',(req,res)=>{
    
  const name = req.body.name;
  const NIC = req.body.NIC;
  const email = req.body.email;
  const phone_no = req.body.phone_no;
  const job_start_date = req.body.job_start_date;
  const confirm_password = req.body.confirm_password;
  const address = req.body.address;
  const role = req.body.role;
  const password = req.body.password;

 
  var transport = nodemailer.createTransport(
    {
        service:'gmail',
        auth: {
            user: 'eutfurniture.group45@gmail.com',
            pass:'eutgroup45@#'
        }
    }
)
const otp = Math.floor(100000 + Math.random() * 900000);
const head = 'otp code';
const mess = `Dear ${name}, 

                Your otp code is ${otp}
                Use this code to verify your Account.

            With regrads,
            Eut Furniture Team`;

var mailOptions = {
    from : 'eutfurniture.group45@gmail.com',
    to: email,
    subject: head,
    text: mess
}

transport.sendMail(mailOptions,function(error,info){
    if(error){
        console.log(error)
    }
    else{
        console.log('Email sent' + info.response)
        bcrypt.hash(password,saltRounds,(err,hash)=>{
    
            if(err){
                console.log(err);
            }

          
                db.query("INSERT INTO employee(name, NIC, email, phone_no, job_start_date,address, role,password) VALUES ( ?, ?, ?, ?, ?, ?,?, ?); INSERT INTO userlogin (u_email, u_name, u_password,user_role,u_otp,u_verify) VALUES (?, ?, ?,?,?,'0') ;", 
                [name,NIC,email ,phone_no ,job_start_date,address,role,hash,email,name,hash,role,otp],(err,result)=>{
     
    if(err){
      console.log(err)
    }else{
      
      res.send({message:"Email has been Sent"});
           
    }
})

})

}
})    
});





app.post('/AddCategory',(req,res)=>{
  console.log(req.body)
  const name = req.body.name;
  const date = req.body.date;
  
 
 
  db.query("INSERT INTO category (name,date) VALUES (?,NOW())",
  [name,date],(err,result)=>{
      if(err){
          console.log(err);
      } else{
          res.send("values inserted");
      }
  
  })
  
});

app.post('/AddCustomizedOrder',(req,res)=>{
 customer_id=req.body.customer_id;
  const total_payment = req.body.total_payment;
  const advanced_payment = req.body.advanced_payment;
  const delivery_date = req.body.delivery_date;
  
 
 
  db.query("INSERT INTO customized_products (delivery_date,total_payment,advanced_payment) VALUES (?,?,?) WHERE customer_id=?",
  [delivery_date,total_payment,advanced_payment,customer_id],(err,result)=>{
      if(err){
          console.log(err);
      } else{
          res.send("values inserted");
      }
  
  })
  
});

app.get('/Advancepaymentorderlist', (req, res) => {

  db.query("SELECT orders.order_id,orders.order_last_date,payment.payment_method,SUM(orders.total_price) AS total FROM payment INNER JOIN orders ON payment.order_id=orders.order_id WHERE payment.payment_status='Advance Paid' AND orders.status <> 'Processing' GROUP BY orders.order_id ORDER BY orders.order_id DESC", (err, results, fields) => {
    if (err) throw err;
    res.send(results);
  });

});

app.get('/paymentorderlist1', (req, res) => {

  db.query("SELECT orders.order_id,orders.order_last_date,payment.payment_method,SUM(orders.total_price) AS total FROM payment INNER JOIN orders ON payment.order_id=orders.order_id WHERE payment.payment_status='Paid'AND orders.status <> 'Processing' GROUP BY orders.order_id ORDER BY orders.order_id DESC", (err, results, fields) => {
    if (err) throw err;
    res.send(results);
  });

});

app.get('/PaymentNewReport1', (req, res) => {

  db.query("SELECT orders.order_id,orders.order_last_date,payment.payment_method,SUM(orders.total_price) AS total FROM payment INNER JOIN orders ON payment.order_id=orders.order_id WHERE payment.payment_status='Paid' AND (orders.order_last_date BETWEEN ? AND ?) GROUP BY orders.order_id",[req.query.from_date,req.query.to_date], (err, results, fields) => {
    if (err) throw err;
    res.send(results);
  });

});

app.get('/PaymentCategory1', (req, res) => {

  db.query("SELECT SUM(orders.total_price) AS total,payment.payment_method FROM payment INNER JOIN orders ON payment.order_id=orders.order_id WHERE orders.order_last_date BETWEEN ? AND ? GROUP BY payment.payment_method",[req.query.from_date,req.query.to_date], (err, results, fields) => {
    if (err) throw err;
    res.send(results);
  });

});


app.get('/payHistory', (req, res) => {

    db.query("SELECT orders.customer_id,orders.order_id,SUM(orders.total_price) AS total_price,payment.payment_method FROM orders INNER JOIN payment ON orders.order_id=payment.order_id  WHERE orders.customer_id=? AND payment.payment_status='Paid' GROUP BY orders.order_id ;", [req.query.customer_id], (err, results, fields) => {
      if (err) throw err;
      res.send(results);
    });
  
  });

  app.get('/advancepayHistory', (req, res) => {

    db.query("SELECT orders.customer_id,orders.order_id,SUM(orders.total_price) AS total_price,payment.payment_method FROM orders INNER JOIN payment ON orders.order_id=payment.order_id  WHERE orders.customer_id=? AND payment.payment_status='Advance Paid' GROUP BY orders.order_id ;", [req.query.customer_id], (err, results, fields) => {
      if (err) throw err;
      res.send(results);
    });
  
  });
  

app.get('/load',(req,res)=>{
    db.query('SELECT * FROM employee WHERE NOT role="admin" ',(err,result,fields)=>{
        if(!err)
        res.send(result);
        else
        console.log(err);
    })
})

app.get('/loadEmployee',(req,res)=>{
  db.query('SELECT name,role,emp_img FROM employee WHERE NOT role="admin" ',(err,result,fields)=>{
      if(!err)
      res.send(result);
      else
      console.log(err);
  })
})

app.get('/recentOrders1',(req,res)=>{
  db.query('SELECT products.product_name,products.product_img,orders.total_price FROM ((orderitem INNER JOIN products ON orderitem.product_id=products.product_id) INNER JOIN orders ON orderitem.order_id=orders.order_id) WHERE products.category_id <> 6 GROUP BY products.product_id ORDER BY orders.o_date DESC LIMIT 5',(err,result,fields)=>{
      if(!err)
      res.send(result);
      else
      console.log(err);
  })
})

app.get('/loadCategory',(req,res)=>{
  db.query('SELECT * FROM category ',(err,result,fields)=>{
      if(!err)
      res.send(result);
      else
      console.log(err);
  })
})

//Notification Count
app.get('/CustomizedOrderCount',(req,res)=>{
  db.query('SELECT COUNT(cus_product_id) AS count FROM customized_products WHERE status="Pending" AND active=1',(err,result,fields)=>{
      if(!err)
      res.send(result);
      else
      console.log(err);
  })
})

app.get('/loadcusorder',(req,res)=>{
  db.query('SELECT customer_id,date FROM customized_products WHERE active=1 ',(err,result,fields)=>{
      if(!err)
      res.send(result);
      else
      console.log(err);
  })
})

app.get('/loadProduct',(req,res)=>{
  db.query('SELECT * FROM products ORDER BY product_id DESC ;',(err,results,fields)=>{
     if(err) throw err;
     res.send(results);
  })
})

app.get('/loadGift',(req,res)=>{
  db.query('SELECT products.product_id,products.product_img,products.product_name,products.quantity,products.price FROM products INNER JOIN category ON products.category_id=category.category_id WHERE category.name="Gift" ORDER BY product_id DESC',(err,results,fields)=>{
     if(err) throw err;
     res.send(results);
  })
})

app.get('/loadCategoryType',(req,res)=>{
  db.query('SELECT category_id,name FROM category ;',(err,results,fields)=>{
     if(err) throw err;
     res.send(results);
  })
})


app.get('/loadCustomizedOrder',(req,res)=>{
  db.query("SELECT customer.fname,customized_products.cus_product_id,customized_products.product_name,customized_products.material,customized_products.color,customized_products.design FROM customized_products INNER JOIN customer ON customized_products.customer_id=customer.customer_id",(err,result,fields)=>{
    if(!err)
    res.send(result);
    else
    console.log(err);
  })
})

app.get('/loadPayment',(req,res)=>{
  db.query("SELECT payment.payment_id,payment.payment_method,payment.payment_status,customer.fname,orders.advance_price,orders.total_price,orders.order_id FROM ((orders INNER JOIN customer ON orders.customer_id=customer.customer_id) INNER JOIN payment ON orders.order_id=payment.order_id)",(err,result,fields)=>{
    if(!err)
    res.send(result);
    else
    console.log(err);
  })
})



app.get('/loadCustomer',(req,res)=>{
  db.query('SELECT customer_id, fname,email,address,phone,points,order_frequency,feedback,star FROM customer',(err,rows,fields)=>{
      if(!err)
      res.send(rows);
      else
      console.log(err);
  })
})

app.get("/employeesLoad/:id", (req, res) => {
    db.query("SELECT * FROM employee WHERE id=?", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

  app.get('/employees',(req,res) => {
    db.query('SELECT * FROM employee', (err, result) => {
        if(err) {
            console.log(err)
        }else {
            res.send(result);
        }
    });
});

//Customized orders
app.get('/Customized',(req,res) => {
  db.query('SELECT * FROM customized_products WHERE status="Pending" ORDER BY cus_product_id DESC', (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
      }
  });
});


  // app.put("/update", (req, res) => {
  //   const id = req.body.id;
   
  //   db.query(
  //     "UPDATE employee SET name = ?, NIC=?, email=?, role=?, address=?, job_start_date=?, phone_no=? WHERE id = ?",
  //     [name,NIC,email,role,address,job_start_date,phone_no],
  //     (err, result) => {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         res.send(result);
  //       }
  //     }
  //   );
  // });

  //delete 
  app.delete("/delete/:id",(req,res)=>{
    const id = req.params.id;
    const sqlDelete="DELETE FROM employee WHERE id=?";

    db.query(sqlDelete,id,(err,result)=>{
      if(err) console.log(err);
    });
  });

  //delete 
  app.delete("/deleteCustomized/:cus_product_id",(req,res)=>{
    const cus_product_id = req.params.cus_product_id;
    const sqlDelete="DELETE FROM employee WHERE cus_product_id=?";

    db.query(sqlDelete,id,(err,result)=>{
      if(err) console.log(err);
    });
  });

  app.get('/loadEmp/:id',(req,res)=>{
    const id = req.params.id;
    db.query('SELECT * FROM employee WHERE id=?',(err,result)=>{
      if(!err)
      res.send(result);
      else
      console.log(err);
    })
})

  app.delete("/deleteCategory/:category_id",(req,res)=>{
    const category_id = req.params.category_id;
    const sqlDelete="DELETE FROM category WHERE category_id=?";

    db.query(sqlDelete,category_id,(err,result)=>{
      if(err) console.log(err);
    
    });
  });

  //view details
  app.get("/view",(req,res)=>{
    id=req.params.id;
    db.query("SELECT * FROM employee WHERE id=?",[req.query.id],(err,result)=>{
      console.log(req.query.id);
      res.send(result);
    });
    
  });

//view product
app.get("/viewProduct",(req,res)=>{
  product_id=req.params.product_id;
  db.query("SELECT * FROM products WHERE product_id=?",[req.query.product_id],(err,result)=>{
    console.log(req.query.product_id);
    res.send(result);
  });
  
});

//view category
app.get("/viewCategory",(req,res)=>{
  category_id=req.params.category_id;
  db.query("SELECT * FROM category WHERE category_id=?",[req.query.category_id],(err,result)=>{
    console.log(req.query.category_id);
    res.send(result);
  });
  
});


//view customorder
app.get("/updateCustomized",(req,res)=>{
  customer_id=req.params.customer_id;
  db.query("SELECT * FROM customized_products WHERE customer_id=? AND active=1",[req.query.customer_id],(err,result)=>{
    console.log(req.query.customer_id);
    res.send(result);
  });
  
});



//view gift
app.get("/viewGift",(req,res)=>{
  product_id=req.params.product_id;
  db.query("SELECT product_id, product_name,quantity,price,product_img FROM products WHERE product_id=?",[req.query.product_id],(err,result)=>{
    console.log(req.query.ID);
    res.send(result);
  });
  
});

//view customized order
app.get("/ViewCusOrder1",(req,res)=>{
  cus_product_id=req.params.cus_product_id;
  
  db.query("SELECT customer.fname,customized_products.cus_product_id,customized_products.customer_id,customized_products.product_name,customized_products.description,customized_products.material,customized_products.color,customized_products.measurement,customized_products.design FROM customized_products INNER JOIN customer ON customized_products.customer_id=customer.customer_id WHERE customized_products.cus_product_id=?  ",[req.query.cus_product_id],(err,result)=>{
    // console.log(req.query.cus_product_id);
    res.send(result);
  });
  
});


//view customized order
app.get("/ViewCustomizedOrder1",(req,res)=>{
  cus_product_id=req.params.cus_product_id;
  
  db.query("SELECT customer.fname,customized_products.cus_product_id,customized_products.customer_id,customized_products.product_name,customized_products.description,customized_products.material,customized_products.color,customized_products.measurement,customized_products.design FROM customized_products INNER JOIN customer ON customized_products.customer_id=customer.customer_id WHERE customized_products.cus_product_id=?  ",[req.query.cus_product_id],(err,result)=>{
    // console.log(req.query.cus_product_id);
    res.send(result);
  });
  
});

app.get("/ViewCustomerOrder",(req,res)=>{
  customer_id=req.params.customer_id;
  // console.log(req.query.customer_id);
  db.query("SELECT * FROM customer WHERE customer_id=? ",[req.query.customer_id],(err,result)=>{
    
    res.send(result);
  });
  
});

//admin
app.get('/GetAdmin',(req,res) => {
  db.query('SELECT * FROM employee WHERE role="admin"', (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
      }
  });
});


//update
app.put("/update/:id",(req,res)=>{
  const id = req.params.id;
  const name = req.params.name;
  const sqlUpdate="UPDATE employee SET name=? WHERE id=?";

  db.query(sqlUpdate,[name,id],(err,result)=>{
    if(err) console.log(err);
  })
});

app.put('/updateEmployee/:id', (req,res) => {
  console.log(id);
  //const id = req.body.id;
  const name = req.body.name;
  const sqlUpdate = "UPDATE SET employee name=? WHERE id=?";

  db.query(sqlUpdate,[name,id],(err,result)=>{
    if(err) console.log(err);
  })
});

//show a single record
app.get("/viewEmp",(req,res)=>{
    db.query( "SELECT *FROM employee WHERE id=?",[req.params.id],(err,rows,fields)=>
   {
        if(!err)
        res.send(rows);
        else
        console.log(err);
   })
});


app.get('/edit/:id',(req, res) => {
  const id = req.params.userId;
  let sql = `Select * from employee where id = ${id}`;
  let query = connection.query(sql,(err, result) => {
      if(err) throw err;
      res.render('user_edit', {
          title : 'CRUD Operation using NodeJS / ExpressJS / MySQL',
          user : result[0]
      });
  });
});

app.post('/update',(req, res) => {
  const userId = req.body.id;
  let sql = "update employee SET name='"+req.body.name+"',  email='"+req.body.email+"',  phone_no='"+req.body.phone_no+"' where id ="+id;
  let query = connection.query(sql,(err, results) => {
    if(err) throw err;
    res.redirect('/');
  });
});







app.post('/addProducts',(req,res)=>{
  
  console.log(req.body)
const product_img =req.body.image;
const product_name = req.body.product_name;
const price = req.body.price;
const material = req.body.material;
const quantity = req.body.quantity;
const category_id=req.body.category_id;
const description=req.body.description;

db.query(
  "INSERT INTO products(product_name,price,product_img,material,quantity,category_id,description) VALUES (?,?,?,?,?,?,?)",[product_name,price,product_img,material,quantity,category_id,description],
  (err,result)=>{
    if(err){
      console.log(err)
    }else{
      res.send("Values added")
    }
  }
);
})

app.get('/addCustomizedProduct1',(req,res)=>{
  
 
const product_img =req.query.product_img;
const product_name = req.query.product_name;
const material = req.query.material;
const price=req.query.price;
const description=req.query.description;
const color=req.query.color;
// const quantity = 1;
// const category_id=7;


db.query(
  "INSERT INTO products(product_name,product_img,material,quantity,category_id,description,price,color) VALUES (?,?,?,1,7,?,?,?)",[product_name,product_img,material,description,price,color],
  (err,result)=>{
    if(err){
      console.log(err)
    }else{
      res.send(result);
    }
  }
);
})

app.get('/InsertCustomizedToOrderItem',(req,res)=>{

  db.query("INSERT INTO orderitem (order_id,product_id,total,quantity) VALUES(71,69,1000,1)",
    (err,result)=>{
      if(err){
        console.log(err)
      }else{
        res.send(result)
        console.log('success');
      
      }
    }
  ); 
 
  })


// app.post('/addGift',(req,res)=>{
  
//   console.log(req.body)
// const gift_img =req.body.image;
// const name = req.body.name;
// const price = req.body.price;
// const quantity = req.body.quantity;

// db.query(
//   "INSERT INTO gift(gift_img,name,price,quantity) VALUES (?,?,?,?)",[gift_img,name,price,quantity],
//   (err,result)=>{
//     if(err){
//       console.log(err)
//     }else{
//       res.send("Values added")
//     }
//   }
// );
// })

app.post('/addGift',(req,res)=>{
  
  console.log(req.body)
const product_img =req.body.image;
const product_name = req.body.product_name;
const price = req.body.price;
const quantity = req.body.quantity;
const category_id=req.body.category_id;

db.query(
  "INSERT INTO products(product_img,product_name,category_id,price,quantity) VALUES (?,?,?,?,?)",[product_img,product_name,category_id,price,quantity],
  (err,result)=>{
    if(err){
      console.log(err)
    }else{
      res.send("Values added")
    }
  }
);
})

//update category
app.put('/updateCategory', (req,res) => {
  const category_id=req.body.category_id;
  const name = req.body.name;
  const date = req.body.date;
  db.query("UPDATE category SET name = ?,date=? WHERE category_id = ?", 
  [name,date,category_id], 
  (err, result) => {
      if (err) {
          console.log(err);
      } else {
          res.send(result);
      }
     }
  );
});

//add customized order
app.get('/InsertCustomizedOrder1', (req,res) => {
  const customer_id=req.query.customer_id;
  const total = req.query.total;
  // console.log(req.query.advance);
  
  db.query("INSERT INTO orders(customer_id,o_date,advance_price,total_price,order_type,status) VALUES (?,NOW(),?,?,'customized','Processing')",[req.query.customer_id,total*(0.2),total], 
   
  (err, result) => {
      if (err) {
          console.log(err);
      } else {
          res.send(result);
          
      }
     }
  );
});


app.get('/getorder_id1',(req,res) =>{
 customer_id=req.params.customer_id;
  db.query("SELECT order_id,total_price FROM orders WHERE customer_id=? AND order_type='customized' ORDER BY order_id DESC LIMIT 1 ",[req.query.customer_id],(err,result)=>{
    
    res.send(result);
    console.log(result);
  });

 
})

app.get('/getproductid1',(req,res) =>{
  db.query("SELECT product_id FROM products WHERE category_id=7 ORDER BY product_id DESC LIMIT 1 ",(err,result)=>{
    
    res.send(result);
     console.log(result);
  });
});

//add customized order
app.get('/insertCustomizeditem1', (req,res) => {
 
 const order_id=req.params.order_id;
  const product_id=req.params.product_id;
  const total = req.params.total;
  db.query("INSERT INTO orderitem(order_id,product_id,quantity,total) VALUES (?,?,1,?)",[req.query.order_id,req.query.product_id,req.query.total_price], 
   
  (err, result) => {
      if (err) {
          console.log(err);
      } else {
          res.send(result);
      }
     }
  );
  // console.log(req.query.order_id);
  // console.log(req.query.product_id);
});

//Get Order ID
app.get('/Get_OrderID1',(req,res) =>{
  customer_id=req.params.customer_id;
   db.query("SELECT order_id FROM orders orders WHERE customer_id= ? AND order_type='customized' ORDER BY order_id DESC LIMIT 1 ",[req.query.customer_id],(err,result)=>{
     
     res.send(result);
     console.log(result);
   });
 
  
 })

 //Get PRoduct ID
 app.get('/Get_ProductID1',(req,res) =>{
  db.query("SELECT product_id FROM products WHERE category_id=7 ORDER BY product_id DESC LIMIT 1 ",(err,result)=>{
    
    res.send(result);
    
  });
  console.log(result);
});


// order status
app.get('/OrderStatus', (req,res) => {
  
  const cus_product_id=req.params.cus_product_id;
  
 
  db.query("UPDATE customized_products SET status='Confirm' WHERE cus_product_id = ?", 
  [req.query.cus_product_id], 
  (err, result) => {
      if (err) {
          console.log(err);
      } else {
          res.send(result);
      }
     }
  );
});

// order status
app.get('/OrderStatusReject', (req,res) => {
  
  const cus_product_id=req.params.cus_product_id;
  
 
  db.query("UPDATE customized_products SET status='Reject' WHERE cus_product_id = ?", 
  [req.query.cus_product_id], 
  (err, result) => {
      if (err) {
          console.log(err);
      } else {
          res.send(result);
      }
     }
  );
});

// order status
app.get('/OrderStatusAccept', (req,res) => {
  
  const cus_product_id=req.params.cus_product_id;
  
 
  db.query("UPDATE customized_products SET status='Accept' WHERE cus_product_id = ?", 
  [req.query.cus_product_id], 
  (err, result) => {
      if (err) {
          console.log(err);
      } else {
          res.send(result);
      }
     }
  );
});


// order active
app.get('/NoficationActive', (req,res) => {
  
  db.query("UPDATE customized_products SET active=0 WHERE status ='Pending' ", 
  (err, result) => {
      if (err) {
          console.log(err);
      } else {
          res.send(result);
      }
     }
  );
});

//DElete Customized order
app.put('/DeleteCustomizedOrder', (req,res) => {
  cus_product_id=req.params. cus_product_id;
  
  db.query("UPDATE customized_products SET active = 0 AND status='Reject' WHERE cus_product_id=?", 
  [req.query.cus_product_id], 
  (err, result) => {
    if(err) console.log(err);
     }
  );
  console.log(cus_product_id);
});


//update Gift
app.put('/updateGift', (req,res) => {
  const product_id=req.body.product_id;
  const  product_name = req.body. product_name;
  const price = req.body.price;
  const product_img = req.body.product_img;
  const quantity = req.body.quantity;
  db.query("UPDATE products SET  product_name = ?,price=?,product_img=?,quantity=? WHERE product_id = ?", 
  [ product_name,price,product_img,quantity,product_id], 
  (err, result) => {
      if (err) {
          console.log(err);
      } else {
          res.send(result);
      }
     }
  );
});

//update Gift
app.put('/updateProduct', (req,res) => {
  const product_id=req.body.product_id;
  const name = req.body.product_name;
  const price = req.body.price;
  const product_img = req.body.product_img;
  const quantity = req.body.quantity;
  const material = req.body.material;
  const category_id=req.body.category_id;
  db.query("UPDATE products SET product_name = ?,price=?,product_img=?,material=?,category_id=?,quantity=? WHERE product_id = ?", 
  [name,price,product_img,material,category_id,quantity,product_id], 
  (err, result) => {
      if (err) {
          console.log(err);
      } else {
          res.send(result);
      }
     }
  );
});

//update Profile
app.put('/updateProfile', (req,res) => {
  const id=req.body.id;
  const name = req.body.name;
  const email = req.body.email;
  const emp_img = req.body.emp_img;
  const phone_no = req.body.phone_no;
  const address = req.body.address;
 
  db.query("UPDATE employee SET name = ?,email=?,emp_img=?,phone_no=?,address=? WHERE role = 'admin'", 
  [name,email,emp_img,phone_no,address], 
  (err, result) => {
      if (err) {
          console.log(err);
      } else {
          res.send(result);
      }
     }
  );
});

//update Employee
app.put('/updateEmployee', (req,res) => {
  const id=req.body.id;
  const name = req.body.name;
 const role=req.body.role;
 const email=req.body.email;
 const address=req.body.address;
 const NIC=req.body.NIC;
 const phone_no=req.body.phone_no;
 
  db.query("UPDATE employee SET name = ?,role=?,email=?,address=?,NIC=?,phone_no=? WHERE id = ?", 
  [name,role,email,address,NIC,phone_no,id], 
  (err, result) => {
      if (err) {
          console.log(err);
      } else {
          res.send(result);
      }
     }
  );
});

app.get('/updateUserLogin',(req,res)=>{
  const email= req.body.email1;
  db.query("UPDATE userlogin SET u_name = ?,user_role=?,u_email=? WHERE u_email = ?", 
  [req.query.u_name,req.query.user_role,req.query.u_email,req.query.email1], 
  (err, result) => {
      if (err) {
          console.log(err);
      } else {
          res.send(result);
         
      }
     }
  );

})

//Charts
app.get('/CategoryNoChart',(req,res) => {
  db.query("SELECT SUM(products.quantity) AS quantity, category.name FROM products INNER JOIN category ON products.category_id=category.category_id WHERE category.name<> 'gift' AND category.name <> 'Promotion' GROUP BY products.category_id", (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
          // console.log(result);
          
      }
  });
});

//customized order pie chart
app.get('/Cus_OrderChart',(req,res) => {
  db.query('SELECT SUM(quantity) AS quantity, category_name FROM customized_products WHERE date BETWEEN ? AND ? GROUP BY category_name',[req.query.from_date,req.query.to_date], (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
          // console.log(result);
          
      }
  });
});

//customer analytics
//customized order pie chart
app.get('/CustomerCount1',(req,res) => {
  db.query('SELECT date, COUNT(customer_id) AS count FROM customer WHERE date BETWEEN ? AND ? GROUP BY date',[req.query.from_date,req.query.to_date], (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
          // console.log(result);
          
      }
  });
});

//return items
app.get('/ReturnCount1',(req,res) => {
  db.query('SELECT category.name,COUNT(return_item.return_id) AS count FROM ((orderitem INNER JOIN (orders INNER JOIN return_item ON orders.order_id=return_item.order_id) ON orderitem.order_id=orders.order_id) INNER JOIN (products INNER JOIN category ON products.category_id=category.category_id) ON orderitem.product_id=products.product_id) WHERE return_item.return_date BETWEEN ? AND ? GROUP BY (category.category_id)',[req.query.from_date,req.query.to_date], (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
          // console.log(result);
          
      }
  });
});

//Cus with Date
app.get('/CusWithDate',(req,res) => {
   const todate=req.body.to_date;
   const fromdate=req.body.from_date;

  db.query("SELECT customer_id,fname,address,phone FROM customer WHERE date BETWEEN ? AND ? ",[req.query.from_date,req.query.to_date], (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
        console.log(result);
          
      }
  });
});


//moving items
app.get('/MovingItems',(req,res) => {
  const currentmonth=req.body.month;
  db.query("SELECT SUM(orderitem.quantity) AS sum, category.name FROM ((orderitem INNER JOIN (products INNER JOIN category ON products.category_id=category.category_id) ON orderitem.product_id=products.product_id) INNER JOIN orders ON orderitem.order_id=orders.order_id) WHERE EXTRACT(MONTH FROM orders.o_date)=? AND NOT category.name='gift' AND NOT category.name='Promotion' AND NOT category.name='customized' GROUP BY category.category_id",[req.query.month], (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
          // console.log(result);
          
      }
  });
  console.log(req.query.month);
});

//Order Analytics
app.get('/OrderAnalyze',(req,res) => {
  db.query('SELECT o_date, COUNT(order_id) AS count FROM orders WHERE EXTRACT(MONTH FROM o_date) = MONTH(CURRENT_TIMESTAMP) GROUP BY o_date', (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
          // console.log(result);
          
      }
  });
});

//Max Analytics
app.get('/MaxItem',(req,res) => {
  const currentmonth=req.body.month;
  db.query("SELECT SUM(orderitem.quantity) AS sum, category.name FROM ((orderitem INNER JOIN (products INNER JOIN category ON products.category_id=category.category_id) ON orderitem.product_id=products.product_id) INNER JOIN orders ON orderitem.order_id=orders.order_id) WHERE EXTRACT(MONTH FROM orders.o_date)=? AND NOT category.name='gift' AND NOT category.name='Promotion' AND NOT category.name='customized' GROUP BY category.category_id ORDER BY sum DESC LIMIT 1",[req.query.month],(err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
          // console.log(result);
          
      }
  });
});

//Max Analytics
app.get('/MinItem',(req,res) => {
  db.query("SELECT SUM(orderitem.quantity) AS sum, category.name FROM ((orderitem INNER JOIN (products INNER JOIN category ON products.category_id=category.category_id) ON orderitem.product_id=products.product_id)INNER JOIN orders ON orderitem.order_id=orders.order_id) WHERE EXTRACT(MONTH FROM orders.o_date)=? AND NOT category.name='gift' AND NOT category.name='Promotion' AND NOT category.name='customized' GROUP BY category.category_id ORDER BY sum ASC LIMIT 1",[req.query.month], (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
          // console.log(result);
          
      }
  });
});

//OrderChart
app.get('/OrderChart',(req,res) => {
  db.query('SELECT orders.o_date, SUM(orderitem.quantity) AS count FROM orderitem INNER JOIN orders ON orderitem.order_id=orders.order_id WHERE orders.o_date BETWEEN ? AND ? GROUP BY orders.o_date',[req.query.from_date,req.query.to_date], (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
          // console.log(result);
          
      }
  });
});

//OrderChart
app.get('/ReturnItemReport1',(req,res) => {
  db.query('SELECT products.product_name,return_item.reason,return_item.return_id,return_item.return_date,return_item.reschedule_date,return_item.return_status FROM ((orderitem INNER JOIN (orders INNER JOIN return_item ON orders.order_id=return_item.order_id)ON orderitem.order_id=orders.order_id)INNER JOIN products ON orderitem.product_id=products.product_id) WHERE return_item.return_date BETWEEN ? AND ? ORDER BY orders.order_id ASC', [req.query.from_date,req.query.to_date],(err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
          // console.log(result);
          
      }
  });
});


//employeeCount
app.get('/EmployeeCount',(req,res) => {
  db.query('SELECT COUNT(id) AS count FROM employee', (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
          
      }
  });
});

//customerCount
app.get('/CustomerNumber',(req,res) => {
  db.query('SELECT COUNT(customer_id) AS count FROM customer', (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
         
      }
  });
});

//orderCount
app.get('/OrderCount',(req,res) => {
  db.query('SELECT COUNT(order_id) AS ordcount FROM orders WHERE EXTRACT(MONTH FROM o_date) = MONTH(CURRENT_TIMESTAMP)', (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
         
      }
  });
});

//productCount
app.get('/ProductCount',(req,res) => {
  db.query('SELECT COUNT(product_id) AS procount FROM products', (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
         
      }
  });
});

//categoryCount
app.get('/CategoryCount',(req,res) => {
  db.query('SELECT COUNT(category_id) AS catcount FROM category', (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
         
      }
  });
});

//
app.get('/CustomizedReport1',(req,res) => {
  db.query('SELECT customized_products.cus_product_id,customized_products.design,customized_products.product_name,customer.fname FROM customized_products INNER JOIN customer ON customized_products.customer_id=customer.customer_id WHERE customized_products.date BETWEEN ? AND ?', [req.query.from_date,req.query.to_date], (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
         
      }
  });
});

//returnCount
app.get('/ReturnItemCount',(req,res) => {
  db.query('SELECT COUNT(return_id) AS returncount FROM return_item', (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
         
      }
  });
});

//deliverCount
app.get('/DeliverCount',(req,res) => {
  db.query('SELECT COUNT(id) AS deliver_count FROM employee WHERE role="Delivery Person"', (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
         
      }
  });
});

//deliverCount
app.get('/DeliveryStatus1',(req,res) => {
  db.query('SELECT COUNT(status) AS count FROM orders WHERE status="Completed" AND orders.order_last_date BETWEEN ? AND ?',[req.query.from_date,req.query.to_date], (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
         
      }
  });
});

//OrderReport
app.get('/OrderReport1',(req,res) => {
  db.query('SELECT orders.order_id,products.product_name,orders.o_date,orderitem.quantity,orders.total_price FROM ((orderitem INNER JOIN orders ON orderitem.order_id=orders.order_id) INNER JOIN products ON orderitem.product_id=products.product_id) WHERE  products.category_id <> 6 AND orders.o_date BETWEEN ? AND ?',[req.query.from_date,req.query.to_date] ,(err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
         
      }
  });
});




//CustomerReport
app.get('/CustomerReport1',(req,res) => {
  db.query("SELECT customer_id, fname,email,address,phone,points,order_frequency,date FROM customer WHERE date BETWEEN ? AND ? ",[req.query.from_date,req.query.to_date], (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
         
      }
  });
});

//DeliveryReport
app.get('/DeliveryReport1',(req,res) => {
  db.query('SELECT products.product_name, orders.order_id,orders.order_last_date,orders.status FROM ((orderitem INNER JOIN orders ON orderitem.order_id=orders.order_id)INNER JOIN products ON orderitem.product_id=products.product_id) WHERE orders.order_last_date BETWEEN ? AND ? ORDER BY orders.order_id ASC ',[req.query.from_date,req.query.to_date], (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
         
      }
  });
});


//income
app.get('/TotalIncome',(req,res) => {
  db.query('SELECT Format(SUM(total_price),2) AS income FROM orders WHERE EXTRACT(MONTH FROM o_date) = MONTH(CURRENT_TIMESTAMP)', (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
         
      }
  });
});

//order analytics
app.get('/OrderByDate',(req,res) => {
 
  const currentmonth=req.body.month;
  db.query('SELECT products.name,customer.name AS cus_name,orders.o_date,orders.total_price FROM ((orders INNER JOIN products ON orders.product_id=products.product_id) INNER JOIN customer ON orders.customer_id=customer.customer_id WHERE orders.o_date BETWEEN )', (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
         
      }
  });
});

//order details
app.get("/OrderDetails",(req,res)=>{
  const month=req.body.month;
  db.query('SELECT products.product_name,customer.fname AS cus_name,orders.o_date,orders.total_price FROM ((orders INNER JOIN products ON orders.product_id=products.product_id) INNER JOIN customer ON orders.customer_id=customer.customer_id) WHERE EXTRACT(MONTH FROM orders.o_date) =?',[req.query.month],(err,result)=>{
    console.log(req.query.month);
    res.send(result);
  });
  
});

//view Admin
app.get("/viewAdmin",(req,res)=>{
  id=req.params.id;

  db.query("SELECT * FROM employee WHERE role='admin'",[req.query.id],(err,result)=>{
      console.log(req.query.id);
      res.send(result);
  });
      
});



  
  
  //Deliverymanager

  app.get("/viewdManager",(req,res)=>{
    id=req.params.id;
  
    db.query("SELECT * FROM employee WHERE role='Delivery Manager'",[req.query.id],(err,result)=>{
        console.log(req.query.id);
        res.send(result);
    });
        
  });


  app.post('/addDelivers',(req,res)=>{
    
    const fullname = req.body.fullname
    const NIC = req.body.NIC
    const email = req.body.email
    const address = req.body.address
    const mobile = req.body.mobile
    const password = req.body.password
    const cpassword = req.body.cpassword

    var transport = nodemailer.createTransport(
        {
            service:'gmail',
            auth: {
                user: 'eutfurniture.group45@gmail.com',
                pass:'eutgroup45@#'
            }
        }
    )
    const otp = Math.floor(100000 + Math.random() * 900000);
    const head = 'otp code';
    const mess = `Dear ${fullname}, 

                    Your otp code is ${otp}
                    Use this code to verify your Account.

                With regrads,
                Eut Furniture Team`;
    
    var mailOptions = {
        from : 'eutfurniture.group45@gmail.com',
        to: email,
        subject: head,
        text: mess
    }
    
    transport.sendMail(mailOptions,function(error,info){
        if(error){
            console.log(error)
        }
        else{
            console.log('Email sent' + info.response)
            bcrypt.hash(password,saltRounds,(err,hash)=>{
        
                if(err){
                    console.log(err);
                }
          
                db.query("INSERT INTO employee(name, NIC, email, phone_no, job_start_date, address, role) VALUES ( ?, ?, ?, ?,NOW(), ?,'Delivery Person'); INSERT INTO userlogin (u_email, u_name, u_password,user_role,u_otp,u_verify) VALUES (?,?,?,'Delivery Person',?,'0') ;", 
                [fullname,NIC,email ,mobile ,address,email,fullname,hash,otp],(err,result)=>{
                    if(err){
                        console.log(err)
                      }else{
                        console.log(result);
                        res.send({message:"Email has been Sent"});
                      }
                })
              
              })
            
        }
    })    
});

app.post('/otpCheck', (req, res) => {

    const email = req.body.email
    const otp = req.body.otp

    console.log(email)
    console.log(otp)
    db.query
    ("SELECT * FROM userlogin WHERE u_email = ? AND u_otp = ?;", 
    [email,otp], 
    (err, result)=> {

        if(err){
            res.send({err: err})
        }
        if(result){
            console.log(result);
            if (result.length > 0) {
                
                db.query("UPDATE userlogin SET u_verify=? WHERE u_email = ? AND u_otp = ?", 
                [1,email,otp], 
                (err, result) => {

                    if (err) {
                        console.log(err);
                    } else {
                        res.send({message:"OTP code verified Successfully"});
                    }
                }
                );
                
            }else{
                res.send({message:"Wrong otp code"});
            }

            
        }}
    );
});


app.post('/forget',(req,res)=>{
    const email = req.body.email
    console.log(email)
    db.query
    ("SELECT * FROM userlogin WHERE u_email = ?;", 
    [email], 
    (err, result)=> {

        if(err){
            res.send({err: err})
        }
        if(result){
            if (result.length > 0) {
                var transport = nodemailer.createTransport(
                    {
                        service:'gmail',
                        auth: {
                            user: 'eutfurniture.group45@gmail.com',
                            pass:'eutgroup45@#'
                        }
                    }
                )
                const otp = Math.floor(100000 + Math.random() * 900000);
                const head = 'Forget Password'
                const mess = `Dear User, 
            
                Use this OTP code for Reset Your Password.
                Your OTP code is ${otp}
                
            
                With regrads,
                Eut Furniture Team`;
                
                var mailOptions = {
                    from : 'eutfurniture.group45@gmail.com',
                    to: email,
                    subject: head,
                    text: mess
                }
                
                transport.sendMail(mailOptions,function(error,info){
                    if(error){
                        console.log(error)
                    }
                    else{
                        console.log('Email sent' + info.response)       
                
                        db.query("UPDATE userlogin SET reset_otp = ? WHERE u_email=?", 
                        [otp,email],(err,result)=>{
                 
                     
                        if(result){
                            console.log(result);
                            res.send({message:"Check your Email to Reset Password"}); 
                        }
                     })
                    }
                })
                
            }else{
                res.send({message:"Email Doesn't Exist"});
            }

            
        }}
    );
      
});



app.post('/ResetPassword', (req,res) => {

    const otp = req.body.otp;
    const password = req.body.password;
    const c_password = req.body.c_password;
    console.log(password)
    console.log(c_password)
    console.log(otp)

    db.query
    ("SELECT * FROM userlogin WHERE reset_otp = ?;", 
    [otp], 
    (err, result)=> {

        if(err){
            res.send({err: err})
        }
        if(result){
            console.log(result);
            if (result.length > 0) {
                bcrypt.hash(password,saltRounds,(err,hash)=>{

                    if(err){
                        console.log(err);
                    }

                db.query("UPDATE userlogin SET u_password=? WHERE reset_otp=?", 
                [hash,otp], 
                (err, result) => {

                    if (err) {
                        console.log(err);
                    } else {
                        
                        res.send({message:"Password Updated Successfully"});
                    }
                }
                )
                });
            }}
  });
});

{/*
    customer
    
    app.post('/addDelivers',(req,res)=>{
    
    const fullname = req.body.fullname
    const NIC = req.body.NIC
    const email = req.body.email
    
    const address = req.body.address
    const mobile = req.body.mobile
    const password = req.body.password
    const cpassword = req.body.cpassword
   
    bcrypt.hash(password,saltRounds,(err,hash)=>{
        
      if(err){
          console.log(err);
      }

      db.query("INSERT INTO customer (c_name, c_nic, c_email, c_phone_no, c_date,c_address, c_password, c_c_password) VALUES ( ?, ?, ?, ?,NOW(), ?, ?, ?); INSERT INTO userlogin (u_email,u_password,user_role) VALUES (?,?,'Customer') ;", 
      [fullname,NIC,email,mobile,address,hash,hash,email,hash],(err,result)=>{
       
            console.log(err);
       if(result){
         res.send({message:"Successfully added"});
       }
      })
    
    })
    
});

*/}


app.get("/delivers", (req, res) => {
    db.query("SELECT * FROM employee WHERE role='Delivery Person' ", (err, result, fields) => {
        if (err) {
            console.log(err);
        } else{
            res.send(result);
        }
    });
});

app.get("/orderstatus", (req, res) => {
    db.query("SELECT DISTINCT status FROM orders WHERE NOT status ='Processing'", (err, result, fields) => {
        if (err) {
            console.log(err);
        } else{
            res.send(result);
        }
    });
});

app.get("/paymentstatus", (req, res) => {
    db.query("SELECT DISTINCT payment_status  FROM payment", (err, result, fields) => {
        if (err) {
            console.log(err);
        } else{
            res.send(result);
        }
    });
});

app.get("/delivername", (req, res) => {
    db.query("SELECT name FROM employee WHERE role='Delivery Person'", (err, result, fields) => {
        if (err) {
            console.log(err);
        } else{
            res.send(result);
        }
    });
});

app.get("/deliverid", (req, res) => {
    db.query("SELECT id,name FROM employee WHERE role='Delivery Person'", (err, result, fields) => {
        if (err) {
            console.log(err);
        } else{
            res.send(result);
        }
    });
});

app.get("/delivery", (req, res) => {
    db.query("SELECT orders.order_id,orders.employee_id,orders.order_last_date, orders.status,customer.fname,customer.address,payment.payment_method FROM orders INNER JOIN customer ON orders.customer_id=customer.customer_id INNER JOIN payment ON payment.order_id=orders.order_id WHERE (orders.status <> 'Processing' AND orders.status <> 'Finished') ORDER BY orders.order_id DESC;", (err, result, fields) => {
        if (err) {
            console.log(err);
        } else{
            res.send(result);
        }
    });
});

app.get("/deliverys", (req, res) => {
    db.query("SELECT orders.order_id,orders.employee_id,orders.order_last_date, orders.status,customer.fname,customer.address FROM orders INNER JOIN customer ON orders.customer_id=customer.customer_id WHERE  (orders.status='Completed' OR  orders.status='Returned')  AND EXTRACT(MONTH FROM order_last_date) = MONTH(CURRENT_TIMESTAMP) AND orders.employee_id <>'0' ORDER BY orders.order_id DESC LIMIT 8", (err, result, fields) => {
        if (err) {
            console.log(err);
        } else{
            res.send(result);
        }
    });
});

app.get("/Assign", (req, res) => {
    db.query("SELECT orders.order_id,orders.employee_id,orders.order_last_date,customer.address FROM orders INNER JOIN customer ON orders.customer_id=customer.customer_id WHERE orders.employee_id=0 AND orders.status='Ready to deliver'", (err, result, fields) => {
        if (err) {
            console.log(err);
        } else{
            res.send(result);
        }
    });
});

app.get("/viewStatus", (req, res) => {
    db.query("SELECT employee.id,employee.name,employee.address AS e_address,customer.address,orders.order_last_date,COUNT(orders.status) AS pending FROM employee INNER JOIN orders ON orders.employee_id=employee.id INNER JOIN customer ON customer.customer_id=orders.customer_id WHERE (orders.status='Pending' OR orders.status='R_Pending') GROUP BY employee_id ORDER BY employee.id;", (err, result, fields) => {
        if (err) {
            console.log(err);
        } else{
            res.send(result);
        }
    });
});

app.get("/getPriority", (req, res) => {
    db.query("SELECT orders.employee_id,orders.order_id,orders.order_last_date,orders.status,orders.o_priority FROM orders WHERE orders.status='Pending' OR orders.status='R_Pending' ORDER BY employee_id  ", (err, result, fields) => {
        if (err) {
            console.log(err);
        } else{
            res.send(result);
        }
    });
});

app.get("/viewReturn", (req, res) => {
    db.query("SELECT order_id,employee_id,return_date,reason,reschedule_date,return_status FROM return_item ORDER BY order_id DESC", (err, result, fields) => {
        if (err) {
            console.log(err);
        } else{
            res.send(result);
        }
    });
});

app.get("/cashOnDelivery", (req, res) => {
    db.query("SELECT orders.order_id,orders.employee_id,orders.total_price,orders.advance_price,payment.payment_status,orders.status FROM orders INNER JOIN payment ON orders.order_id=payment.order_id WHERE payment.payment_method='cash on delivery' AND orders.employee_id <> '0' ORDER BY orders.order_id DESC", (err, result, fields) => {
        if (err) {
            console.log(err);
        } else{
            res.send(result);
        }
    });
});

app.get("/totalcashOnDelivery", (req, res) => {
    db.query("SELECT FORMAT(SUM(orders.total_price - orders.advance_price),2) AS total,orders.order_last_date FROM orders INNER JOIN payment ON orders.order_id = payment.order_id WHERE (payment.payment_method = 'cash on delivery') AND EXTRACT(MONTH FROM order_last_date) = MONTH(CURRENT_TIMESTAMP)", (err, result, fields) => {
        if (err) {
            console.log(err);
        } else{
            res.send(result);
        }
    });
});


app.delete("/deleteDeliver/:email",(req,res)=>{
    const email = req.params.email;

    console.log(email)
    db.query("DELETE FROM employee WHERE email=?; DELETE FROM userlogin WHERE u_email = ? AND user_role='Delivery Person';",
    [email,email],(err,result)=>{
      if(err) {
          console.log(err);
          
      }
    });
  });




    app.get("/viewDeliver",(req,res)=>{
        id=req.params.id;
        db.query("SELECT * FROM employee WHERE id=?",[req.query.id],(err,result)=>{
          console.log(req.query.id);
          res.send(result);
        });
        
      });

app.get("/viewDeliveryDetails",(req,res)=>{
    order_id=req.params.order_id;
    
    db.query("SELECT orders.order_id,orders.employee_id,orders.order_last_date,orders.order_type,orders.status,orders.o_date,customer.fname,customer.address,customer.email,customer.phone FROM orders INNER JOIN customer ON orders.customer_id=customer.customer_id WHERE orders.order_id=?",[req.query.order_id],(err,result)=>{
        console.log(req.query.order_id);
        res.send(result);
    });
        
});

app.get("/viewReturnDetails",(req,res)=>{
    order_id=req.params.order_id;
    db.query("SELECT order_id,employee_id,return_date,reason,return_status FROM return_item WHERE order_id=?",[req.query.order_id],(err,result)=>{
        console.log(req.query.order_id);
        res.send(result);
    });
        
});

app.get("/viewPriorityDetails",(req,res)=>{
    order_id=req.params.order_id;
    db.query("SELECT orders.order_id,orders.o_priority FROM orders WHERE orders.order_id=?",[req.query.order_id],(err,result)=>{
        console.log(req.query.order_id);
        res.send(result);
    });
        
});

app.get("/viewDeliveryManager",(req,res)=>{
    id=req.params.id;

    db.query("SELECT * FROM employee WHERE role='Delivery Manager'",[req.query.id],(err,result)=>{
        console.log(req.query.id);
        res.send(result);
    });
        
});


app.get("/CashOnDeliveryDetails",(req,res)=>{
    order_id=req.params.order_id;
    db.query("SELECT orders.order_id,orders.employee_id,orders.order_last_date,orders.customer_id,orders.total_price,orders.advance_price,payment.payment_status,orders.status FROM orders INNER JOIN payment ON orders.order_id=payment.order_id WHERE orders.order_id=?",[req.query.order_id],(err,result)=>{
        console.log(req.query.order_id);
        res.send(result);
    });
        
});

app.put('/updateDeliveryStatus', (req,res) => {
    const order_id=req.body.order_id;
    const status = req.body.status;
    const Deliver_id= req.body.Deliver_id;

    db.query("UPDATE orders SET status=?, employee_id=? WHERE order_id = ?", 
    [status,Deliver_id,order_id], 
    (err, result) => {

        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
       }
    );
  });

  app.put('/AssignDeliver', (req,res) => {
    const order_id=req.body.order_id;
    const Deliver_id= req.body.Deliver_id;
    

    db.query("UPDATE orders SET  employee_id=?, status='Pending'  WHERE order_id = ?", 
    [Deliver_id,order_id], 
    (err, result) => {

        if (err) {
            console.log(err);
        } else {
            res.send(result);
            
        }
       }
    );
  });

  app.put('/AssignPriority', (req,res) => {
    const order_id=req.body.order_id;
    const Priority_number= req.body.Priority_number;
    

    db.query("UPDATE orders SET o_priority=?  WHERE order_id = ? ; UPDATE return_item SET o_priority=? WHERE order_id=?;", 
    [Priority_number,order_id,Priority_number,order_id], 
    (err, result) => {

        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
       }
    );
  });

  app.put('/ReturnSchedule', (req,res) => {
    const order_id=req.body.order_id;
    const Schedule_date= req.body.Schedule_date;

    db.query("UPDATE return_item SET reschedule_date=?,return_status='R_Pending' WHERE order_id=?; UPDATE orders SET order_last_date=?,status='R_Pending' WHERE order_id=?", 
    [Schedule_date,order_id,Schedule_date,order_id], 
    (err, result) => {

        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
       }
    );
  });

  app.put('/updateCashStatus', (req,res) => {
    const order_id=req.body.order_id;
    const status = req.body.status;
    const Payment= req.body.Payment;

    db.query("UPDATE payment SET payment_status=? WHERE order_id = ?; UPDATE orders SET status=? WHERE order_id = ?", 
    [Payment,order_id,status,order_id], 
    (err, result) => {

        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
       }
    );
  });



  app.put('/updateReturnStatus', (req,res) => {
    const order_id=req.body.order_id;
    const status = req.body.status;

    db.query("UPDATE orders SET status=? WHERE order_id = ?; UPDATE return_item SET return_status=? WHERE order_id=?", 
    [status,order_id,status,order_id], 
    (err, result) => {

        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
       }
    );
  });

  app.put('/UpdateDelivers', (req,res) => {
    const id=req.body.id;
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const address = req.body.address;

    db.query("UPDATE employee SET name=?,email=?,phone_no=?,address=? WHERE id = ?; ", 
    [name,email,phone,address,id], 
    (err, result) => {

        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
       }
    );
  });


  app.put('/EditDeliveryManager', (req,res) => {
    const id=req.body.id;
    const name = req.body.name;
    const email = req.body.email;
    const emp_img = req.body.emp_img;
    const phone = req.body.phone;
    const address = req.body.address;
   
    db.query("UPDATE employee SET name = ?,email=?,emp_img=?,phone_no=?,address=? WHERE id=?; ", 
    [name,email,emp_img,phone,address,id], 
    (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
            
        }
       }
    );
  });
  //UPDATE userlogin SET u_name,u_email WHERE u_email=?

  app.get("/viewDeliverySchedule", (req, res) => {
    db.query("SELECT order_id, employee_id, o_date, order_last_date FROM orders WHERE (order_last_date <> 0 AND employee_id <> 0 AND status <> 'Completed' AND status <> 'Finished')  ORDER BY order_last_date DESC", (err, result, fields) => {
        if (err) {
            console.log(err);
        } else{
            res.send(result);
        }
    });
});

app.get("/orderstatuscount", (req, res) => {
    db.query("SELECT COUNT(order_id) AS count,status FROM orders WHERE (status <> 'Processing' AND status <> 'Finished')  AND  orders.order_last_date BETWEEN ? AND ? GROUP BY status ORDER BY status", 
    [req.query.from_date,req.query.to_date],
    (err, result, fields) => {
        if (err) {
            console.log(err);
        } else{
            res.send(result);
            console.log(result);
        }
    });
});

app.get("/totalordercnt", (req, res) => {
    db.query("SELECT COUNT(orders.order_id) AS t_count  FROM orders WHERE orders.order_last_date BETWEEN ? AND ?",
    [req.query.from_date,req.query.to_date],
     (err, result, fields) => {
        if (err) {
            console.log(err);
        } else{
            res.send(result);
            console.log(result);
        }
    });
});

app.get("/returnordercnt", (req, res) => {
    db.query("SELECT COUNT(orders.order_id) AS r_count FROM orders INNER JOIN return_item ON orders.order_id = return_item.order_id WHERE return_item.return_date BETWEEN ? AND ?;",
    [req.query.from_date,req.query.to_date],
     (err, result, fields) => {
        if (err) {
            console.log(err);
        } else{
            res.send(result);
            console.log(result);
        }
    });
});

app.get("/ordervsdate", (req, res) => {
    db.query("SELECT COUNT(order_id) AS count,order_last_date FROM orders  WHERE status <> 'Finished' AND order_last_date BETWEEN ? AND ? GROUP BY order_last_date",
    [req.query.from_date,req.query.to_date],
     (err, result, fields) => {
        if (err) {
            console.log(err);
        } else{
            res.send(result);
            console.log(result);
        }
    });
});

app.get("/pricevsdate", (req, res) => {
    db.query("SELECT orders.order_last_date,SUM(orders.total_price - orders.advance_price) AS total FROM orders INNER JOIN payment ON orders.order_id = payment.order_id WHERE payment.payment_method = 'cash on delivery' AND  EXTRACT(MONTH FROM order_last_date) = MONTH(CURRENT_TIMESTAMP) GROUP BY order_last_date;", 
    
    (err, result, fields) => {
        if (err) {
            console.log(err);
        } else{
            res.send(result);
            console.log(result);
        }
    });
});
  
app.get("/paymentdonut", (req, res) => {
    db.query("SELECT COUNT(payment.order_id) AS count,payment.payment_status,orders.order_last_date FROM payment INNER JOIN orders ON payment.order_id = orders.order_id WHERE payment_method='cash on delivery' AND  orders.order_last_date BETWEEN ? AND ? GROUP BY payment_status",
    [req.query.from_date,req.query.to_date],
     (err, result, fields) => {
        if (err) {
            console.log(err);
        } else{
            res.send(result);
            console.log(result);
        }
    });
});

app.get("/delivervsorder", (req, res) => {
    db.query("SELECT employee.name,COUNT(orders.order_id) AS count FROM employee LEFT JOIN orders ON employee.id=orders.employee_id WHERE employee.role = 'Delivery Person'  AND orders.order_last_date BETWEEN ? AND ? GROUP BY employee.name", 
    [req.query.from_date,req.query.to_date],
    (err, result, fields) => {
        if (err) {
            console.log(err);
        } else{
            res.send(result);
            console.log(result);
        }
    });
});

//image add 



//Notifications
app.get('/cashPaymentnotifyCount',(req,res)=>{
    db.query('SELECT COUNT(order_id) AS count FROM payment WHERE payment_method="cash on delivery" AND active=1',(err,result,fields)=>{
        if(!err)
        res.send(result);
        else
        console.log(err);
    })
  })

    //cash payment set deactive
app.get('/cashpaymentnotifyDeactive', (req,res) => {
    db.query("UPDATE payment SET active=0 WHERE payment_method ='cash on delivery' AND active=1", 
    (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
       }
    );
  });

  app.get('/paymentnotifymess',(req,res)=>{
    db.query('SELECT COUNT(order_id) AS count FROM payment WHERE payment_status="Advance Paid" AND pBill_image <>" "',(err,result,fields)=>{
        if(!err)
        res.send(result);
        else
        console.log(err);
    })
  })

  app.get('/returnnotifyCount',(req,res)=>{
    db.query('SELECT COUNT(order_id) AS r_count FROM orders WHERE status="R_Pending" AND active=1',(err,result,fields)=>{
        if(!err)
        res.send(result);
        else
        console.log(err);
    })
  })

  app.get('/returnnotifyDeactive', (req,res) => {
    db.query("UPDATE orders SET active=0 WHERE status ='R_Pending' AND active=1", 
    (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
       }
    );
  });

  app.get('/returnnotifymess',(req,res)=>{
    db.query('SELECT COUNT(order_id) AS r_count FROM orders WHERE status="R_Pending" AND Bill_image <>" "',(err,result,fields)=>{
        if(!err)
        res.send(result);
        else
        console.log(err);
    })
  })

  app.get('/ordernotifyCount',(req,res)=>{
    db.query('SELECT COUNT(order_id) AS o_count FROM orders WHERE status="Pending" AND active=1',(err,result,fields)=>{
        if(!err)
        res.send(result);
        else
        console.log(err);
    })
  })

  app.get('/ordernotifyDeactive', (req,res) => {
    db.query("UPDATE orders SET active=0 WHERE status ='Pending' AND active=1", 
    (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
       }
    );
  });

  app.get('/ordernotifymess',(req,res)=>{
    db.query('SELECT COUNT(order_id) AS o_count FROM orders WHERE status="Pending" AND Bill_image <>" "',(err,result,fields)=>{
        if(!err)
        res.send(result);
        else
        console.log(err);
    })
  })

  app.get("/viewpaymentNotification", (req, res) => {
    db.query("SELECT orders.order_id,orders.employee_id,orders.order_last_date, customer.fname,customer.nic,payment.pBill_image FROM orders INNER JOIN customer ON orders.customer_id=customer.customer_id INNER JOIN payment ON payment.order_id=orders.order_id WHERE (orders.status='Pending'  OR orders.status='R_Pending') AND payment.payment_status='Advance Paid' AND pBill_image<>'';", (err, result, fields) => {
        if (err) {
            console.log(err);
        } else{
            res.send(result);
        }
    });
});

   app.get("/viewreturnNotification", (req, res) => {
     db.query("SELECT orders.order_id,orders.employee_id,orders.order_last_date,payment.payment_method,payment.payment_status, customer.fname,customer.nic,orders.Bill_image FROM orders INNER JOIN customer ON orders.customer_id=customer.customer_id INNER JOIN payment ON payment.order_id=orders.order_id WHERE orders.status='R_Pending'  AND Bill_image<>'';", (err, result, fields) => {
         if (err) {
             console.log(err);
         } else{
           res.send(result);
         }
     });
 });

 app.get("/vieworderNotification", (req, res) => {
    db.query("SELECT orders.order_id,orders.employee_id,orders.order_last_date, customer.fname,customer.nic, payment.payment_method,payment.payment_status, orders.Bill_image FROM orders INNER JOIN customer ON orders.customer_id=customer.customer_id INNER JOIN payment ON payment.order_id=orders.order_id WHERE orders.status='Pending'  AND Bill_image<>'';", (err, result, fields) => {
        if (err) {
            console.log(err);
        } else{
          res.send(result);
        }
    });
});

app.get("/deliveryReport", (req, res) => {
    db.query("SELECT orders.order_id,orders.employee_id,orders.order_last_date, orders.status,customer.fname,customer.address,payment.payment_method FROM orders INNER JOIN customer ON orders.customer_id=customer.customer_id INNER JOIN payment ON payment.order_id=orders.order_id WHERE (orders.status='Ready to deliver' OR orders.status='Completed' OR orders.status='Returned' OR orders.status='Pending' OR orders.status='R_Pending') AND orders.order_last_date BETWEEN ? AND ?;",
    [req.query.from_date,req.query.to_date],
    (err, result, fields) => {
        if (err) {
            console.log(err);
        } else{
            res.send(result);
        }
    });
});

app.get("/CashOnDeliveryReport", (req, res) => {
    db.query("SELECT payment.order_id,payment.payment_status, orders.order_last_date,orders.total_price,orders.advance_price,customer.fname FROM orders INNER JOIN payment ON payment.order_id=orders.order_id INNER JOIN customer ON orders.customer_id = customer.customer_id WHERE payment.payment_method='cash on delivery' AND orders.order_last_date BETWEEN ? AND ? ORDER BY orders.order_id ASC", 
    [req.query.from_date,req.query.to_date],
    (err, result, fields) => {
        if (err) {
            console.log(err);
        } else{
            console.log(result)
            res.send(result);
        }
    });
});

app.get("/ReturnReport", (req, res) => {
    db.query("SELECT order_id, return_date,reason, return_status FROM return_item WHERE return_date BETWEEN ? AND ? ORDER BY order_id ASC", 
    [req.query.from_date,req.query.to_date],
    (err, result, fields) => {
        if (err) {
            console.log(err);
        } else{
            console.log(result)
            res.send(result);
        }
    });
});

app.get("/DeliverReport", (req, res) => {
    db.query("SELECT employee.name,COUNT(orders.order_id) AS count FROM employee LEFT JOIN orders ON employee.id=orders.employee_id WHERE employee.role = 'Delivery Person'  AND orders.order_last_date BETWEEN ? AND ? GROUP BY employee.id",
    [req.query.from_date,req.query.to_date],
     (err, result, fields) => {
        if (err) {
            console.log(err);
        } else{
            res.send(result);
            console.log(result);
        }
    });
});
  

//DeliveryPerson

app.get('/create', (req, res) => {
  console.log(req.body.employee_id);

  const order_id = req.query.order_id;
  const product_id = req.query.product_id;
  const return_date = req.query.return_date;
  let return_status= req.query.return_status;
  const reason = req.query.reason;


  db.query("INSERT INTO return_item ( order_id, product_id, employee_id, return_date, return_status, reason) VALUES (?,?,?,?,?,?) " ,
   [ order_id, product_id,req.query.employee_id, return_date, return_status='Returned', reason],
    (err,result) => {
        if(err){
        console.log(err)
        }else {
            res.send(result)
        }
   });
});

app.get('/create_return', (req,res) => {

  db.query("UPDATE orders SET status='Returned' WHERE order_id=?",
  [req.query.order_id], (err, result) => {
      if (err) {
          console.log(err)
      } else{
          res.send("Values Inserted")
      }
    }
  );
  })


// VIEW RETURN ITEMS
app.get('/returnItem',(req, res) =>{
db.query(" SELECT * FROM return_item WHERE employee_id=?  ", [req.query.employee_id],(err, results)=>
 { 
 console.log(req.query.employee_id);
  res.send(results);
 })
 
})

//  EMPLOYEE SESSION 
app.get('/employee', (req, res) => {
  db.query("SELECT * FROM employee WHERE email=?",[req.query.email], (err, results, fields) => {
     if(err) throw err;
     res.send(results);
   });
  
 });

  
      //VIEW DELIVERY DETAILS
      app.get("/DeliveryDetails",(req,res)=>{
        order_id=req.params.order_id;
        db.query("SELECT *  FROM orders  INNER JOIN customer ON orders.customer_id=customer.customer_id  JOIN orderitem ON orders.order_id = orderitem.order_id  JOIN payment ON payment.order_id= orders.order_id WHERE orders.order_id=?  ",[req.query.order_id],(err,result)=>{
            console.log(req.query.order_id);
            res.send(result);
        });
            
})



       // VIEW  DELIVERY TO CONFIRM
      
app.get('/viewConfirmDelivery',(req, res) =>{
   db.query("SELECT *  FROM orders  JOIN employee ON orders.employee_id = employee.id  WHERE orders.employee_id = ? AND orders.status <> 'Completed'  ", [req.query.employee_id],(err, results)=>
    { 
    console.log(req.query.employee_id);
     res.send(results);
    })
    
})


app.get('/dpprofile', (req, res) => {
       
      db.query("SELECT * FROM employee WHERE id=? ",[req.query.id], (err, results, fields) => {
         if(err) throw err;
         res.send(results);
       });
     
});

     //       VIEW RETURN ITEM DETAILS
app.get("/ReturnedDetails",(req,res)=>{
      order_id=req.params.order_id;
      db.query("SELECT order_id, employee_id,return_date,reason,product_id FROM return_item WHERE order_id=?",[req.query.order_id],(err,result)=>{
          console.log(req.query.order_id);
          res.send(result);
      });
          
  });


app.put('/confirmdelivery/:order_id', (req,res) => {

  const order_id = req.params.order_id;
  const Bill_image =  req.body.Bill_image;
  let active =  req.body.active;
  const sqlUpdates = "UPDATE orders SET Bill_image=?, active=? WHERE order_id=? ";

  db.query(sqlUpdates,[Bill_image, active=1, order_id],(err,result)=>{
    if(err) console.log(err);
  })
});

app.put('/confirmcashondelivery/:payment_id', (req,res) => {

  const payment_id = req.params.payment_id;
  const pBill_image =  req.body.pBill_image;
  let active =  req.body.active;

  console.log(pBill_image)
  const sqlUpdates = "UPDATE payment SET pBill_image=?, active =?  WHERE  payment_id=? ";

  db.query(sqlUpdates,[pBill_image, active=1, payment_id],(err,result)=>{
    if(err) console.log(err);
  })
});

   // VIEW CASH ON  DELIVERY TO CHANGE PAYMENT_STATUS
app.get('/ConfirmCashonFetch', (req, res) => {
      db.query("SELECT * FROM payment  WHERE  payment_id =? ",[req.query.payment_id], (err, results, fields) => {
         if(err) throw err;
         res.send(results);
       });
      
     });

app.get('/ConfirmDeliveryFetch', (req, res) => {
      db.query("SELECT  * FROM orders WHERE order_id=?",[req.query.order_id], (err, results, fields) => {
         if(err) throw err;
         res.send(results);
       });
      
     });


app.put('/updateEmployeeProfile', (req,res) => {
      const id=req.body.id;
      const name = req.body.name;
      const address=req.body.address;
      const emp_img =  req.body.emp_img;
      const phone_no=req.body.phone_no;
  
db.query("UPDATE employee SET name=?,address=?, emp_img=?, phone_no=?  WHERE id = ?", 
        [name,address,emp_img,phone_no,id], 
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
           }
        );
});


app.get('/ReturnItemview', (req, res) => {
  db.query("SELECT * FROM return_item WHERE order_id=?",[req.query.order_id], (err, results, fields) => {
     if(err) throw err;
     res.send(results);
   });
  
 });

     
        // VIEW AVAILABLE DELIVERIES
app.get('/viewAvailableDelivery',(req, res) =>{
 db.query("  SELECT orders.order_id,customer.fname, customer.address, customer.phone FROM orders  JOIN customer ON orders.customer_id=customer.customer_id JOIN employee ON orders.employee_id=employee.id  WHERE orders.employee_id=? AND orders.status <> 'Completed' AND orders.status <> 'Finished' ", [req.query.employee_id],(err, results)=>
           { 
           console.log(req.query.employee_id);
            res.send(results);
           })
           
})

// VIEW CASH ON DELIVERIES TO CONFIRM
app.get('/viewcashOnDelivery',(req, res) =>{
db.query("   SELECT *  FROM  payment  JOIN orders ON  payment.order_id = orders.order_id WHERE orders.employee_id=? AND payment.payment_method='cash on delivery' AND orders.status <> 'completed' AND orders.status <> 'Finished' ", [req.query.employee_id],(err, results)=>
 { 
 console.log(req.query.employee_id);
  res.send(results);
 })
 
})
         // VIEW  DELIVERY TO CONFIRM
      
      
app.get('/viewConfirmDelivery',(req, res) =>{
   db.query("SELECT *  FROM orders  JOIN employee ON orders.employee_id = employee.id  WHERE orders.employee_id = ? AND orders.status <> 'Completed' AND orders.status <> 'Finished' ", [req.query.employee_id],(err, results)=>
    { 
    console.log(req.query.employee_id);
     res.send(results);
    })
    
})


    
        //VIEW PRODUCT DETAILS FOR DELIVERY PERSON
app.get("/viewproductFordeliver", (req, res) => {
          db.query("SELECT * FROM products  ", (err, result, fields) => {
              if (err) {
                  console.log(err);
              } else{
                  res.send(result);
              }
          });
      });






  //CASH ON INCOME FOR AN EMPLOYEE
app.get('/empTotalcashonIncome', (req, res) => {
db.query("SELECT FORMAT(SUM(total_price-advance_price),2) AS eincome FROM orders JOIN payment ON orders.order_id= payment.order_id WHERE  orders.employee_id=?  AND payment.payment_method = 'cash on delivery' AND orders.status <> 'completed' ", [req.query.employee_id], (err, result, fields) => {
  if (!err)
    res.send(result);
  else
    console.log(err);
})
})

app.get('/deliveryCount', (req, res) => {
  db.query("SELECT COUNT(order_id) AS freecount FROM orders WHERE employee_id=?  AND orders.status <> 'completed' AND orders.status <> 'Finished' ", [req.query.employee_id], (err, result, fields) => {
    if (!err)
      res.send(result);
    else
      console.log(err);
  })
  })



app.get('/empRecentOrders',(req, res) =>{
    db.query(" SELECT  orderitem.product_id,products.product_name, orders.total_price, orders.order_last_date  FROM orderitem INNER JOIN orders ON orders.order_id = orderitem.order_id   JOIN products ON orderitem.product_id = products.product_id WHERE orders.employee_id=? AND orders.status='Completed' ORDER BY orders.order_last_date DESC LIMIT 5  ", [req.query.employee_id],(err, results)=>
     { 
     console.log(req.query.employee_id);
      res.send(results);
     })
     
  })
  
app.get('/empCountReturnItems', (req, res) => {
      db.query('SELECT COUNT(return_id) AS returncount FROM return_item WHERE employee_id=?', [req.query.employee_id], (err, result, fields) => {
        if (!err)
          res.send(result);
        else
          console.log(err);
      })
    })

    app.get('/cashonCount', (req, res) => {
      db.query("SELECT COUNT(payment.order_id) AS cashcount FROM orders  JOIN payment ON orders.order_id=payment.order_id WHERE employee_id=?  AND orders.status <> 'completed' AND payment.payment_method ='cash on delivery' ", [req.query.employee_id], (err, result, fields) => {
        if (!err)
          res.send(result);
        else
          console.log(err);
      })
      })

      //UPDATE RETURN ITEMS
app.put('/updateReturn/:order_id', (req,res) => {

  const order_id = req.params.order_id;
  const product_id = req.body.product_id;
  const return_date = req.body.return_date;
  const reason = req.body.reason;
  const sqlUpdate = "UPDATE   return_item   SET product_id=?, return_date=?, reason=? WHERE order_id = ?";

  db.query(sqlUpdate,[product_id, return_date,reason,order_id],(err,result)=>{
    if(err) console.log(err);
  })
});
//Sales Manager

//Notify

//Sales Manager

//Notify


//Sales Manager

//Notify

app.get("/sales_cashOnDelivery", (req, res) => {
  db.query("SELECT orders.order_id,orders.employee_id,orders.total_price,orders.advance_price,payment.payment_status,payment.payment_method, orders.status FROM orders INNER JOIN payment ON orders.order_id=payment.order_id GROUP BY orders.order_id ORDER BY orders.order_id DESC", (err, result, fields) => {
      if (err) {
          console.log(err);
      } else{
          res.send(result);
      }
  });
});

app.get("/sales_PaymentDetails",(req,res)=>{
  order_id=req.params.order_id;
  db.query("SELECT orders.order_id,orders.employee_id,orders.o_date,orders.order_last_date,orders.customer_id,orders.total_price,orders.advance_price,payment.payment_status, payment.payment_method,orders.status FROM orders INNER JOIN payment ON orders.order_id=payment.order_id WHERE orders.order_id=?",[req.query.order_id],(err,result)=>{
      console.log(req.query.order_id);
      res.send(result);
  });
      
});
  



app.get('/sales_ordernotifyCount',(req,res)=>{
  db.query('SELECT COUNT(order_id) AS o_count FROM orders WHERE order_last_date="0000-00-00" ',(err,result,fields)=>{
      if(!err)
      res.send(result);
      else
      console.log(err);
  })
})



app.get('/sales_ordernotifyDeactive', (req,res) => {
  db.query("UPDATE orders SET active=0 WHERE status ='Pending' AND active=1", 
  (err, result) => {
      if (err) {
          console.log(err);
      } else {
          res.send(result);
      }
     }
  );
});

app.get('/sales_ordernotifymess',(req,res)=>{
  db.query('SELECT COUNT(order_id) AS o_count FROM orders WHERE order_last_date="0000-00-00" ',(err,result,fields)=>{
      if(!err)
      res.send(result);
      else
      console.log(err);
  })
})

 
app.get("/sales_vieworderNotification", (req, res) => {
  db.query("SELECT order_id, customer_id, o_date, order_description, status, order_last_date FROM orders WHERE order_last_date='0000-00-00'  ;", (err, result, fields) => {
      if (err) {
          console.log(err);
      } else{
        res.send(result);
      }
  });
});

app.get('/sales_orders2',(req,res) => {
  db.query('SELECT * FROM orders WHERE order_id=(SELECT MAX(order_id) FROM orders', (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
      }
  });
});
//Orders

// app.get('/sales_loadOrders',(req,res)=>{
//   db.query('SELECT orders.order_id, orderitem.quantity,DATE_FORMAT(orders.o_date,"%d-%m-%y") AS o_date,DATE_FORMAT(orders.order_last_date,"%d-%m-%y") AS order_last_date,orders.status,orderitem.total,orders.customer_id FROM orders INNER JOIN orderitem ON orders.order_id = orderitem.order_id ORDER BY orders.order_id  DESC;', (err, results, fields) => {
//       if(err) throw err;
//       res.send(results);
//     });
// })

app.get('/sales_loadOrders',(req,res)=>{
  db.query('SELECT orders.order_id, orders.total_price, orderitem.quantity, DATE_FORMAT(orders.o_date,"%d-%m-%y") AS o_date,DATE_FORMAT(orders.order_last_date,"%d-%m-%y") AS order_last_date,orders.status,orders.customer_id, orders.order_type FROM orders INNER JOIN orderitem ON orders.order_id = orderitem.order_id GROUP BY orders.order_id ORDER BY orders.order_id  DESC;', (err, results, fields) => {
      if(err) throw err;
      res.send(results);
    });
})



app.get('/sales_loadOrders2',(req,res) => {
  db.query('SELECT order_id FROM orders WHERE order_id=(SELECT MAX(order_id) FROM orders)', (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
      }
  });
});

app.get('/sales_loadOrders3',(req,res) => {
  db.query('SELECT total_price FROM orders WHERE order_id=(SELECT MAX(order_id) FROM orders)', (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
      }
  });
});


app.get('/sales_loadOrders4',(req,res) => {
  db.query('SELECT SUM(total) AS total_price FROM orderitem  WHERE order_id=(SELECT MAX(order_id) FROM orderitem)', (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
      }
  });
});


app.get('/sales_employeeDetail',(req,res) => {
  db.query('SELECT * FROM orders', (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
      }
  });
});

app.get('/sales_viewOrder',(req,res)=>{
  order_id=req.params.order_id;
  db.query("SELECT * FROM orders WHERE order_id=?",[req.query.order_id],(err,result)=>{
    console.log(req.query.order_id);
    res.send(result);
  });
  
});

app.put('/sales_updateOrderDate', (req,res) => {
  const order_id=req.body.order_id;
  const order_last_date=req.body.order_last_date;
  db.query("UPDATE orders SET order_last_date=?, status='Ready to deliver' WHERE order_id = ?", 
  [order_last_date,order_id], 
  (err, result) => {
      if (err) {
          console.log(err);
      } else {
          res.send(result);
      }
     }
  );
});

//Promotions

app.post("/sales_customization",(req,res)=> {
   
  const product_img=req.body.product_img;
  const product_name=req.body.product_name;
  const quantity=req.body.quantity;
  const price=req.body.price;
  const description=req.body.description;
  const start_date=req.body.start_date;
  const end_date=req.body.end_date;
  const material=req.body.material; 
  
    db.query(
      "INSERT INTO products(description,price, start_date,end_date,product_name, quantity, material,product_img,category_id) VALUES (?,?,?,?,?,?,?,?,'8')",[description,price, start_date, end_date,product_name,quantity,material,product_img],
      (err,result) =>{
          if(err){
              console.log(err)
          }else{
              res.send("values sended");
          }
      }
      );
  
      
    
  })


//Payments

app.get('/sales_pposts',(req,res)=>{
  db.query('SELECT orders.order_id,orders.total_price,payment.payment_id,payment.payment_status,payment.payment_method FROM orders INNER JOIN payment ON orders.order_id = payment.order_id ORDER BY orders.order_id  DESC;',
  (err,results,fields)=>{
      if(err) throw err;
      res.send(results);
  });
});

//ManageCustomer

app.get('/sales_load',(req,res)=>{
  db.query('SELECT * FROM customer',(err,result,fields)=>{
      if(!err)
      res.send(result);
      else
      console.log(err);
  })
})

app.get('/sales_employees',(req,res) => {
  db.query('SELECT * FROM customer', (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
      }
  });
});

app.get('/sales_view',(req,res)=>{
  customer_id=req.params.customer_id;
  db.query("SELECT * FROM customer WHERE customer_id=?",[req.query.customer_id],(err,result)=>{
    console.log(req.query.customer_id);
    res.send(result);
  });
  
});

app.put('/sales_updateEmployee', (req,res) => {
  const customer_id=req.body.customer_id;
  const fname = req.body.fname;
  const email=req.body.email;
  const address=req.body.address;
  const phone=req.body.phone;
  db.query("UPDATE customer SET fname = ?, email=?, address=?, phone=? WHERE customer_id = ?", 
  [fname,email,address,phone,customer_id], 
  (err, result) => {
      if (err) {
          console.log(err);
      } else {
          res.send(result);
      }
     }
  );
});

//AddCustomer and AddOrder

app.post('/sales_create', (req,res) => {
  const id = req.body.id;
  const email = req.body.email;
  const fname = req.body.fname;
  const phone = req.body.phone;
  const address = req.body.address;
  const nic = req.body.nic;

  db.query('INSERT INTO customer (email, phone,nic, address, fname, date) VALUES (?,?,?,?,?, NOW())', 
  [email, phone, nic, address, fname], (err, result) => {
      if (err) {
          console.log(err)
      } else{
          res.send("Values Inserted")
      }
    }
  );
});



app.post('/sales_create_order', (req,res) => {
  const customer_id = req.body.customer_id;
  const o_date = req.body.o_date;
  const order_last_date = req.body.order_last_date;
 // const order_description = req.body.order_description;
  //const status = req.body.status;
  const order_advance_price = req.body.advance_price;
  const order_type = req.body.order_type;
  //const total_price = req.body.total_price;
 

  db.query('INSERT INTO orders(customer_id, o_date, order_last_date, advance_price, order_type) VALUES (?,NOW(),NOW(),"0", "Showroom")',
  [customer_id, o_date, order_last_date, ], (err, result) => {
      if (err) {
          console.log(err)
      } else{
          res.send("Values Inserted")
      }
    }
  );
});

app.post('/sales_create_orderitem', (req,res) => {
const order_id = req.body.order_id;
const product_id = req.body.product_id;
const quantity = req.body.quantity;
const total = req.body.quantity*req.body.price;
// const o_date = req.body.o_date;
// const order_last_date = req.body.order_last_date;
// const order_description = req.body.order_description;



db.query('INSERT INTO orderitem(order_id, product_id, quantity, total) VALUES (?,?,?,?);',
[order_id, product_id, quantity, total], (err, result) => {
    if (err) {
        console.log(err)
    } else{
        res.send("Values Inserted")
    }
  }
);
});


// app.post('/sales_create_payment', (req,res) => {

// const payment_method = req.body.payment_method;
// const payment_status = req.body.payment_status;
// const order_id = req.body.order_id;
// const total_price = req.body.total_price;

// db.query('INSERT INTO payment(payment_method, payment_status, order_id ) VALUES (?,?,?); UPDATE orders SET total_price = ? WHERE order_id=(SELECT MAX(order_id) FROM orders)  ',
// [payment_method, payment_status, order_id, total_price], (err, result) => {
//     if (err) {
//         console.log(err)
//     } else{
//         res.send("Values Inserted")
//     }
//   }
// );
// });

app.post('/sales_create_payment', (req,res) => {

  const payment_method = req.body.payment_method;
  const payment_status = req.body.payment_status;
  const order_id = req.body.order_id;
  
  db.query('INSERT INTO payment(payment_method, payment_status, order_id ) VALUES (?,?,?); ',
  [payment_method, payment_status, order_id], (err, result) => {
      if (err) {
          console.log(err)
      } else{
          res.send("Values Inserted")
      }
    }
  );
  })

app.put('/sales_create_payment2', (req,res) => {

  const total_price = req.body.total_price;
  const status = req.body.status;
  
  db.query('UPDATE orders SET total_price = ?, status = ? WHERE order_id=(SELECT MAX(order_id) FROM orders)',
  [total_price, status], (err, result) => {
      if (err) {
          console.log(err)
      } else{
          res.send("Values Inserted")
      }
    }
  );
  })



//Report

//Order Analytics
app.get('/sales_OrderAnalyze',(req,res) => {
  db.query('SELECT EXTRACT(MONTH FROM o_date) AS month, COUNT(order_id) AS count FROM orders GROUP BY month', (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
          // console.log(result);
          
      }
  });
});

//return items
app.get('/sales_ReturnCount',(req,res) => {
  db.query('SELECT category.name,COUNT(return_item.return_id) AS count FROM ((orderitem INNER JOIN (orders INNER JOIN return_item ON orders.order_id=return_item.order_id) ON orderitem.order_id=orders.order_id) INNER JOIN (products INNER JOIN category ON products.category_id=category.category_id) ON orderitem.product_id=products.product_id) WHERE EXTRACT(MONTH FROM return_item.return_date) = MONTH(CURRENT_TIMESTAMP) GROUP BY (category.category_id)', (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
          // console.log(result);
          
      }
  });
});

//moving items
app.get('/sales_MovingItems',(req,res) => {
  const currentmonth=req.body.month;
  db.query('SELECT SUM(orderitem.quantity) AS count, category.name FROM ((orderitem INNER JOIN (products INNER JOIN category ON products.category_id=category.category_id) ON orderitem.product_id=products.product_id)INNER JOIN orders ON orderitem.order_id=orders.order_id) WHERE EXTRACT(MONTH FROM orders.o_date)=? AND category.name NOT IN("Gift","customized products") GROUP BY products.category_id',[req.query.month], (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
          // console.log(result);
          
      }
  });
});

//customized order pie chart
app.get('/sales_Cus_OrderChart',(req,res) => {
  db.query('SELECT SUM(quantity) AS quantity, category_name FROM customized_products GROUP BY category_name', (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
          // console.log(result);
          
      }
  });
});

app.get('/sales_CategoryNoChart',(req,res) => {
  db.query('SELECT SUM(products.quantity) AS quantity, category.name FROM products INNER JOIN category ON products.category_id=category.category_id GROUP BY products.category_id', (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
          // console.log(result);
          
      }
  });
});


app.get('/sales_CustomerCount',(req,res) => {
  db.query('SELECT date, COUNT(customer_id) AS count FROM customer WHERE MONTH(date) = MONTH(CURRENT_TIMESTAMP) GROUP BY date', (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
          // console.log(result);
          
      }
  });
});

//OrderChart
// app.get('/sales_OrderChart',(req,res) => {
//   db.query('SELECT orders.o_date, SUM(orderitem.quantity) AS count FROM orderitem INNER JOIN orders ON orderitem.order_id=orders.order_id GROUP BY orders.o_date ;', (err, result) => {
//       if(err) {
//           console.log(err)
//       }else {
//           res.send(result);
//           // console.log(result);
          
//       }
//   });
// });

app.get('/sales_OrderChart',(req,res) => {
  db.query('SELECT orders.o_date, SUM(orderitem.quantity) AS count FROM orderitem INNER JOIN orders ON orderitem.order_id=orders.order_id WHERE MONTH(o_date)=MONTH(CURRENT_TIMESTAMP) GROUP BY orders.o_date ;', (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
          // console.log(result);
          
      }
  });
});

//OrderChart
app.get('/sales_ReturnItemReport',(req,res) => {
  db.query('SELECT products.product_name,return_item.reason,return_item.return_id,return_item.return_date,return_item.reschedule_date,return_item.return_status FROM ((orderitem INNER JOIN (orders INNER JOIN return_item ON orders.order_id=return_item.order_id)ON orderitem.order_id=orders.order_id)INNER JOIN products ON orderitem.product_id=products.product_id) WHERE EXTRACT(MONTH FROM return_date) = MONTH(CURRENT_TIMESTAMP)', (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
          // console.log(result);
          
      }
  });
});


//employeeCount
app.get('/sales_EmployeeCount',(req,res) => {
  db.query('SELECT COUNT(id) AS count FROM employee', (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
          
      }
  });
});

//customerCount
app.get('/sales_CustomerNumber',(req,res) => {
  db.query('SELECT COUNT(customer_id) AS count FROM customer', (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
         
      }
  });
});

//orderCount
app.get('/sales_OrderCount',(req,res) => {
  db.query('SELECT COUNT(order_id) AS ordcount FROM orders WHERE EXTRACT(MONTH FROM o_date) = MONTH(CURRENT_TIMESTAMP)', (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
         
      }
  });
});

//productCount
app.get('/sales_ProductCount',(req,res) => {
  db.query('SELECT COUNT(product_id) AS procount FROM products', (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
         
      }
  });
});

//categoryCount
app.get('/sales_CategoryCount',(req,res) => {
  db.query('SELECT COUNT(category_id) AS catcount FROM category', (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
         
      }
  });
});

//
app.get('/sales_CustomizedReport',(req,res) => {
  db.query('SELECT customized_products.cus_product_id,customized_products.design,customized_products.product_name,customer.fname FROM customized_products INNER JOIN customer ON customized_products.customer_id=customer.customer_id', (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
         
      }
  });
});

//returnCount
app.get('/sales_ReturnItemCount',(req,res) => {
  db.query('SELECT COUNT(return_id) AS returncount FROM return_item', (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
         
      }
  });
});

//deliverCount
app.get('/sales_DeliverCount',(req,res) => {
  db.query('SELECT COUNT(id) AS deliver_count FROM employee WHERE role="Delivery Person"', (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
         
      }
  });
});

//deliverCount
app.get('/sales_DeliveryStatus',(req,res) => {
  db.query('SELECT COUNT(status) AS count FROM orders WHERE status="Completed"', (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
         
      }
  });
});

//OrderReport
app.get('/sales_OrderReport',(req,res) => {
  db.query('SELECT orders.order_id,products.product_name,orders.o_date,orderitem.quantity,orders.total_price FROM ((orderitem INNER JOIN orders ON orderitem.order_id=orders.order_id) INNER JOIN products ON orderitem.product_id=products.product_id) WHERE EXTRACT(MONTH FROM o_date) = MONTH(CURRENT_TIMESTAMP)', (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
         
      }
  });
});

//CustomerReport
app.get('/sales_CustomerReport',(req,res) => {
  db.query('SELECT customer_id, fname,lname,email,address,phone,points,order_frequency,date FROM customer WHERE EXTRACT(MONTH FROM date) = MONTH(CURRENT_TIMESTAMP)', (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
         
      }
  });
});




//income
app.get('/sales_TotalIncome',(req,res) => {
  db.query('SELECT SUM(total_price) AS income FROM orders WHERE EXTRACT(MONTH FROM o_date) = MONTH(CURRENT_TIMESTAMP)', (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
         
      }
  });
});

//order analytics
app.get('/sales_OrderByDate',(req,res) => {
 
  const currentmonth=req.body.month;
  db.query('SELECT products.name,customer.name AS cus_name,orders.o_date,orders.total_price FROM ((orders INNER JOIN products ON orders.product_id=products.product_id) INNER JOIN customer ON orders.customer_id=customer.customer_id WHERE orders.o_date BETWEEN )', (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
         
      }
  });
});

app.get("/sales_OrderItemDetails",(req,res)=>{
  order_id=req.params.order_id;
  db.query("SELECT orderitem.order_id,orderitem.product_id,orderitem.quantity,orderitem.total, products.product_id, products.product_img FROM orderitem INNER JOIN products ON orderitem.product_id=products.product_id WHERE order_id=?",[req.query.order_id],(err,result)=>{
      console.log(req.query.order_id);
      res.send(result);
  });
      
})

app.get('/sales_loadOrdersDashboard',(req,res)=>{
  db.query('SELECT orders.order_id, orders.total_price, orderitem.quantity, DATE_FORMAT(orders.o_date,"%d-%m-%y") AS o_date,DATE_FORMAT(orders.order_last_date,"%d-%m-%y") AS order_last_date,orders.status,orders.customer_id, orders.order_type FROM orders INNER JOIN orderitem ON orders.order_id = orderitem.order_id GROUP BY orders.order_id ORDER BY orders.order_id  DESC LIMIT 2;', (err, results, fields) => {
      if(err) throw err;
      res.send(results);
    });
})

app.get("/sales_cashOnDeliveryDashboard", (req, res) => {
  db.query("SELECT orders.order_id,orders.employee_id,orders.total_price,orders.advance_price,payment.payment_status,payment.payment_method, orders.status FROM orders INNER JOIN payment ON orders.order_id=payment.order_id ORDER BY orders.order_id DESC LIMIT 5", (err, result, fields) => {
      if (err) {
          console.log(err);
      } else{
          res.send(result);
      }
  });
});



//Profile
app.get("/view_sManager",(req,res)=>{
  id=req.params.id;

  db.query("SELECT * FROM employee WHERE role='Sales Manager'",[req.query.id],(err,result)=>{
      console.log(req.query.id);
      res.send(result);
  });
      
});

app.get('/load_sManager',(req,res)=>{
  db.query('SELECT name,role,emp_img FROM employee WHERE NOT role="Sales Manager" ',(err,result,fields)=>{
      if(!err)
      res.send(result);
      else
      console.log(err);
  })
})

//update Profile
app.put('/sales_updateProfile', (req,res) => {
  const id=req.body.id;
  const name = req.body.name;
  const email = req.body.email;
  const emp_img = req.body.emp_img;
  const phone_no = req.body.phone_no;
  const address = req.body.address;
 
  db.query("UPDATE employee SET name = ?,email=?,emp_img=?,phone_no=?,address=? WHERE role = 'Sales Manager'", 
  [name,email,emp_img,phone_no,address], 
  (err, result) => {
      if (err) {
          console.log(err);
      } else {
          res.send(result);
      }
     }
  );
});

app.get("/sales_viewproduct", (req, res) => {
  db.query("SELECT * FROM products  ", (err, result, fields) => {
      if (err) {
          console.log(err);
      } else{
          res.send(result);
      }
  });
});



//Sales Report

app.get('/SalesReport1',(req,res) => {
  db.query('SELECT products.product_name, orders.order_id,orders.o_date, orders.order_last_date,orders.status FROM ((orderitem INNER JOIN orders ON orderitem.order_id=orders.order_id)INNER JOIN products ON orderitem.product_id=products.product_id) WHERE orders.o_date BETWEEN ? AND ? ',[req.query.from_date,req.query.to_date], (err, result) => {
      if(err) {
          console.log(err)
      }else {
          res.send(result);
         
      }
  });
});

app.get("/salesReport", (req, res) => {
  db.query("SELECT orders.order_id, orders.order_type, orders.o_date, orders.order_last_date, orders.status,orders.total_price FROM orders INNER JOIN customer ON orders.customer_id=customer.customer_id INNER JOIN payment ON payment.order_id=orders.order_id WHERE (orders.status='Ready to deliver'  OR orders.status='Processing' OR orders.status='Completed' OR orders.status='Finished' OR orders.status='Returned' OR orders.status='Pending' OR orders.status='R_Pending') AND orders.o_date BETWEEN ? AND ?;",
  [req.query.from_date,req.query.to_date],
  (err, result, fields) => {
      if (err) {
          console.log(err);
      } else{
          res.send(result);
      }
  });
});

app.get("/sales_orderstatuscount", (req, res) => {
  db.query("SELECT COUNT(order_id) AS count, status FROM orders WHERE orders.o_date BETWEEN ? AND ? GROUP BY status ORDER BY status", 
  [req.query.from_date,req.query.to_date],
  (err, result, fields) => {
      if (err) {
          console.log(err);
      } else{
          res.send(result);
          console.log(result);
      }
  });
});


app.get("/sales_ordervsdate", (req, res) => {
  db.query("SELECT COUNT(order_id) AS count,o_date FROM orders WHERE o_date BETWEEN ? AND ? GROUP BY o_date", 
  [req.query.from_date,req.query.to_date],
  (err, result, fields) => {
      if (err) {
          console.log(err);
      } else{
          res.send(result);
          console.log(result);
      }
  });
});

app.get("/sales_CashReport", (req, res) => {
  db.query("SELECT orders.order_id, payment.order_id, payment.payment_status,payment.payment_method, orders.o_date, orders.order_last_date,orders.total_price,orders.advance_price,customer.fname FROM orders INNER JOIN payment ON payment.order_id=orders.order_id INNER JOIN customer ON orders.customer_id = customer.customer_id WHERE orders.o_date BETWEEN ? AND ? ORDER BY orders.order_id ASC", 
  [req.query.from_date,req.query.to_date],
  (err, result, fields) => {
      if (err) {
          console.log(err);
      } else{
          console.log(result)
          res.send(result);
      }
  });
});

app.get("/sales_paymentdonut", (req, res) => {
  db.query("SELECT COUNT(payment.order_id) AS count,payment.payment_status,orders.order_last_date,orders.o_date FROM payment INNER JOIN orders ON payment.order_id = orders.order_id WHERE orders.o_date BETWEEN ? AND ? GROUP BY payment_status", 
  [req.query.from_date,req.query.to_date],
  (err, result, fields) => {
      if (err) {
          console.log(err);
      } else{
          res.send(result);
          console.log(result);
      }
  });
});

// app.get("/sales_ReturnReport", (req, res) => {
//   db.query("SELECT order_id, return_date,reason, return_status FROM return_item WHERE EXTRACT(MONTH FROM return_date) = MONTH(CURRENT_TIMESTAMP) ORDER BY order_id DESC", (err, result, fields) => {
//       if (err) {
//           console.log(err);
//       } else{
//           console.log(result)
//           res.send(result);
//       }
//   });
// });


app.get("/sales_totalordercnt", (req, res) => {
  db.query("SELECT COUNT(orders.order_id) AS t_count  FROM orders  WHERE orders.o_date BETWEEN ? AND ?", 
  [req.query.from_date,req.query.to_date],
  (err, result, fields) => {
      if (err) {
          console.log(err);
      } else{
          res.send(result);
          console.log(result);
      }
  });
});

// app.get("/sales_returnordercnt", (req, res) => {
//   db.query("SELECT COUNT(orders.order_id) AS r_count FROM orders INNER JOIN return_item ON orders.order_id = return_item.order_id WHERE EXTRACT(MONTH FROM return_date) = MONTH(CURRENT_TIMESTAMP);", (err, result, fields) => {
//       if (err) {
//           console.log(err);
//       } else{
//           res.send(result);
//           console.log(result);
//       }
//   });
// });

// app.get("/sales_DeliverReport", (req, res) => {
//   db.query("SELECT employee.name,COUNT(orders.order_id) AS count FROM employee LEFT JOIN orders ON employee.id=orders.employee_id WHERE employee.role = 'Deliver' AND EXTRACT(MONTH FROM order_last_date) = MONTH(CURRENT_TIMESTAMP) GROUP BY employee.id", (err, result, fields) => {
//       if (err) {
//           console.log(err);
//       } else{
//           res.send(result);
//           console.log(result);
//       }
//   });
// });

// app.get("/sales_delivervsorder", (req, res) => {
//   db.query("SELECT employee.name,COUNT(orders.order_id) AS count FROM employee LEFT JOIN orders ON employee.id=orders.employee_id WHERE employee.role = 'Deliver'  AND EXTRACT(MONTH FROM order_last_date) = MONTH(CURRENT_TIMESTAMP) GROUP BY employee.name", (err, result, fields) => {
//       if (err) {
//           console.log(err);
//       } else{
//           res.send(result);
//           console.log(result);
//       }
//   });
// });


app.listen(3001,() => {
  console.log("running sever");
});
