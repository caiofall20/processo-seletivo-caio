const stream = require('stream');
const await = require('await')
const fs = require('fs');
const path = require('path');

const db = require('../config/db.config.js');
const Curva = db.Curva;

const csv = require('fast-csv');
const Json2csvParser = require('json2csv').Parser;

/**
 * Upload Single CSV file/ and Import data to MySQL/PostgreSQL database
 * @param {*} req 
 * @param {*} res 
 */
exports.uploadFile = (req, res) => {
    try{
        const curva = [];
        fs.createReadStream(__basedir + "/uploads/" + req.file.filename)
            .pipe(csv
	        .parse({ headers: ["velocidade", "potencia"], renameHeaders: true, delimiter:';' })
	        .transform((data) => ({
		        velocidade: parseFloat(data.velocidade.replace(',', '.')),
		        potencia: parseFloat(data.potencia.replace(',', '.'))
		    })))
            .on('error', error => {
                console.error(error);
//                throw error.message;
            })
            .on('data', row => {
                curva.push(row);
                //console.log(row);
            })
            .on('end', () => {
                // Save curva to MySQL/PostgreSQL database
                Curva.bulkCreate(curva).then(() => {
                    const result = {
                        status: "ok",
                        filename: req.file.filename,
                        message: "Upload Successfully!",
                    }
    
                    res.json(result);
                });    
            });
    }catch(error){
        const result = {
            status: "fail",
            filename: req.file.originalname,
            message: "Upload Error! message = " + error.message
        }
        res.json(result);
    }
}

exports.downloadFile = (req, res) => {
    Curva.findAll({attributes: ['id', 'velocidade', 'potencia']}).then(objects => {
        const jsonCurva = JSON.parse(JSON.stringify(objects));
        const csvFields = ['Id', 'Velocidade', 'Potencia'];
        const json2csvParser = new Json2csvParser({ csvFields });
        const csvData = json2csvParser.parse(jsonCurva);

        res.setHeader('Content-disposition', 'attachment; filename=Abr-2017-curva-potencia-windbox.csv');
        res.set('Content-Type', 'text/csv');
        res.status(200).end(csvData);
    });
}
