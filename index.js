const express = require('express');
const { clearConfigCache } = require('prettier');
const Sequelize = require('sequelize');
const app = express();

//const db = new sqlite3.Database('./Database/Coffee.sqlite');

app.use(express.json());

const sequelize = new Sequelize('database','username','password',{
    host: 'localhost',
    dialect: 'sqlite',
    storage: './Database/Coffee.sqlite'
});

const Address = sequelize.define('Address', {
    
  tax_id:{
      type: Sequelize.INTEGER,
      autoIncrement: true,  
      primaryKey: true
  },
  shop_name:{
      type: Sequelize.STRING,
      allowNull: false
  },
  address_info:{
      type: Sequelize.STRING,
      allowNull: false
  },
});

const Customer = sequelize.define('customer', {
    customer_id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username:{
        type: Sequelize.STRING,
        allowNull: false
    },
    password:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    tel:{
        type: Sequelize.STRING,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
  });

  const Employee = sequelize.define('Employee', {
    
    employee_id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username:{
        type: Sequelize.STRING,
        allowNull: false
    },
    password:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    age:{
        type: Sequelize.STRING,
        allowNull: false
    },
    position:{
        type: Sequelize.STRING,
        allowNull: false
    },
    img: {
        type: Sequelize.STRING,
        allowNull: false
    }  
    
  });

  const Item = sequelize.define('Item', {
    
    item_id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    itemname:{
        type: Sequelize.STRING,
        allowNull: false
    },
    price:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    img: {
        type: Sequelize.STRING,
        allowNull: false
    }        
  });

  const Order = sequelize.define('Order', {
    
    order_id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    item_id:{
        type: Sequelize.STRING,
        allowNull: false
    },
    customer_id:{
        type: Sequelize.STRING,
        allowNull: false
    },
    qty:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
   
  });

  sequelize.sync();
  //-----------------Address------------------------

    app.get('/Address',(req, res) =>{
        Address.findAll().then(Address => {
            res.json(Address);
        }).catch(err => {
            res.status(500).send(err);
        });
    });

    app.post('/Address',(req, res) =>{
        Book.create(req.body).then(Address => {
            res.send(Address);
        }).catch(err => {
                res.status(500).send(err);
            });
    });

    app.put('/Address',(req,res) => {
        Address.findByPk(req.params.id).then(Address => {
            if (!Address) {
                res.status(404).send('Address not found');
            } else {
                Address.update(req.body).then(() =>{
                    res.send(Address);
                }).catch(err => {
                    res.status(500).send(err);
                });
            }
        }).catch(err => {
            res.status(500).send(err);
        });
    });

    app.delete('/Address',(req,res) => {
        Address.findByPk(req.params.id).then(Address=> {
            if (!Address){
                res.status(404).send('Address not found');
            } else {
                Address.destroy().then(() => {
                    res.send({});
                }).catch(err => {
                    res.status(500).send(err);
                });
            }
        }).catch(err => {
            res.status(500).send(err);
        });
    });


//---------------Customer---------------------

app.get("/customer", (req, res) => {
    Customer.findAll() //select * from
      .then((customer) => {
        console.log(customer)
        res.json(customer);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
});


    app.get('/customer/:id',(req, res) =>{
        Customer.findByPk(req.params.id).then(Customer => {
            if (!Customer){
                res.status(404).send('Customer not found');
            } else{
                res.json(Customer);
            }
        }).catch(err => {
            res.status(500).send(err);
        });
    });
    

    app.post('/customer',(req, res) =>{
        
        Customer.create(req.body).then(Customer => {
            res.send(Customer);
        }).catch(err => {
                res.status(500).send(err);
            });
    });

    app.put('/customer/:id',(req,res) => {
        console.log(req.data)
        Customer.findByPk(req.params.id).then(Customer => {
            if (!Customer) {
                res.status(404).send('Customer not found');
            } else {
                Customer.update(req.body).then(() =>{
                    res.send(Customer);
                }).catch(err => {
                    res.status(500).send(err);
                });
            }
        }).catch(err => {
            res.status(500).send(err);
        });
    });

    app.delete('/customer/:id',(req,res) => {   
        Customer.findByPk(req.params.id).then(Customer=> {
            if (!Customer){
                res.status(404).send('Customer not found');
            } else {
                Customer.destroy().then(() => {
                    res.send({});
                }).catch(err => {
                    res.status(500).send(err);
                });
            }
        }).catch(err => {
            res.status(500).send(err);
        });
    });

    app.get("/register", (req, res) => {
        Customer.findAll() //select * from
          .then((Register) => {
            res.json(Register);
          })
          .catch((err) => {
            res.status(500).send(err);
          });
      });

      app.post("/register", async (req, res) => {
        console.log(req.body);
          Customer.create(req.body)
            .then((customer) => {
              res.send(customer);
            })
            .catch((err) => {
              res.status(500).send(err);
            });
        }
      );

      app.post("/login",async (req,res) => {
        try {
            const { username, password } = req.body;
            const customer = await Customer.findOne({ where: { username } });
            if (!customer) return res.json({ message: "User_not_found" });
            else if (customer.password != password)
              return res.json({ message: "Wrong_Password" });
            return res.status(200).json({ message: true, customer: customer });
          } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Server_error" });
          }
      })



//---------------------Employee---------------------

    app.get('/Employee',(req, res) =>{
        Employee.findAll().then(Employee => {
            res.json(Employee);
        }).catch(err => {
            res.status(500).send(err);
        });
    });
    app.get('/Employee/:id',(req, res) =>{
        Employee.findByPk(req.params.id).then(Employee => {
            if (!Employee){
                res.status(404).send('Employee not found');
            } else{
                res.json(Employee);
            }
        }).catch(err => {
            res.status(500).send(err);
        });
    });

    app.post('/Employee',(req, res) =>{
        Employee.create(req.body).then(Employee => {
            res.send(Employee);
        }).catch(err => {
                res.status(500).send(err);
            });
    });

    app.put('/Employee/:id',(req,res) => {
        Employee.findByPk(req.params.id).then(Employee => {
            if (!Employee) {
                res.status(404).send('Employee not found');
            } else {
                Employee.update(req.body).then(() =>{
                    res.send(Employee);
                }).catch(err => {
                    res.status(500).send(err);
                });
            }
        }).catch(err => {
            res.status(500).send(err);
        });
    });

    app.delete('/Employee/:id',(req,res) => {
        Employee.findByPk(req.params.id).then(Employee=> {
            if (!Employee){
                res.status(404).send('Employee not found');
            } else {
                Employee.destroy().then(() => {
                    res.send({});
                }).catch(err => {
                    res.status(500).send(err);
                });
            }
        }).catch(err => {
            res.status(500).send(err);
        });
    });

    app.get("/about", (req, res) => {
        Employee.findAll() //select * from
          .then((about) => {
            res.json(about);
          })
          .catch((err) => {
            res.status(500).send(err);
          });
      });


//--------------------Item-----------------------

app.get('/Item',(req, res) =>{
    Item.findAll().then(Item => {
        res.json(Item);
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.get('/Item/:id',(req, res) =>{
    Item.findByPk(req.params.id).then(Item => {
        if (!Item){
            res.status(404).send('Item not found');
        } else{
            res.json(Item);
        }
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.post('/Items',(req, res) =>{
    Item.create(req.body).then(Item => {
        res.send(Item);
    }).catch(err => {
            res.status(500).send(err);
    });
});

app.put('/Item/:id',(req,res) => {
    Item.findByPk(req.params.id).then(Item => {
        if (!Item) {
            res.status(404).send('Item not found');
        } else {
            Item.update(req.body).then(() =>{
                res.send(Item);
            }).catch(err => {
                res.status(500).send(err);
            });
        }
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.delete('/Item/:id',(req,res) => {
    Item.findByPk(req.params.id).then(Item=> {
        if (!Item){
            res.status(404).send('Item not found');
        } else {
            Item.destroy().then(() => {
                res.send({});
            }).catch(err => {
                res.status(500).send(err);
            });
        }
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.get("/menu", (req, res) => {
    Item.findAll() //select * from
      .then((menu) => {
        res.json(menu);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  });

  app.get("/menu1", (req, res) => {
    Item.findAll() //select * from
      .then((menu1) => {
        res.json(menu1);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  });

//----------------Order--------------------------

app.get('/Order',(req, res) =>{
    Order.findAll().then(Order => {
        res.json(Order);
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.get('/Order/:id',(req, res) =>{
    Order.findByPk(req.params.id).then(Order => {
        if (!Order){
            res.status(404).send('Order not found');
        } else{
            res.json(Order);
        }
    }).catch(err => {
        res.status(500).send(err);
    });
});


app.post('/Order',async(req, res) =>{
    try {
        const sale = await Order.create({
            customer_id: req.body.customer_id,
            item_id: req.body.item_id,
            qty: req.body.qty
        });
        res.send(sale);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}); 

app.put('/Order',(req,res) => {
    Order.findByPk(req.params.id).then(Order => {
        if (!Order) {
            res.status(404).send('Order not found');
        } else {
            Order.update(req.body).then(() =>{
                res.send(Order);
            }).catch(err => {
                res.status(500).send(err);
            });
        }
    }).catch(err => {
        res.status(500).send(err);
    });
});

app.delete('/Order/:id',(req,res) => {
    Order.findByPk(req.params.id).then(Order=> {
        if (!Order){
            res.status(404).send('Order not found');
        } else {
            Order.destroy().then(() => {
                res.send({});
            }).catch(err => {
                res.status(500).send(err);
            });
        }
    }).catch(err => {
        res.status(500).send(err);
    });
});  

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port http://localhost:${port}`));