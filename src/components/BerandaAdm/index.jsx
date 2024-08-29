import React from 'react';
import Sidebar from '../SideBar/sidebar';
import { FaCheck } from 'react-icons/fa';

const BerandaAdm = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 bg-gray-100 flex items-center justify-center">
        <form className="bg-white p-6 rounded-lg shadow-md max-w-lg w-full">
          {[
            { id: 'teks1', label: 'Teks 1' },
            { id: 'teks2', label: 'Teks 2' },
            { id: 'teks3', label: 'Teks 3' },
          ].map((field) => (
            <div className="mb-6 flex items-center" key={field.id}>
              <label
                htmlFor={field.id}
                className="font-assistant block text-gray-700 font-semibold w-1/6"
              >
                {field.label}
              </label>
              <input
                type="text"
                id={field.id}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button
                type="submit"
                className="ml-4 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <FaCheck />
              </button>
            </div>
          ))}
          <div className="mb-6 flex items-center">
            <label
              htmlFor="fileUpload"
              className="font-assistant block text-gray-700 font-semibold w-1/6"
            >
              Unggah Gambar
            </label>
            <input
              type="file"
              id="fileUpload"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              type="submit"
              className="ml-4 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <FaCheck />
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default BerandaAdm;