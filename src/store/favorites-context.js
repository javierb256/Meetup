import { createContext, useState } from "react";

//This object contains a react component. Start with a captial letter for component names
//argument can be anything
//Need a way to change and add values
const FavoritesContext = createContext({
  favorites: [],
  totalFavorites: 0,
  //helps with autocompletion within the IDE later
  addFavorite: (favoriteMeetup) => {},
  removeFavorite: (meetupId) => {},
  itemIsFavorite: (meetupId) => {},
});

//This is a regular react component that will provide context to the components that need values from it
//Will also update context values
export function FavoritesContextProvider(props) {
  //an array of favorited meetups
  const [userFavorites, setUserFavorites] = useState([]);

  //returns a new favorite when it is added
  function addFavoriteHandler(favoriteMeetup) {
    setUserFavorites((prevUserFavorites) => {
      //return new array with added favorite
      return prevUserFavorites.concat(favoriteMeetup);
    });
  }

  //A handler that runs when removing a favorite
  function removeFavoriteHandler(meetupId) {
    //runs a function with the previous favorites array
    setUserFavorites(prevUserFavorites => {
      //filters out the removed favorite and returns a new array
      return prevUserFavorites.filter(meetup => meetup.id !== meetupId);
    });
  }

  //returns true if sent meetupId is a favorite
  function itemIsFavoriteHandler(meetupId) {
    return userFavorites.some(meetup => meetup.id === meetupId);
  }

  const context = {
    //favorites property is set to current userFavorites so that we the actual value changes so too does the
    //favorites property change. And passing it up to the components that are wrapped
    favorites: userFavorites,
    totalFavorites: userFavorites.length,
    // These are pointers to the functions defined above to be called on whenever
    addFavorite: addFavoriteHandler,
    removeFavorite: removeFavoriteHandler,
    itemIsFavorite: itemIsFavoriteHandler,
  };

  //returns a Provider component that FavoritesContext has built in
  //It will be wrapped around all the components that are interested in interacted with this context
  return (
    <FavoritesContext.Provider value={context}>
      {/* wrap provider component around props.childen
        so no we can wrap FavoritesContext component around other components
        those components will be wrapped by context automatically */}
      {props.children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesContext;
