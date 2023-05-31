/* eslint-disable no-unused-vars */
import React, { useState ,useEffect } from "react";
import { useList } from "react-firebase-hooks/database";
import CitiesDataService from "../services/CitiesService";
import CitiesWasService from "../services/CitiesWasAlertService";
import alarm from "../assets/sound.mp3"
import {useFirebaseList} from 'react-firebase-hooks/database'
import firebase from "../firebase";


const TutorialsList = () => {
  // const [tutorials, setTutorials] = useState([]);
  const [currentTutorial, setCurrentTutorial] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [checkIndex, setCheckIndex] = useState(0);
  const [alarmAudio, setAudio] = useState( new Audio(alarm) )
  const [timers,setTimers] = useState({});
  const [timersIds,setTimersIds] = useState([]);
  
  

  /* use react-firebase-hooks */
  const [tutorials, loading, error] = useList(CitiesDataService.getAll());
  const [cityWasAlert] = useList(CitiesWasService.getAll());
  // const [tutorials, loading, error] = useList(dbRef.orderByKey()) 
  

  useEffect(() => {
    const handleChildAdded = (snapshot, previousKey) => {
      const addedItem = {
        key: snapshot.key,
        value: snapshot.val(),
      };


      alarmAudio.pause();
      alarmAudio.currentTime = 0;
      var nopromise = {
        // eslint-disable-next-line no-new-func
        catch : new Function()
      };
      (alarmAudio.play() || nopromise).catch(function(){});

      const timerId = setTimeout(() => {
        deleteTutorial(addedItem.key)
        delete timers[addedItem.key]
      }, addedItem.value.countdown*1000);
      // const itemKey = addedItem.key
      // const newTimer = {[addedItem.key]:timerId} 
      setTimersIds([...timersIds, timerId])
      // Trigger your logic for when an item is added
    };
  
    const handleChildRemoved = (snapshot) => {
      const removedItem = {
        key: snapshot.key,
        value: snapshot.val(),
      };
      if (tutorials.length === 0) {
        alarmAudio.pause();
        alarmAudio.currentTime = 0;
      }
      };
    CitiesDataService.db.on('child_added', handleChildAdded);
    CitiesDataService.db.on('child_removed', handleChildRemoved);

    return () => {
      CitiesDataService.db.off('child_added', handleChildAdded);
      CitiesDataService.db.off('child_removed', handleChildRemoved);
    };
  }, []);
    

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
    if (num === 23) return "list-group-item-success"
    if (num < 31) return "list-group-item-danger"
    return "list-group-item-warning"
  }
  const refreshList = () => {
    setCurrentTutorial(null);
    setCurrentIndex(-1);
  };

  const removeAllTutorials = () => {
      timersIds.forEach((timer)=>{
      clearTimeout(timer)
    })


    CitiesWasService.removeAll()
    .then(() => {
      // refreshList();
      
        alarmAudio.pause();
        alarmAudio.currentTime = 0;
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
