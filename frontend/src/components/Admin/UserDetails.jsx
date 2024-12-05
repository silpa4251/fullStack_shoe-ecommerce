import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance';
import endpoints from '../../api/endpoints';

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await axiosInstance.get(endpoints.ADMIN.GET_SINGLE_USER(id)); // Adjusted endpoint
        setUser(res.data.data.user); // Assuming the user object is in `data.data.user` as per your controller's response
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user details:', error);
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-bold text-gray-600">Loading user details...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-bold text-red-600">User not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
      <h2 className="text-3xl font-bold mb-6 text-pink">User Details: {user.username}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone || 'N/A'}</p>
        <p><strong>Gender:</strong> {user.gender || 'N/A'}</p>
        <p><strong>Address:</strong> {user.address || 'N/A'}</p>
        <p><strong>Status:</strong> {user.blocked ? <span className="text-red-600">Blocked</span> : <span className="text-green-600">Active</span>}</p>
      </div>

      <h3 className="text-2xl font-semibold text-pink mb-4 border-b pb-2">Order History</h3>
      {user.orders && user.orders.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-gray-50 rounded-lg shadow-md mt-4">
            <thead>
              <tr className="bg-gray-300 text-gray-800 uppercase text-sm font-bold">
                <th className="py-3 px-4 text-left">Order ID</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Total Price</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Items</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {user.orders.map((order) => (
                <tr key={order._id} className="border-b border-gray-200 hover:bg-gray-200">
                  <td className="py-3 px-4">{order._id}</td>
                  <td className="py-3 px-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="py-3 px-4 text-green-600 font-bold">Rs.{order.totalPrice}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-lg text-sm ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {order.ordered_Items.map((item, index) => (
                      <div key={index} className="flex items-center mb-4 bg-white rounded-lg p-4 shadow-md">
                        <div className="w-20 h-20">
                          <img
                            src={item.image || 'https://via.placeholder.com/100'}
                            alt={item.name}
                            className="w-full h-full object-cover rounded-md shadow"
                          />
                        </div>
                        <div className="ml-4">
                          <p className="font-semibold text-lg text-gray-800">{item.name}</p>
                          <p className="text-gray-500">Quantity: {item.quantity}</p>
                          <p className="text-gray-500">Price: Rs.{item.price}</p>
                        </div>
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600 mt-4">No orders found.</p>
      )}
      <div className="mt-6">
        <Link to="/admin/users" className="text-grey-light bg-pink-light font-bold py-2 px-6 rounded transition duration-300">
          Back to Users
        </Link>
      </div>
    </div>
  );
};

export default UserDetails;
