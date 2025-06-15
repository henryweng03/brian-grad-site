"use client";

import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

interface DraggableImageProps {
  id: string;
  src: string;
  alt: string;
  initialX: number;
  initialY: number;
}

export function DraggableImage({
  id,
  src,
  alt,
  initialX,
  initialY,
}: DraggableImageProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
    });

  const style = {
    transform: `translate(${initialX + (transform?.x || 0)}px, ${
      initialY + (transform?.y || 0)
    }px)`,
    position: "absolute" as const,
    left: "50%",
    top: 0,
    cursor: isDragging ? "grabbing" : "grab",
    zIndex: 10,
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <img
        src={src}
        alt={alt}
        className="max-w-[200px] max-h-[200px] w-auto h-auto object-contain rounded-xl shadow-xl select-none"
        draggable={false}
      />
    </div>
  );
}
