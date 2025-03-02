import React, { useEffect, useState } from "react";
import styles from "./SeminarsList.module.scss";
import ListElement from "./ListElement";

const SeminarsList = ({ data = [], onDelete, onUpdate }) => {
  return (
    <div className={styles["seminars-list__wrapper"]}>
      <h1 className={styles["seminars-list__title"]}>Seminars</h1>

      {data.map((el) => (
        <ListElement
          key={el.id}
          element={el}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};

export default SeminarsList;
