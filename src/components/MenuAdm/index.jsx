import React, { useState } from 'react';
import Sidebar from "../SideBar/sidebar.jsx";
import { Accordion, AccordionItem, Modal, Input, Button } from "@nextui-org/react";
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const MenuAdm = () => {
  const [accordionItems, setAccordionItems] = useState([
    { id: 1, title: "Beranda" },
    { id: 2, title: "Buletin" },
    { id: 3, title: "Peta Tematik" },
    { id: 4, title: "Tentang Kami" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [currentItem, setCurrentItem] = useState(null);
  const [newTitle, setNewTitle] = useState("");

  // Open modal for add or edit
  const handleOpenModal = (mode, item = null) => {
    setModalMode(mode);
    if (mode === 'edit' && item) {
      setCurrentItem(item);
      setNewTitle(item.title);
    } else {
      setNewTitle("");
      setCurrentItem(null);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewTitle("");
    setCurrentItem(null);
  };

  // Handle adding or editing an item
  const handleSaveItem = () => {
    if (modalMode === 'add') {
      setAccordionItems([...accordionItems, { id: accordionItems.length + 1, title: newTitle }]);
    } else if (modalMode === 'edit' && currentItem) {
      setAccordionItems(
        accordionItems.map(item =>
          item.id === currentItem.id ? { ...item, title: newTitle } : item
        )
      );
    }
    handleCloseModal();
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="w-[80%] mx-auto">
        <button
          className="mt-8 m-4 bg-[#fcc300] text-white font-inter font-medium flex items-center px-3 py-2 rounded-lg hover:bg-[#e9b401] focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
          onClick={() => handleOpenModal('add')}
        >
          <FaPlus className="mr-2" /> Tambah Menu
        </button>
        <div className="mx-auto w-full p-2">
          <Accordion
            variant="splitted"
            className="rounded-lg overflow-hidden py-5"
            fullWidth={true}
          >
            {accordionItems.map((item) => (
              <AccordionItem
                key={item.id}
                aria-label={item.title}
                title={
                  <span className="text-lg font-inter font-medium text-gray-700">
                    {item.title}
                  </span>
                }
                className="relative w-full"
              >
                <div className="flex items-center justify-between p-1">
                  <div className="flex gap-3">
                    <button onClick={() => handleOpenModal('edit', item)}>
                      <FaEdit className="text-orange-700" />
                    </button>
                    <button>
                      <FaTrash className="text-orange-700" />
                    </button>
                  </div>
                  <button
                    className="ml-5 flex items-center gap-2 font-assistant font-medium text-orange-700"
                    onClick={() => handleOpenModal('add')}
                  >
                    <FaPlus className="text-orange-700" /> Sub Menu
                  </button>
                </div>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Add/Edit Modal */}
        <Modal
          open={isModalOpen}
          onClose={handleCloseModal}
        >
          <Modal.Header>
            <h3 className="font-inter font-medium text-lg">
              {modalMode === 'add' ? "Tambah Menu" : "Edit Menu"}
            </h3>
          </Modal.Header>
          <Modal.Body>
            <Input
              label="Judul Menu"
              placeholder="Masukkan judul menu"
              fullWidth
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button auto flat color="error" onClick={handleCloseModal}>
              Batal
            </Button>
            <Button auto onClick={handleSaveItem}>
              Simpan
            </Button>
          </Modal.Footer>
        </Modal>
      </main>
    </div>
  );
};

export default MenuAdm;
