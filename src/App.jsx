import { act, useState } from "react";
import styles from "./App.module.css";
import data from "./data/data.json";

export const App = () => {
  // Можно задать 2 состояния — steps и activeIndex

  const [steps, setSteps] = useState(data);

  const [activeIndex, setActiveIndex] = useState(1);

  const [currentContent, setCurrentContent] = useState("");

  // И определить 3 обработчика: Клик назад, Клик вперед, Начать сначала

  // И 2 переменных-флага — находимся ли мы на первом шаге, и находимся ли на последнем
  const thisFirstStep = Number(activeIndex) < 1;
  const thisLastStep = activeIndex <= 7;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Инструкция по готовке пельменей</h1>
        <div className={styles.steps}>
          <div className={styles["steps-content"]}>{currentContent}</div>
          <ul className={styles["steps-list"]}>
            {steps.map(({ id, title, content }) => (
              <li
                key={id}
                className={
                  id <= activeIndex
                    ? styles["steps-item"] +
                      " " +
                      styles.done +
                      " " +
                      styles.active
                    : styles["steps-item"]
                }
              >
                <button
                  onClick={() => {
                    setCurrentContent(content);
                    setActiveIndex(id);
                  }}
                  className={styles["steps-item-button"]}
                >
                  {id.slice(2)}
                </button>
                {title}
              </li>
            ))}
          </ul>
          <div className={styles["buttons-container"]}>
            <button
              onClick={() => {
                setActiveIndex((activeIndex) => Number(activeIndex) - 1);
                steps.forEach(({ id, content }) => {
                  if (id == activeIndex) {
                    setCurrentContent(content);
                  }
                });
              }}
              disabled={thisFirstStep ? true : false}
              className={styles.button}
            >
              Назад
            </button>
            <button
              onClick={
                thisLastStep
                  ? () => {
                      setActiveIndex((activeIndex) => Number(activeIndex) + 1);
                      steps.forEach(({ id, content }) => {
                        if (id == activeIndex) {
                          setCurrentContent(content);
                        }
                      });
                    }
                  : setActiveIndex(1)
              }
              className={styles.button}
            >
              {activeIndex < 7 ? "Далее" : "Начать сначала"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
