import React from "react";

interface Step2Props {
  description: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBack: () => void;
  onSave: () => void;
}

const Step2: React.FC<Step2Props> = ({
  description,
  onChange,
  onBack,
  onSave,
}) => (
  <div>
    <textarea
      name="description"
      placeholder="Description"
      value={description}
      onChange={onChange}
      className="w-full h-40 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-medium"
    />
    <div className="flex justify-between mt-6">
      <button
        onClick={onBack}
        className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
      >
        Back
      </button>
      <button
        onClick={onSave}
        className="px-6 py-2 bg-medium text-white rounded-lg hover:bg-dark"
      >
        Add
      </button>
    </div>
  </div>
);

export default Step2;
