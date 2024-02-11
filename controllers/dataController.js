import { doc } from '../config/database.js';
import { getUsers } from '../models/dataModels.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
}

export const getUserById = async (req, res) => {
  try {
    const user = await getUsers();
    const userId = req.params.id;
    const userById = user.find((user) => user.No === userId);
    res.json(userById);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
}

export const updateUser = async (req, res) => {
  const row = await getUsers();
  const id = req.params.id;

  const user = row.find((user) => user.No === id);

  if (!user) {
    res.status(404).json({ error: 'User not found' });
  }
  try {
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();
    const userById = rows.filter((row) => row._rawData[0] == id);
    const datas = userById[0]._rowNumber;
    const { No, NoKK, NIK, Nama, JenisKelamin, Disabilitas, Keterangan, absen } = req.body;

    rows[datas-2].assign({ No: No, NoKK: NoKK, NIK: NIK, Nama: Nama, JenisKelamin: JenisKelamin, Disabilitas: Disabilitas, Keterangan: Keterangan, absen: absen });
    await rows[datas-2].save();

    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
}