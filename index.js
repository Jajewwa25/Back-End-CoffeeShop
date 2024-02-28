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
      type: Sequelize.VARCHAR(15),
      allowNull: false
  },
  address_info:{
      type: Sequelize.VARCHAR(50),
      allowNull: false
  },
});


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port http://localhost:${port}`)); 