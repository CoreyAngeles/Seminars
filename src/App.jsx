import { useEffect, useState } from "react";
import styles from "./App.module.scss";
import SeminarsList from "./components/SeminarsList";

const DB_URL = "http://localhost:3001/seminars";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(DB_URL)
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  const handleDelete = (id) => {
    setData((prevData) => prevData.filter((el) => el.id !== id));
  };

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
