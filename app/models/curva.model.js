module.exports = (sequelize, Sequelize) => {
	const Curva = sequelize.define('curva', {	
	  id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
          },
	  velocidade: {
			type: Sequelize.FLOAT
	  },
	  potencia: {
			type: Sequelize.FLOAT
	  },
	});
	
	return Curva;
}
