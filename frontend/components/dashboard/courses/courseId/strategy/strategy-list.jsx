import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Grip, Pencil } from "lucide-react";
import { cn } from "lib/utils";
import { Badge } from "@/components/ui/badge";

export const StrategiesList = ({ items, onReorder, onEdit }) => {
  const [programs, setPrograms] = useState(items);

  useEffect(() => {
    setPrograms(items);
  }, [items]);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const updatedPrograms = Array.from(programs);
    const [reorderedItem] = updatedPrograms.splice(result.source.index, 1);
    updatedPrograms.splice(result.destination.index, 0, reorderedItem);

    setPrograms(updatedPrograms);

    // const bulkUpdateData = updatedPrograms.map((program) => ({
    //   id: program._id,
    //   position: updatedPrograms.findIndex((item) => item.id === program._id),
    // }));

    // onReorder(bulkUpdateData);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="programs">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {programs.map((program, index) => (
              <Draggable
                key={program._id}
                draggableId={program._id}
                index={index}
              >
                {(provided) => (
                  <div
                    className={cn(
                      "flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm",
                      program.isPublished &&
                        "bg-sky-100 border-sky-200 text-sky-700"
                    )}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <div
                      className={cn(
                        "px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition",
                        program.isPublished &&
                          "border-r-sky-200 hover:bg-sky-200"
                      )}
                      {...provided.dragHandleProps}
                    >
                      <Grip className="h-5 w-5" />
                    </div>
                    {program.title}
                    <div className="ml-auto flex items-center gap-x-2 pr-2">
                      <Badge
                        className={cn(
                          "bg-slate-500",
                          program.isPublished && "bg-sky-700"
                        )}
                      >
                        {program.isPublished ? "Published" : "Draft"}
                      </Badge>
                      <Pencil
                        onClick={() => onEdit(program._id)}
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
