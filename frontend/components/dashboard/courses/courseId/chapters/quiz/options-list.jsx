import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { cn } from "lib/utils";
import React, { useEffect, useState } from "react";
import { Grip, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function OptionsList({ items, onDelete }) {
  const [options, setOptions] = useState(items);

  useEffect(() => {
    setOptions(items);
  }, [items]);

  const onDragEnd = () => {};
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="chapter">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {options?.map((chapter, index) => (
              <Draggable
                key={chapter._id}
                draggableId={chapter._id}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={cn(
                      "mb-4 flex items-center gap-x-2 rounded-md border border-slate-200 bg-slate-200 text-sm text-slate-700",
                      chapter.isCorrect &&
                        "border-sky-200 bg-sky-100 text-sky-700",
                    )}
                  >
                    <div
                      className={cn(
                        "rounded-l-md border-r border-r-slate-200 px-2 py-3 transition hover:bg-slate-300",
                        chapter.isCorrect &&
                          "border-r-sky-200 hover:bg-sky-200",
                      )}
                    >
                      <Grip className="h-5 w-5" />
                    </div>
                    {chapter.text}
                    <div className="ml-auto flex items-center gap-x-2 pr-2">
                      <Badge
                        className={cn(
                          "bg-slate-500",
                          chapter.isCorrect && "bg-sky-700",
                        )}
                      >
                        {chapter.isCorrect ? "Correct" : "inCorrect"}
                      </Badge>
                      <Trash
                        onClick={() => onDelete(chapter._id)}
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
}
