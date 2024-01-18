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

const getRowNumber = (date) => {
  const startDate = new Date("2023-09-19");
  const currDate = new Date(date);
  const timeDiff = currDate.getTime() - startDate.getTime();
  return timeDiff / (1000 * 60 * 60 * 24);
};

const getTask = async (date) => {
  try {
    await doc.loadInfo();
    let sheet = doc.sheetsByIndex[0];
    let rows = await sheet.getRows();
    const rowNumber = getRowNumber(date);
    if (rowNumber < 0 || rowNumber > sheet.rowCount) {
      throw Error("Date exceeds the sheet range, try a different date");
    }
    const row = await sheet.getRows(rowNumber);
    const rowData = row._rawData;
    if (rowData.length < 3) {
      return [...rowData, ...new Array(3 - rowData.length).fill("")];
    } else {
      return rowData;
    }
  } catch (error) {
    console.error("Error of getting task: ", error.message);
  }
};

const addTask = async (date, id, task) => {
  try {
    await doc.loadInfo();
    let sheet = doc.sheetsByIndex[0];
    const rowNumber = getRowNumber(date);
    if (rowNumber < 0 || rowNumber > sheet.rowCount) {
      throw Error("Date exceeds the sheet range, try a different date");
    }
    const row = await sheet.getRows(rowNumber);
    row._rawData[id] = task;
    console.log(row._rawData);
    await row.save();
    return -1;
  } catch (error) {
    console.error("Error of adding task: ", error.message);
  }
};

addTask("2024-01-18", 2, "学习了nodejs");
