import { useEffect, useState } from 'react';
import FloatingLabelSelect from './FloatingLabelSelect';
import FloatingLabelInput from './FloatingLabelInput';
import PlusIcon from '../assets/outline/Plus.svg';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import SvgColorChanger from '../functions/SvgColorChanger';
import { StrictModeDroppable } from './Kanban/StrictModeDroppable';
import DragIcon from '../assets/outline/Drag.svg';
import TrashIcon from '../assets/outline/Trash.svg';

interface Field {
  type: string;
  name: string;
}
interface FieldEditsControlProps {
  initialFields: Field[];
  addButtonLabel: string;
  onFieldsChange: (fields: Field[]) => void;
}

const FieldEditsControl = ({
  initialFields,
  addButtonLabel,
  onFieldsChange,
}: FieldEditsControlProps) => {
  const [fields, setFields] = useState<Field[]>([]);
  const typeOptions = [
    { id: 1, label: 'text', value: 'text' },
    { id: 2, label: 'url', value: 'url' },
    { id: 3, label: 'email', value: 'email' },
    { id: 4, label: 'password', value: 'password' },
    { id: 5, label: 'textarea', value: 'textarea' },
  ];

  const handleFieldChange = (index: number, field: Partial<Field>) => {
    const updatedFields = fields.map((f, i) =>
      i === index ? { ...f, ...field } : f,
    );
    setFields(updatedFields);
    onFieldsChange(updatedFields);
  };

  const handleAddField = () => {
    const newField = { type: '', name: '' };
    const updatedFields = [...fields, newField];
    setFields(updatedFields);
    onFieldsChange(updatedFields);
  };

  const handleRemoveField = (index: number) => {
    const updatedFields = fields.filter((_, i) => i !== index);
    setFields(updatedFields);
    onFieldsChange(updatedFields);
  };

  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return; // No destination, exit early.

    const reorderedFields = Array.from(fields); // Make a copy of the fields array.

    // Move the dragged field to the new position.
    const [movedField] = reorderedFields.splice(result.source.index, 1);
    reorderedFields.splice(result.destination.index, 0, movedField);

    // After reordering, update the order property for each field based on its index in the array.
    const updatedFields = reorderedFields.map((field, index) => ({
      ...field, // Keep the current properties of the field.
      order: index + 1, // Update the order based on the index.
    }));

    setFields(updatedFields); // Update the state.
    onFieldsChange(updatedFields); // Notify the parent component.
  };

  useEffect(() => {
    if (initialFields) {
      setFields(initialFields);
    }
  }, [initialFields]);

  return (
    <div className="flex flex-col gap-5">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <StrictModeDroppable
          droppableId="fields"
          type="COLUMN"
          direction="vertical"
        >
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="grid gap-4"
            >
              {fields.map((field, index) => (
                <Draggable
                  key={index}
                  draggableId={index.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="grid items-center gap-4"
                    >
                      <div className="flex justify-between">
                        <div className="flex w-full items-center gap-2">
                          <img
                            src={DragIcon}
                            alt="Drag"
                            {...provided.dragHandleProps}
                            className="cursor-pointer"
                          />
                          <p className="text-body-small-reg text-nt-700">
                            Field {index + 1}
                          </p>
                        </div>

                        <button
                          onClick={() => handleRemoveField(index)}
                          className="text-gray-400 hover:text-red-500"
                        >
                          <img src={TrashIcon} alt="Delete" />
                        </button>
                      </div>
                      <div className="flex w-full ">
                        <FloatingLabelSelect
                          sideSelect
                          label="Input Type"
                          options={typeOptions}
                          value={field.type}
                          onChange={(value) =>
                            handleFieldChange(index, { type: value })
                          }
                          flex={1}
                          formSelect
                        />
                        <FloatingLabelInput
                          sideInputRight
                          label="Label"
                          value={field.name}
                          onChange={(value) =>
                            handleFieldChange(index, { name: value })
                          }
                          flex={1}
                        />
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </StrictModeDroppable>
      </DragDropContext>

      <button
        onClick={handleAddField}
        className="primary-btn ghost-btn max-w-max content-center flex items-center gap-2"
      >
        <SvgColorChanger svgPath={PlusIcon} strokeColor="#0046FA" />
        {addButtonLabel}
      </button>
    </div>
  );
};

export default FieldEditsControl;
