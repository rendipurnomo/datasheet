import { doc } from '../config/database.js';

export const getUsers = async () => {
  const sheet = doc.sheetsByIndex[0];
  
  try {
    await sheet.loadHeaderRow();
    const rows = await sheet.getRows();
    const rowsData = rows.map((row) => ({
      No: row._rawData[0],
      NoKK: row._rawData[1],
      NIK: row._rawData[2],
      Nama: row._rawData[3],
      JenisKelamin: row._rawData[7],
      Disabilitas: row._rawData[8],
      Keterangan: row._rawData[10],
      absen: row._rawData[11],
    }));
    return rowsData;
  } catch (error) {
    console.log('Error fetching rows:', error);
    throw error;
  }
};