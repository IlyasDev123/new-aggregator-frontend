import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Logout } from 'shared/services/authService';
import { resetUser } from 'src/shared/redux/reducers/userSlice';
import { toastMessage } from '../../toast';

const Header = () => {
  const dispatch = useDispatch();
  const {
    user: { user },
  } = useSelector((state) => state.root);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const userLogout = () => {
    Logout()
      .then(() => {
        dispatch(resetUser());
        localStorage.clear();
        toastMessage('success', 'Logout successfully');
      })
      .catch((error) => {
        toastMessage('error', error.response.data.message);
      });
  };

  return (
    <header className="flex justify-between items-center mb-8 bg-blue-800 h-20 p-10">
      <h1 className="text-3xl font-bold text-white">Task Project</h1>
      <div className="relative">
        <div className="flex flex-col items-center">
          <button onClick={toggleDropdown} className="focus:outline-none">
            <img
              src="https://picsum.photos/200/300"
              alt="profile"
              className="rounded-full w-12 h-12 object-cover overflow-hidden border-2 border-gray-300"
            />

            <span className="text-white text-md font-semibold pt-4">
              {user?.name}
            </span>
          </button>
        </div>

        {isOpen && (
          <div className="absolute top-12 right-0 bg-white shadow-lg rounded-md p-4">
            {/* User settings dropdown content */}
            <ul>
              <li className="mt-1 mb-1">
                <Link
                  to="/setting"
                  onClick={toggleDropdown}
                  className="cursor-pointer hover:bg-gray-200 py-1 px-2 rounded"
                >
                  Settings
                </Link>
              </li>
              <li className="mb-1">
                <Link
                  onClick={userLogout}
                  className="cursor-pointer hover:bg-gray-200 py-1 px-2 rounded"
                >
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
