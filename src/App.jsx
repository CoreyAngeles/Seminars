import { useEffect, useState } from "react";
import styles from "./App.module.scss";
import SeminarsList from "./components/SeminarsList";

const DB_URL = "http://localhost:3001/seminars";

function App() {
  const [data, setData] = useState([]);

  // Получение данных с json сервера с помощью useEffect и fetch
  useEffect(() => {
    fetch(DB_URL)
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  // Функция для получения id из удаленного элемента массива и обновление отображения данных
  const handleDelete = (id) => {
    setData((prevData) => prevData.filter((el) => el.id !== id));
  };

  // Функция для получения обновленного элемента массива и обновление отображения данных
  const handleUpdate = (updatedSeminar) => {
    setData((prevData) =>
      prevData.map((el) => (el.id === updatedSeminar.id ? updatedSeminar : el))
    );
  };

  return (
    <div>
      <SeminarsList
        data={data}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
      />
    </div>
  );
}

export default App;
