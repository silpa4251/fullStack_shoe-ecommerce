import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, editProfile } from '../features/profileSlice';

const Profile = ({ userId }) => {
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((state) => state.profile);

  useEffect(() => {
    if (userId) {
      dispatch(fetchProfile(userId));
    }
  }, [dispatch, userId]);

  const handleUpdateProfile = (updatedData) => {
    dispatch(editProfile({ userId, updatedData }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div>
      <h2>User Profile</h2>
      {profile ? (
        <div>
          <p>Name: {profile.name}</p>
          <p>Email: {profile.email}</p>
          <button onClick={() => handleUpdateProfile({ name: 'New Name' })}>
            Update Profile
          </button>
        </div>
      ) : (
        <p>No profile found</p>
      )}
    </div>
  );
};

export default Profile;
