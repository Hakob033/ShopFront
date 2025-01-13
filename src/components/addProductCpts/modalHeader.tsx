import IconX from "../../app/icons/iconX";

interface ModalHeaderProps {
  onClose: () => void;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ onClose }) => (
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-xl font-semibold text-gray-800">New Product</h2>
    <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
      <IconX />
    </button>
  </div>
);

export default ModalHeader;
