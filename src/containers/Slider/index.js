import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtB.date) - new Date(evtA.date) // Date la plus éloigné - > proche
  );

  const nextCard = () => { // Tableau de slides
    if (byDateDesc) {
      setIndex((idx) => (idx < byDateDesc.length - 1 ? idx + 1 : 0));
    }
  };

  const handleClick = (selectedIndex) => { // Ajout de la fonction de gestion du clic
    setIndex(selectedIndex);
  };

  useEffect(() => { 
    const timer = setInterval(() => {
      nextCard();
    }, 4000); // 4 secondes avant le prochain slide
    return () => {
      clearInterval(timer);
    };
  }, [index]);

  return (
    <div className="SlideCardList" style={{ overflowX: "hidden", overflowY: "hidden" }}>
      {byDateDesc?.map((event, idx) => (
        <div
          key={event.title}
          className={`SlideCard SlideCard--${index === idx ? "display" : "hide"
            }`}
        >
          <img
            className="SlideCard__pictureEvent"
            src={event.cover}
            alt="forum"
          />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc?.map((_, radioIdx) => (
            <input
              key={`${_.title}`}
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
              readOnly
              onClick={() => handleClick(radioIdx)} // Ajout de l'écouteur de clic
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
