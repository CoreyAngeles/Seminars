import styles from "./SeminarsList.module.scss";
import ListElement from "./ListElement";

const SeminarsList = ({ data = [], onDelete, onUpdate }) => {
  return (
    <div className={styles["seminars-list__wrapper"]}>
      <h1 className={styles["seminars-list__title"]}>Seminars</h1>
      {/* если массив данных пустой, то отображаем сообщение о загрузке */}
      {data.length !== 0 ? (
        data.map((el) => (
          <ListElement
            key={el.id}
            element={el}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        ))
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
};

export default SeminarsList;
