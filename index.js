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


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port http://localhost:${port}`)); 