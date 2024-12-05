const getUserId = () => {
  const user = localStorage.getItem('user'); 

  if (user) {
    try {
      const parsedUser = JSON.parse(user); 
      if (Array.isArray(parsedUser) && parsedUser.length > 0) {
        const userId = parsedUser[0]._id;
        return userId; 
    } else if (parsedUser._id) {
      return parsedUser._id;
    } else {
      console.error("No valid _id found in user data.");
      return null;
    }
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  }

  return null;
};

export default getUserId;
