import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { cn } from "lib/utils";
import React, { useEffect, useState } from "react";
import { Grip, TrashIcon } from "lucide-react";

export const KeyLearningObjectivesList = ({ items, onDelete, onReorder }) => {
  const [objectives, setobjectives] = useState(items);
  useEffect(() => {
    setobjectives(items);
  }, [items]);

  const onDragEnd = () => {};
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="keyObjectives">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {objectives?.map((keyObjective, index) => (
              <Draggable
                key={keyObjective?._id}
                draggableId={keyObjective?._id}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={cn(
                      "mb-4 flex items-center gap-x-2 rounded-md border border-slate-200 bg-slate-200 text-sm text-slate-700",
                      keyObjective?.isPublished &&
                        "border-sky-200 bg-sky-100 text-sky-700",
                    )}
                  >
                    <div
                      className={cn(
                        "rounded-l-md border-r border-r-slate-200 px-2 py-3 transition hover:bg-slate-300",
                        keyObjective?.isPublished &&
                          "border-r-sky-200 hover:bg-sky-200",
                      )}
                    >
                      <Grip className="h-5 w-5" />
                    </div>
                    {keyObjective?.description}
                    <div className="ml-auto flex items-center gap-x-2 pr-2">
                      <TrashIcon
                        onClick={() => onDelete(keyObjective?._id)}
                        className="h-4 w-4 cursor-pointer transition hover:opacity-75"
                      />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
