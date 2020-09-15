const initialState = {
    userHistory: []
  };
  
  const reducer = (state = initialState, action) => {
    const newState = { ...state };
    // eslint-disable-next-line default-case
    switch (action.type) {
      case "STORE_USER":
        let user = state.userHistory.concat({user : action.value})
        localStorage.setItem('userList' , JSON.stringify(user))
        return {
          ...state,
          userHistory: user
        };
    }
    return newState;
  };
  
  export default reducer;