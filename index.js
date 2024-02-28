const express = require("express");
const Sequelize = require('sequelize');
const app = express();

app.use(express.json());

const sequelize = new Sequelize('database','username','password',{
    host: 'localhost',
    dialect: 'sqlite',
    storage: './Database/Coffee.sqlite'
});

const Address = sequelize.define('Adress', {
    
  tax_id:{
      type: Sequelize.STRING,
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
        type: Sequelize.STRING,
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
        type: Sequelize.STRING,
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
        type: Sequelize.STRING,
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
        type: Sequelize.STRING,
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

    app.get('/Address',(req, res) =>{
        Address.findAll().then(Address => {
            res.json(Address);
        }).catch(err => {
            res.status(500).send(err);
        });
    });

    app.post('/Address',(req, res) =>{
        Book.create(req.body).then(Address => {
            res.send(Adress);
        }).catch(err => {
                res.status(500).send(err);
            });
    });

    app.put('/Address',(req,res) => {

            if (!Address) {
                res.status(404).send('Address not found');
            } else {
                Address.update(req.body).then(() =>{
                    res.send(Address);
                }).catch(err => {
                    res.status(500).send(err);
                });
            }
    });

    app.delete('/Address',(req,res) => {
        
        if (!Address){
            res.status(404).send('Address not found');
        } else {
            Address.destroy().then(() => {
                res.send({});
            }).catch(err => {
                res.status(500).send(err);
            });
        }
    });

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port http://localhost:${port}`)); 