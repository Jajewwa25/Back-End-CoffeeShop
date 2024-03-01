const express = require('express');
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

const Customer = sequelize.define('Customer', {
    
    customer_id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username:{
        type: Sequelize.STRING,
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
    date:{
        type: Sequelize.DATE,
        allowNull: false
    }
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
    age:{
        type: Sequelize.STRING,
        allowNull: false
    },
    position:{
        type: Sequelize.STRING,
        allowNull: false
    },
    address:{
        type: Sequelize.STRING,
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
    date:{
        type: Sequelize.DATE,
        allowNull: false
    }
  });

  const Item = sequelize.define('Item', {
    
    item_id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    item:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    price:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    size:{
        type: Sequelize.STRING,
        allowNull: false
    },
    date:{
        type: Sequelize.DATE,
        allowNull: false
    }                    
  });

  const Order = sequelize.define('Order', {
    
    order_id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    orderDate:{
        type: Sequelize.DATE,
        allowNull: false
    },
    item_id:{
        type: Sequelize.STRING,
        allowNull: false
    },
    employee_id:{
        type: Sequelize.STRING,
        allowNull: false
    },
    customer_id:{
        type: Sequelize.STRING,
        allowNull: false
    },
    tax_id:{
        type: Sequelize.STRING,
        allowNull: false
    },
    date:{
        type: Sequelize.DATE,
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

    app.get('/Customers',(req, res) =>{
        Customer.findAll().then(Customers => {
            res.json(Customers);
        }).catch(err => {
            res.status(500).send(err);
        });
    });

    app.get('/Customers/:id',(req, res) =>{
        Customer.findByPk(req.params.id).then(Customers => {
            if (!Customers){
                res.status(404).send('Customers not found');
            } else{
                res.json(Customers);
            }
        }).catch(err => {
            res.status(500).send(err);
        });
    });
    

    app.post('/Customers',(req, res) =>{
        Customer.create(req.body).then(Customers => {
            res.send(Customers);
        }).catch(err => {
                res.status(500).send(err);
            });
    });

    app.put('/Customers/:id',(req,res) => {
        Customer.findByPk(req.params.id).then(Customers => {
            if (!Customers) {
                res.status(404).send('Customers not found');
            } else {
                Customers.update(req.body).then(() =>{
                    res.send(Customers);
                }).catch(err => {
                    res.status(500).send(err);
                });
            }
        }).catch(err => {
            res.status(500).send(err);
        });
    });

    app.delete('/Customers/:id',(req,res) => {   
        Customer.findByPk(req.params.id).then(Customers=> {
            if (!Customers){
                res.status(404).send('Customers not found');
            } else {
                Customers.destroy().then(() => {
                    res.send({});
                }).catch(err => {
                    res.status(500).send(err);
                });
            }
        }).catch(err => {
            res.status(500).send(err);
        });
    });

    

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

app.post('/Item',(req, res) =>{
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

app.post('/Order',(req, res) =>{
    Order.create(req.body).then(Order => {
        res.send(Order);
    }).catch(err => {
            res.status(500).send(err);
        });
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
app.delete('/Order',(req,res) => {
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