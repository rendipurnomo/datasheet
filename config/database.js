import { GoogleSpreadsheet} from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import dotenv from 'dotenv';

dotenv.config();

// Initialize auth - see https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication
const serviceAccountAuth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const doc = new GoogleSpreadsheet(
  process.env.GOOGLE_SHEET_DOC_ID,
  serviceAccountAuth
);
const connectToGoogleSheet = async () => {
  try {
    await doc.loadInfo(); // loads document properties and worksheets
    console.log(`Successfully connected to Google Sheet ${doc.title}`);
  } catch (error) {
    console.error('Error connecting to Google Sheet:', error);
  }
}

export { doc, connectToGoogleSheet }