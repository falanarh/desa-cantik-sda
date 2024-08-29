import React from 'react';
import Sidebar from '../SideBar/sidebar';
import { FaCheck } from 'react-icons/fa';

const StatAdm = () => {
  const formFields = [
    { id: 'kec', label: 'Kecamatan' },
    { id: 'des', label: 'Desa' },
    { id: 'rt', label: 'RT' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 flex justify-center items-center p-12">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-lg w-full mx-auto animate-fade-in-up">
          <form className="space-y-5">
            {formFields.map((field) => (
              <div className="flex items-center space-x-4 animate-slide-in" key={field.id}>
                <label
                  htmlFor={field.id}
                  className="block text-gray-700 font-medium w-1/6 transition-transform transform hover:translate-x-1"
                >
                  {field.label}
                </label>
                <input
                  type="text"
                  id={field.id}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-shadow"
                />
                <button
                  type="submit"
                  className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                >
                  <FaCheck />
                </button>
              </div>
            ))}
          </form>
        </div>
      </main>
    </div>
  );
};

export default StatAdm;
