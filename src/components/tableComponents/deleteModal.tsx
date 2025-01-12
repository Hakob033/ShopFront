const DeleteModal = ({ isModalOpen, confirmDelete, cancelDelete }) => {
  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold">
          Do you want to remove the product?
        </h2>
        <div className="mt-4 flex justify-center space-x-2">
          <button
            onClick={cancelDelete}
            className="px-4 py-2 text-gray-700 bg-[#0F16170D] rounded-lg"
          >
            No, Cancel
          </button>
          <button
            onClick={confirmDelete}
            className="px-4 py-2 text-white bg-[#FF115C] rounded-lg"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
