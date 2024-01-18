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

const getRow = async (date) => {
  const startDate = new Date("2023-09-19");
  const currDate = new Date(date);
  const timeDiff = currDate.getTime() - startDate.getTime();
  const index = timeDiff / (1000 * 60 * 60 * 24);

  await doc.loadInfo();
  let sheet = doc.sheetsByIndex[0];
  let rows = await sheet.getRows();
  console.log(date, index);
  if (index > 0 && rows[index + 1] && rows[index + 1]._rawData[0] === date) {
    const row = rows[index + 1]._rawData;
    console.log("here is the row", row);
    if (row.length < 3) {
      console.log("<3 result: ", [...row, new Array(3 - row.length).fill("")]);
      return [...row, new Array(3 - row.length).fill("")];
    }
    console.log("==3 result: ", row);
    return row;
  }
  console.log("bucunzai result", -1);
  return -1;
};

getRow("2023-10-11");
getRow("2023-10-15");
getRow("2023-10-23");
getRow("2033-10-15");

// const getTask = async (date) => {};

// const addTask = async (date, id) => {
//   await doc.loadInfo();
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
