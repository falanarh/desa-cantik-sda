import React from 'react';
import Sidebar from '../SideBar/sidebar';
import { FaCheck } from 'react-icons/fa';

const DescAdmin = () => {
  const formFields = [
    { id: 'judul', label: 'Judul' },
    { id: 'sub', label: 'Sub Judul' },
    { id: 'isi', label: 'Isi' },
    { id: 'link', label: 'Tautan Video' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 flex justify-center items-center p-12">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-xl w-full">
          <form className="space-y-6">
            {formFields.map((field) => (
              <div className="flex items-center space-x-5" key={field.id}>
                <label
                  htmlFor={field.id}
                  className="block text-gray-800 font-medium w-1/5 transition-transform transform hover:translate-x-1"
                >
                  {field.label}
                </label>
                <input
                  type="text"
                  id={field.id}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-shadow"
                />
                <button
                  type="submit"
                  className="bg-orange-500 text-white px-4 py-3 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
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

export default DescAdmin;
