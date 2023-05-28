import React, { useState ,useEffect } from "react";
import { useList } from "react-firebase-hooks/database";
import CitiesDataService from "../services/CitiesService";
import CitiesWasService from "../services/CitiesWasAlertService";
import alarm from "../assets/sound.mp3"
import Tutorial from "./Tutorial";

const TutorialsList = () => {
  // const [tutorials, setTutorials] = useState([]);
  const [currentTutorial, setCurrentTutorial] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [checkIndex, setCheckIndex] = useState(0);
  const [alarmAudio, setAudio] = useState( new Audio(alarm) )
  const [isPlay, setPlay] = useState(false)
  

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


  const getColor=(num)=>{
    if (num < 31) return "list-group-item-danger"
    return "list-group-item-warning"
  }
  
  useEffect(() => {
    // if (isMute) return
    console.log(tutorials.length,"tutorials.length,");
    console.log(checkIndex,"checkIndex");
    // eslint-disable-next-line no-unused-expressions
    if (tutorials.length === 0) return
    if (checkIndex >= tutorials.length) return
    if (tutorials.length >0){
      alarmAudio.pause();
      alarmAudio.currentTime = 0;
      var nopromise = {
        // eslint-disable-next-line no-new-func
        catch : new Function()
      };
      (alarmAudio.play() || nopromise).catch(function(){}); ;
    }
      
    
    setCheckIndex(tutorials.length)
    
    tutorials.map((tutorial, index) => {
      const city = tutorial.val()
      setTimeout(() => {
        deleteTutorial(tutorial.key)
      }, city.countdown*1000);
   })
  
  }, [tutorials,deleteTutorial])
  


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
              className={`text-dark list-group-item " ${getColor(tutorial.val().countdown)} `}                key={index}
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
        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllTutorials}
        >
          Remove All
        </button>
        {!loading &&
            cityWasAlert &&
            cityWasAlert.map((tutorial, index) => (
              <li
                className={`text-dark list-group-item " ${getColor(tutorial.val().countdown)} `}
                key={index}
              >
                {tutorial.val().name}
                {/* tutorial.title */}
              </li>
            ))}
        </ul>
      </div>

    </div>

        

     
      </div>
      
    </div>
  );
};

export default TutorialsList;
