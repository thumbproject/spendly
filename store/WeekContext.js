import { createContext, useState, useEffect } from "react";
import { getWeeklyData, updateDayData } from "../utilities/data";

export const WeekContext = createContext({
  data: [],
  updateData: (obj) => {},
});

const WeekContextProvider = ({ children }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const weeklyData = await getWeeklyData();
      setData(weeklyData);
    };
    fetchData();
  }, []);

  const updateData = async (obj) => {
    await updateDayData(obj);
    const updatedData = await getWeeklyData();
    setData(updatedData);
  };

  return (
    <WeekContext.Provider value={{ data, updateData }}>
      {children}
    </WeekContext.Provider>
  );
};

export default WeekContextProvider;
