import React, { useState } from "react";
import { ItemType } from "../types";

interface EditableRowProps {
  item: ItemType;
  onSave: (updatedItem: ItemType) => void;
  onCancel: () => void;
  onDelete: (id: number) => void;
}

const EditableRow: React.FC<EditableRowProps> = ({
  item,
  onSave,
  onCancel,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(item.name);
  const [tempStock, setTempStock] = useState(item.stock);

  // When edit is clicked, isEditing is set to true
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // when save is clicked, the name and stock are updated rest things remain the same (id, in this case)
  // and editing is set to false, since we have clicked save
  const handleSaveClick = () => {
    onSave({ ...item, name: tempName, stock: tempStock });
    setIsEditing(false);
  };

  // When cancel is clicked, original names are set again, i.e. the changes are reverted and isEditing is set to false
  const handleCancelClick = () => {
    setTempName(item.name);
    setTempStock(item.stock);
    setIsEditing(false);
    // onCancel(); // not really useful right now, we can add additional features on cancel
  };

  return (
    <tr className="bg-white border-b" key={item.id}>
      <td className="p-6">{item.id}</td>
      {isEditing ? (
        // When the user is editing, 2 inputs will be rendered where the changes will we stored to setTempName and setTempStock
        <>
          <td className="p-6">
            <input
              type="text"
              value={tempName}
              className="border-b outline-none"
              onChange={(e) => setTempName(e.target.value)}
            />
          </td>
          <td className="p-6">
            <input
              type="number"
              value={tempStock}
              className="border-b outline-none"
              onChange={(e) => setTempStock(Number(e.target.value))}
            />
          </td>
        </>
      ) : (
        // If the user is not editing this row than items normally render
        <>
          <td className="p-6">{item.name}</td>
          <td className="p-6">{item.stock}</td>
        </>
      )}
      <td className="p-6 flex gap-5">
        {isEditing ? (
          // When the user is editing, he will have two options, either to save or cancel
          <div className="flex gap-5">
            <button
              className="px-2 py-1 bg-blue-400 text-white rounded-md"
              onClick={handleSaveClick}
            >
              Save
            </button>
            <button
              className="px-2 py-1 bg-red-500 text-white rounded-md"
              onClick={handleCancelClick}
            >
              Cancel
            </button>
          </div>
        ) : (
          // When not editing, the options are to either edit or to delete the item
          <>
            <button
              className="px-2 py-1 bg-blue-400 text-white rounded-md"
              onClick={handleEditClick}
            >
              Edit
            </button>
            <button
              className="px-2 py-1 bg-red-500 text-white rounded-md"
              onClick={() => onDelete(item.id)}
            >
              Delete
            </button>
          </>
        )}
      </td>
    </tr>
  );
};

export default EditableRow;
