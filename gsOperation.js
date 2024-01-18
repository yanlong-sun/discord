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
  let res;
  if (index > 0 && rows[index] && rows[index]._rawData[0] === date) {
    const row = rows[index]._rawData;
    if (row.length < 3) {
      res = [...row, ...new Array(3 - row.length).fill("")];
    } else {
      res = row;
    }
  } else {
    res = -1;
  }
  return { row: res, index };
};

const getTask = async (date) => {
  const { row } = await getRow(date);
  return row;
};

const addTask = async (date, id, task) => {
  const { row } = await getRow(date);
  if (row === -1) {
    return -1;
  }
  row._rawData[id] = task;
};

addTask("2024-01-18", 2, "学习了nodejs");
