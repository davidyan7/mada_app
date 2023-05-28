import React, { useState ,useEffect } from "react";
import { useList } from "react-firebase-hooks/database";
import CitiesDataService from "../services/CitiesService";
import CitiesWasService from "../services/CitiesWasAlertService";
import Tutorial from "./Tutorial";

const TutorialsList = () => {
  // const [tutorials, setTutorials] = useState([]);
  const [currentTutorial, setCurrentTutorial] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  /* use react-firebase-hooks */
  const [tutorials, loading, error] = useList(CitiesDataService.getAll());
  const [cityWasAlert] = useList(CitiesWasService.getAll());

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const deleteTutorial = (key) => {
    CitiesDataService.remove(key)
      .then(() => {
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  
  useEffect(() => {
    // if (tutorials)return
    // tutorials.forEach(element => {
    //   setTimeout((element) => {
    //     deleteTutorial(element.ref_.key)
    //   }, element.ref_.countdown*1000);
    // });
    tutorials.map((tutorial, index) => {
      const city = tutorial.val()
      setTimeout(() => {

        CitiesWasService.create(city)
        deleteTutorial(tutorial.key)
      }, city.countdown*1000);
   })
  
  }, [tutorials,deleteTutorial])
  

  /* manually listen for value events
  const onDataChange = (items) => {
    let tutorials = [];

    items.forEach((item) => {
      let key = item.key;
      let data = item.val();
      tutorials.push({
        key: key,
        title: data.title,
        description: data.description,
        published: data.published,
      });
    });

    setTutorials(tutorials);
  };

  useEffect(() => {
    TutorialDataService.getAll().on("value", onDataChange);

    return () => {
      TutorialDataService.getAll().off("value", onDataChange);
    };
  }, []);
  */

  const refreshList = () => {
    setCurrentTutorial(null);
    setCurrentIndex(-1);
  };

  const setActiveTutorial = (tutorial, index) => {
    const { title, description, published } = tutorial.val(); /* tutorial */

    setCurrentTutorial({
      key: tutorial.key,
      title,
      description,
      published,
    });

    setCurrentIndex(index);
  };

  const removeAllTutorials = () => {
    CitiesWasService.removeAll()
      .then(() => {
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  

  return (
    <div className="">
      <div className="">
      <div className="about">
      <div className="main1">
        <h2>התרעות חדשות</h2>
        {error && <strong>Error: {error}</strong>}
        {loading && <span>Loading...</span>}
        <ul className="list-group">
          {!loading &&
            tutorials &&
            tutorials.map((tutorial, index) => (
              <li
                className={"list-group-item " + (index === currentIndex ? "active" : "")}
                onClick={() => setActiveTutorial(tutorial, index)}
                key={index}
              >
                {tutorial.val().name}
                {/* tutorial.title */}
              </li>
            ))}
        </ul>
      </div>
      <div className="main2">
        <h2>ארכיון</h2>
        <ul className="list-group">
        {!loading &&
            cityWasAlert &&
            cityWasAlert.map((tutorial, index) => (
              <li
                className={"list-group-item " + (index === currentIndex ? "active" : "")}
                onClick={() => setActiveTutorial(tutorial, index)}
                key={index}
              >
                {tutorial.val().name}
                {/* tutorial.title */}
              </li>
            ))}
        </ul>
      </div>

    </div>

        

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllTutorials}
        >
          Remove All
        </button>
      </div>
      
    </div>
  );
};

export default TutorialsList;
