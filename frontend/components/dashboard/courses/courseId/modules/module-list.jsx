import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Grip, Pencil } from "lucide-react";
import { cn } from "lib/utils";
import { Badge } from "@/components/ui/badge";

export const ModuleList = ({ items, onReorder, onEdit }) => {
  const [modules, setModules] = useState(items);

  useEffect(() => {
    setModules(items);
  }, [items]);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const newModules = Array.from(modules);
    const [reorderedItem] = newModules.splice(result.source.index, 1);
    newModules.splice(result.destination.index, 0, reorderedItem);

    setModules(newModules);

    const bulkUpdateData = newModules.map((module, index) => ({
      id: module._id,
      position: index + 1, // Assuming positions are 1-indexed
    }));

    onReorder(bulkUpdateData);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="module">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {modules.map((module, index) => (
              <Draggable
                key={module._id}
                draggableId={module._id}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={cn(
                      "flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm",
                      module.isPublished &&
                        "bg-sky-100 border-sky-200 text-sky-700"
                    )}
                  >
                    <div
                      className={cn(
                        "px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition",
                        module.isPublished &&
                          "border-r-sky-200 hover:bg-sky-200"
                      )}
                    >
                      <Grip className="h-5 w-5" />
                    </div>
                    {module.title}
                    <div className="ml-auto flex items-center gap-x-2 pr-2">
                      <Badge
                        className={cn(
                          "bg-slate-500",
                          module.isPublished && "bg-sky-700"
                        )}
                      >
                        {module.isPublished ? "Published" : "Draft"}
                      </Badge>
                      <Pencil
                        onClick={() => onEdit(module._id)}
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
