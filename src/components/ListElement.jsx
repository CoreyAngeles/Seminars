import React, { useState } from "react";
import styles from "./ListElement.module.scss";

const ListElement = ({ element, onDelete, onUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedDescription, setEditedDescription] = useState(
    element.description
  );

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/seminars/${element.id}`,
        { method: "DELETE" }
      );

      if (response.ok) {
        alert("Семинар успешно удален");
        onDelete(element.id);
      } else {
        console.log("Ошибка при удалении семинара");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsModalOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/seminars/${element.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ description: editedDescription }),
        }
      );

      console.log(response);

      if (response.ok) {
        const updatedSeminar = await response.json();
        alert("Описание успешно обновлено");
        onUpdate(updatedSeminar);
        setIsEditModalOpen(false);
      } else {
        console.log("Ошибка при обновлении описания");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditModalOpen(false);
    setEditedDescription(element.description);
  };

  return (
    <div className={styles["list-element__wrapper"]}>
      <img
        src={element.photo}
        alt="photo"
        className={styles["list-element__photo"]}
      />
      <h2 className={styles["list-element__title"]}>{element.title}</h2>
      <p className={styles["list-element__description"]}>
        {element.description}
      </p>
      <p
        className={styles["list-element__date"]}
      >{`${element.date} ${element.time}`}</p>
      <div className={styles["list-element__buttons-wrapper"]}>
        <button
          onClick={handleDeleteClick}
          className={styles["list-element__delete-button"]}
        >
          Удалить
        </button>
        <button
          onClick={handleEditClick}
          className={styles["list-element__change-button"]}
        >
          Редактировать
        </button>
      </div>
      {isModalOpen ? (
        <div className={styles["modal-overlay"]}>
          <div className={styles["modal-content"]}>
            <p>Вы уверены, что хотите удалить этот семинар?</p>
            <div className={styles["modal-buttons"]}>
              <button
                className={styles["modal-buttons__delete-button"]}
                onClick={handleConfirmDelete}
              >
                Удалить
              </button>
              <button
                className={styles["modal-buttons__cancel-button"]}
                onClick={handleCancelDelete}
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {isEditModalOpen ? (
        <div className={styles["modal-overlay"]}>
          <div className={styles["modal-content"]}>
            <p>Редактирование описания:</p>
            <textarea
              className={styles["modal-textarea"]}
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
            />
            <div className={styles["modal-buttons"]}>
              <button
                className={styles["modal-buttons__save-button"]}
                onClick={handleSaveEdit}
              >
                Сохранить
              </button>
              <button
                className={styles["modal-buttons__cancel-button"]}
                onClick={handleCancelEdit}
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ListElement;
