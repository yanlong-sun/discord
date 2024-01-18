// Google sheet npm package
const { GoogleSpreadsheet } = require("google-spreadsheet");
const { JWT } = require("google-auth-library");
const fs = require("fs");
require("dotenv").config();

const RESPONSES_SHEET_ID = "137Pq7Lyh0SAcw9KdYBVlot-3tcAMHFBTGIUBrmAtQTY";
const serviceAccountAuth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const doc = new GoogleSpreadsheet(RESPONSES_SHEET_ID, serviceAccountAuth);
doc.axios = doc.axios || {};
doc.axios.defaults = doc.axios.defaults || {};
const getRow = async (date) => {
  await doc.loadInfo();
  let sheet = doc.sheetsByIndex[0];
  let rows = await sheet.getRows();
  console.log("rows.......", rows);

  for (let index = 0; index < rows.length; index++) {
    const row = rows[index];
    if (row.Date == date) {
      console.log(row);
    }
  }
};

getRow("Mon, 10 23, 2023");

// const addRow = async (rows) => {
//   // use service account creds
//   await doc.useServiceAccountAuth({
//     client_email: CREDENTIALS.client_email,
//     private_key: CREDENTIALS.private_key,
//   });

//   await doc.loadInfo();

//   // Index of the sheet
//   let sheet = doc.sheetsByIndex[0];

//   for (let index = 0; index < rows.length; index++) {
//     const row = rows[index];
//     await sheet.addRow(row);
//   }
// };

// let rows = [
//   {
//     email: "email@email.com",
//     user_name: "ramesh",
//     password: "abcd@1234",
//   },
//   {
//     email: "email@gmail.com",
//     user_name: "dilip",
//     password: "abcd@1234",
//   },
// ];

// const updateRow = async (keyValue, oldValue, newValue) => {
//   // use service account creds
//   await doc.useServiceAccountAuth({
//     client_email: CREDENTIALS.client_email,
//     private_key: CREDENTIALS.private_key,
//   });

//   await doc.loadInfo();

//   // Index of the sheet
//   let sheet = doc.sheetsByIndex[0];

//   let rows = await sheet.getRows();

//   for (let index = 0; index < rows.length; index++) {
//     const row = rows[index];
//     if (row[keyValue] === oldValue) {
//       rows[index][keyValue] = newValue;
//       await rows[index].save();
//       break;
//     }
//   }
// };

// const deleteRow = async (keyValue, thisValue) => {
//   // use service account creds
//   await doc.useServiceAccountAuth({
//     client_email: CREDENTIALS.client_email,
//     private_key: CREDENTIALS.private_key,
//   });

//   await doc.loadInfo();

//   // Index of the sheet
//   let sheet = doc.sheetsByIndex[0];

//   let rows = await sheet.getRows();

//   for (let index = 0; index < rows.length; index++) {
//     const row = rows[index];
//     if (row[keyValue] === thisValue) {
//       await rows[index].delete();
//       break;
//     }
//   }
// };
