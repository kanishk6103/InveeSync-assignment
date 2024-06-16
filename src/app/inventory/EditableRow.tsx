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

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onSave({ ...item, name: tempName, stock: tempStock });
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setTempName(item.name);
    setTempStock(item.stock);
    setIsEditing(false);
    onCancel();
  };

  return (
    <tr className="bg-white border-b" key={item.id}>
      <td className="p-6">{item.id}</td>
      {isEditing ? (
        <>
          <td className="p-6">
            <input
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
            />
          </td>
          <td className="p-6">
            <input
              type="number"
              value={tempStock}
              onChange={(e) => setTempStock(Number(e.target.value))}
            />
          </td>
        </>
      ) : (
        <>
          <td className="p-6">{item.name}</td>
          <td className="p-6">{item.stock}</td>
        </>
      )}
      <td className="p-6 flex gap-5">
        {isEditing ? (
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
