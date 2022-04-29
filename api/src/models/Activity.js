const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activity', {
    name: {
       type: DataTypes.STRING,
       allowNull: false,
       validate: {
        isAlpha: true
       }
    },
    difficulty: {
        type: DataTypes.ENUM(["", "1", "2", "3", "4", "5"])
    },
    duration: {
        type: DataTypes.ENUM(["", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]),
    },
    season: {
        type: DataTypes.ENUM(["", "summer", "autumn", "winter", "spring"]),
    }
  });
};
