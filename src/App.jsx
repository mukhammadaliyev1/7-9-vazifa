import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add, remove, clearAll, update } from "../src/store/cartSlice";
import Modal from "./Modal";

const App = () => {
  const dispatch = useDispatch();
  const students = useSelector((state) => state.cart.value);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(add({ name, age: Number(age) }));
    setName("");
    setAge("");
  };

  const handleUpdate = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleUpdateSubmit = (updatedStudent) => {
    dispatch(update(updatedStudent));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-600 flex flex-col items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Talabalar Ro'yxati
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ism"
            required
            className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Yosh"
            required
            className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white rounded p-2 w-full hover:bg-blue-600 transition duration-200"
          >
            Qo'shish
          </button>
          <button
            type="button"
            onClick={() => dispatch(clearAll())}
            className="bg-red-500 text-white rounded p-2 w-full hover:bg-red-600 transition duration-200"
          >
            Barchasini tozalash
          </button>
        </form>
        <ul className="mt-4 space-y-2">
          {students.length === 0 ? (
            <li className="text-center text-gray-500">Talabalar yo'q</li>
          ) : (
            students.map((student) => (
              <li
                key={student.id}
                className="flex justify-between items-center bg-gray-100 p-2 rounded-lg shadow hover:shadow-md transition duration-200"
              >
                <span className="font-semibold">{student.name}</span>
                <span className="text-gray-600">({student.age})</span>
                <button
                  onClick={() => dispatch(remove({ id: student.id }))}
                  className="bg-red-500 text-white rounded p-1 hover:bg-red-600 transition duration-200"
                >
                  O'chirish
                </button>
                <button
                  className="update"
                  onClick={() => handleUpdate(student)}
                >
                  Yangilash
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpdate={handleUpdateSubmit}
        student={selectedStudent}
      />
    </div>
  );
};

export default App;
