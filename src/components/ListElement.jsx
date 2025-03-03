import React, { useState } from "react";
import styles from "./ListElement.module.scss";

const ListElement = ({ element, onDelete, onUpdate }) => {
  // состояние открытия модалки после кнопки удалить
  const [isModalOpen, setIsModalOpen] = useState(false);
  // состояние открытия модалки после кнопки редактировать
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // состояние поля description которое мы редактируем
  const [editedDescription, setEditedDescription] = useState(
    element.description
  );

  // простая функция на открытие модалки после кнопки удалить
  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  // простая функция на открытие модалки после кнопки редактировать
  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  // функция на удаление поста из сервера через метод Delete
  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/seminars/${element.id}`,
        { method: "DELETE" }
      );

      if (response.ok) {
        alert("Семинар успешно удален");
        // передаем id поста родителю
        onDelete(element.id);
      } else {
        console.log("Ошибка при удалении семинара");
      }
    } catch (error) {
      console.log(error);
    } finally {
      // после всех операций закрываем модалку
      setIsModalOpen(false);
    }
  };

  // простая функция закрытия модалки на кнопку отмена
  const handleCancelDelete = () => {
    setIsModalOpen(false);
  };

  //функция отправки запроса на сервер через метод Patch при нажатии на кнопку сохранить
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
        // получаем наш обновленный пост
        const updatedSeminar = await response.json();
        alert("Описание успешно обновлено");
        // передаем наш обновленный пост родителю
        onUpdate(updatedSeminar);
        // закрываем модалку
        setIsEditModalOpen(false);
      } else {
        console.log("Ошибка при обновлении описания");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // функция если мы отменяем редактирования поста
  const handleCancelEdit = () => {
    setIsEditModalOpen(false);
    // обновляем состояние description т.к textarea У нас контролируемый.
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
