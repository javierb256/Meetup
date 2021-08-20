import { useState, useEffect } from 'react';
import MeetupList from '../components/meetups/MeetupList';

function AllMeetupsPage() {
  const [isLoading, setIsLoading] = useState(false);
  //data that has been loaded from the fetch request
  const [loadedMeetups, setLoadedMeetups] = useState([]);

  //useEffect runs code under certain conditions, takes 2 arguments an annonymous arrow function and an array of dependencies
  useEffect(() => {
    //setIsLoading to true at the start each time whenever code is rerun again to reset it
    setIsLoading(true);
    //call fetch on page load to get data from db
    fetch('https://starter-63328-default-rtdb.firebaseio.com/meetups.json'
    // once a response promise is received convert the response into json
    ).then((response) => {
      return response.json();
      //data is being fetched
    }).then((data) => {
      const meetups = [];

      //go through all the keys in data from firebase
      for (const key in data){
        const meetup = {
          id: key,
          //use spread operator to value all key value pairs into this object
          ...data[key]
        };

        meetups.push(meetup);
      }



      //change loading state to false
      //this could cause an infinite loop without useEffect
      setIsLoading(false);
      setLoadedMeetups(meetups);
  });

  //an empty dependency would then run useEffect only once when the component renders
  //if any items inside the array have changed since the last time the code was run then it would run again
  }, [])

  if (isLoading) {
    return <section>
      <p>Loading...</p>
    </section>
  }

  return (
    <section>
      <h1>All Meetups</h1>
      <MeetupList meetups={loadedMeetups} />
    </section>
  );
}

export default AllMeetupsPage;
