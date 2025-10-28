import React from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
  return (
    <div className="signup-page bg-black min-h-screen flex justify-center items-center">
      <div className="text-center">
        <div className="flex flex-row">
          <Link to="/hospital/signup">
            <button className="signup-button bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full mr-4 focus:outline-none focus:shadow-outline transition duration-300">
              Hospital SignUp
            </button>
          </Link>
          <Link to="/patient/signup">
            <button className="signup-button bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-300">
              Patient SignUp
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
