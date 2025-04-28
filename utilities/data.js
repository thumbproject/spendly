import * as SQLite from "expo-sqlite";

export const openDatabase = async () => {
  return await SQLite.openDatabaseAsync("myDatabase.db");
};

const initialData = [
  { day: "Sun", saved: 0, earned: 0, spent: 0 },
  { day: "Mon", saved: 0, earned: 0, spent: 0 },
  { day: "Tue", saved: 0, earned: 0, spent: 0 },
  { day: "Wed", saved: 0, earned: 0, spent: 0 },
  { day: "Thu", saved: 0, earned: 0, spent: 0 },
  { day: "Fri", saved: 0, earned: 0, spent: 0 },
  { day: "Sat", saved: 0, earned: 0, spent: 0 },
];

export const initDatabase = async () => {
  const db = await openDatabase();
  try {
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS weeklyData (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        day TEXT NOT NULL,
        saved REAL NOT NULL,
        earned REAL NOT NULL,
        spent REAL NOT NULL
      );
    `);

    const countResult = await db.getFirstAsync(
      "SELECT COUNT(*) as count FROM weeklyData;"
    );
    if (countResult.count === 0) {
      for (const { day, saved, earned, spent } of initialData) {
        await db.runAsync(
          "INSERT INTO weeklyData (day, saved, earned, spent) VALUES (?, ?, ?, ?);",
          [day, saved, earned, spent]
        );
      }
      //console.log("Initial data inserted");
    }
  } catch (error) {
    console.error("Error initializing database:", error);
  } finally {
    await db.closeAsync();
  }
};

export const getWeeklyData = async () => {
  const db = await openDatabase();
  try {
    const rows = await db.getAllAsync("SELECT * FROM weeklyData;");
    return rows;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  } finally {
    await db.closeAsync();
  }
};

export const updateDayData = async (data) => {
  const db = await openDatabase();
  try {
    await db.runAsync(
      "UPDATE weeklyData SET saved = ?, earned = ?, spent = ? WHERE day = ?;",
      [data.saved, data.earned, data.spent, data.day]
    );
    return true;
  } catch (error) {
    console.error("Error updating data:", error);
    return false;
  } finally {
    console.log("Closing database after update");
    await db.closeAsync();
  }
};
