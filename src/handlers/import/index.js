const fs = require('fs');
const XLSX = require('xlsx');
const mongoose = require('mongoose');
const ComicModel = require('../../models/ComicModel');
const utils = require('../../utils');

// import excel file and extract to  JSON
const workbook = XLSX.readFile(__dirname + '/../../../data/dragonero.xlsx');
const character = 'Dragonero';
const sheetArr = XLSX.utils.sheet_to_json(workbook.Sheets.Dragonero);

// create database connection
async function dbConn() {
    try {
        await mongoose.connect('mongodb://localhost:27017/comics', { useNewUrlParser: true, useUnifiedTopology: true });
    } catch (e) {
        console.log('error', e);
    }
}

// split value to two fields
function setParsedCopy(value) {
    let extendedObj = {};
    let godMes = value.split('/');
    extendedObj['godina'] = parseInt(godMes[0]);
    extendedObj['mesec'] = parseInt(godMes[1]);
    return extendedObj;
}

// import data for every copy
async function copyImport(copies, id) {
    for (let copyObj of copies) {
        copyObj.parent = id;
        copyObj.lik = character;
        let newCopy = utils.fillModel(ComicModel, copyObj);

        if (newCopy.izdavac)
            await newCopy.save(newCopy);
    }
}

// import data
async function importData(arr) {
    if (!arr.length)
        return;

    let object = arr.pop();

    // create model with data and add character
    const comicModel = utils.fillModel(ComicModel, object.original);
    comicModel.lik = character;

    // return document
    const comic = await comicModel.save(comicModel);

    if (object.copies.length)
        copyImport(object.copies, comic._id);

    importData(arr);
}

// array from JSON with rearranged data
let altArray = [];

sheetArr.forEach(obj => {
    // template object
    let altObj = {original: {}, copies: []};

    let flag = 0; // flag to distinguish different publishers
    let copy = {}; // object for different publishers

    // loop through key/value pairs to remap data
    for (let [key, value] of Object.entries(obj)) {
        // last character from key in object
        let intFromKey = parseInt( key.substring( key.length - 1 ) );

        if (isNaN(intFromKey)) {
            if (key === 'GODINA') {
                let godMes = value.split('/');
                altObj.original['godina'] = parseInt(godMes[0]);
                altObj.original['mesec'] = parseInt(godMes[1]);
            } else
                altObj.original[key.toLowerCase()] = value; // this is original value
        }
        else {
            if (flag === 0)
                flag = intFromKey;

            // add publishers data to copy
            if (flag === intFromKey) {
                if (key.replace(intFromKey, '') === 'GODINA')
                    copy = Object.assign(copy, setParsedCopy(value));
                else
                    copy[key.replace(intFromKey, '').toLowerCase()] = value; // publishers data
            } else {
                flag = intFromKey; // change flag (for another object)
                altObj.copies.push(copy); // push publishers data 'copies' array
                copy = Object.assign({}); // reset data

                if (key === 'GODINA')
                    copy = Object.assign(copy, setParsedCopy(value));
                else
                    copy[key.replace(intFromKey, '').toLowerCase()] = value; // set initial value
            }
        }
    }
    // push publishers data 'copies' array
    altObj.copies.push(copy);

    // push remapped object to new array
    altArray.push(altObj);
});

// fs.writeFile('wb.json', JSON.stringify(altArray), (err) => {
//     if (err)
//         console.log('error', err);
//
//     console.log('File saved');
// });

// create connection
dbConn();

// import data
importData(altArray);
