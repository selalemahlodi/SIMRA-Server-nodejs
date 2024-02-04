const express = require('express');
const connection = require("../config/config");
const router = express.Router();
const pdfkit = require('pdfkit');
const fs = require('fs');
const { count, error } = require('console');
const ExcelJS = require('exceljs');
const pdfmake = require('pdfmake');
const excel = require('excel4node');
const util = require('util');


const queryAsync = async (queryString) => {
    return new Promise((resolve, reject) => {
        connection.query(queryString, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

const fetchUsersFromDatabase = async (level) => {
    try {
        let query = 'SELECT * FROM user';

        if (level !== 'All Levels') {
            query += ` WHERE level = ${level}`;
        }

        console.log('Executing database query:', query);
        

        const results = await queryAsync(query);
        return results;

    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

router.get('/downloadUsersPDF', async (req, res) => {
    const selectedLevel = req.query.level;

    try {
        console.log('PDF generation started');
        const users = await fetchUsersFromDatabase(selectedLevel);
        console.log('Fetched users:', users);

        const fonts = {
            Roboto: {
                normal: 'Helvetica',
                bold: 'Helvetica-Bold',
                italics: 'Helvetica-Oblique',
                bolditalics: 'Helvetica-BoldOblique',
            },
        };

        const printer = new pdfmake(fonts);

        const documentDefinition = {
            content: [
                { text: `Users for level: ${selectedLevel || 'All Levels'}`, style: 'header' },
                { table: { headerRows: 1, widths: [100, 100, 100], body: buildTableBody(users) } },
                { text: `Number of People Selected: ${users.length}`, margin: [0, 10, 0, 0] },
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                    margin: [0, 0, 0, 10],
                },
            },
        };

        const pdfDoc = printer.createPdfKitDocument(documentDefinition);

        // Pipe the PDF to the response stream
        pdfDoc.pipe(res);

        // End the response when PDF generation is complete
        pdfDoc.end();

        console.log('PDF generation done');

    } catch (error) {
        console.error('Error handling PDF download request:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

function buildTableBody(data) {
    const body = [];
    body.push(['Name', 'Last Name', 'Mobile']); // Table header
    data.forEach(user => {
        body.push([user.firstname, user.lastname, user.mobileNo]);
    });
    return body;
}


router.get('/downloadUsersExcel', async (req, res) => {
    const selectedLevel = req.query.level;

    try {
        console.log('Excel generation started');
        const users = await fetchUsersFromDatabase(selectedLevel);
        console.log('Fetched users:', users);

        const wb = new ExcelJS.Workbook();
        const ws = wb.addWorksheet('Users');

        // Add headers to the worksheet
        const headers = ['Name', 'Last Name', 'Mobile'];
        ws.addRow(headers);

        // Add data to the worksheet
        users.forEach(user => {
            const rowData = [user.firstname, user.lastname, user.mobileNo];
            ws.addRow(rowData);
        });

        const filePath = 'users.xlsx';
        await wb.xlsx.writeFile(filePath);

        
        const filestream = fs.createReadStream(filePath);
       
        // Use 'await' to ensure the file stream is completely piped before continuing
        await new Promise((resolve) => {
            filestream.pipe(res);
            filestream.on('end', resolve);
        });

        // Optional: Delete the generated Excel file after successful download
        fs.unlink(filePath, (unlinkErr) => {
            if (unlinkErr) {
                console.error('Error deleting generated Excel file:', unlinkErr.message);
            }
        });

    } catch (error) {
        console.error('Error handling Excel download request:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router