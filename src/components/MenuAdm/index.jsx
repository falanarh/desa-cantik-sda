import React, { useState } from 'react';
import Sidebar from "../SideBar/sidebar.jsx";
import { Accordion, AccordionItem, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, Button, useDisclosure } from "@nextui-org/react";
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const MenuAdm = () => {
  const [accordionItems, setAccordionItems] = useState([
    { id: 1, title: "Beranda" },
    { id: 2, title: "Buletin" },
    { id: 3, title: "Peta Tematik" },
    { id: 4, title: "Tentang Kami" },
  ]);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [currentItem, setCurrentItem] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [modalMode, setModalMode] = useState("add");

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
    onOpen(); // Open the modal
  };

  const handleCloseModal = () => {
    onOpenChange(false); // Close the modal
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
        <Button
          color="warning"
          auto
          className='text-white font-inter font-semibold text-md bg-[#fcc300] mt-10 ml-4'
          onPress={() => handleOpenModal('add')}
        >
          <FaPlus /> Tambah Menu
        </Button>
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
                  <button className='bg-transparent m-0 p-0' auto flat onClick={() => handleOpenModal('edit', item)}>
                    <FaEdit className="text-orange-700" />
                  </button>
                  <button className='bg-transparent m-0 p-0' auto flat>
                    <FaTrash className="text-red-800" />
                  </button>
                </div>
                  <Button
                    auto
                    flat
                    className="ml-5 flex items-center gap-2 font-assistant font-medium text-orange-700 bg-transparent"
                    onPress={() => handleOpenModal('add')}
                  >
                    <FaPlus className="text-orange-700" /> Sub Menu
                  </Button>
                </div>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Add/Edit Modal */}
        <Modal
          isOpen={isOpen}
          className="bg-[#f5f5f5]"
          isDismissable={false} 
          isKeyboardDismissDisabled={true} 
          hideCloseButton={true}
          onClose={handleCloseModal}
        >
          <ModalContent>
            <ModalHeader>
            <div className="flex justify-between w-full">
              <h3 className="text-[18px] text-[#c46024] font-inter font-bold">
                {modalMode === 'add' ? "Tambah Menu" : "Edit Menu"}
              </h3>
              <button 
                className="text-xl text-[#BB5A5A]"
                onClick={handleCloseModal} // Use the function that handles modal closing
              >
                &times;
              </button>
            </div>
            </ModalHeader>
            <ModalBody>
              <label className="font-assistant">Judul Menu:</label>
              <Input
                placeholder="Masukkan judul menu"
                fullWidth
                value={newTitle}
                className="font-assistant border rounded-xl"
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <label className="font-assistant">Tautan:</label>
              <Input
                placeholder='Masukkan tautan'
                fullWidth
                value={newTitle}
                className="font-assistant border rounded-xl"
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button className='text-white font-inter font-semibold bg-[#fcc300]' auto onPress={handleSaveItem}>
                Simpan
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </main>
    </div>
  );
};

export default MenuAdm;
