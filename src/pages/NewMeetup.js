/* eslint-disable react-hooks/rules-of-hooks */
import { useHistory } from "react-router-dom";
import NewMeetupForm from '../components/meetups/NewMeetupForm';

function NewMeetupPage() {
    //do not call in event handlers
  const history = useHistory();
  
  function addMeetupHandler(meetupData) {
    
    // standard js function to send http request
    // first arg is the url of request location
    // second arg is an object to configure http request
    fetch(
        'https://starter-63328-default-rtdb.firebaseio.com/meetups.json',
        {
            method: 'POST',
            body: JSON.stringify(meetupData),
            header: {
                'Content-Type': 'application/json'
            }
        }
    ).then(() => {
        history.replace('/');
    });
  }

  return (
    <section>
      <h1>Add Meetup Page</h1>
      {/* added onAddmeetup prop to get data from NewMeetupForm */}
      <NewMeetupForm onAddMeetup={addMeetupHandler}/>
    </section>
  );
}

export default NewMeetupPage;
