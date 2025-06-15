"use client";

import { useState, useEffect } from "react";
import {
  DndContext,
  DragEndEvent,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import { DraggableImage } from "@/components/DraggableImage";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [positions, setPositions] = useState({
    image1: { x: -300, y: 50 },
    image2: { x: 100, y: 50 },
    image3: { x: -200, y: 170 },
    image4: { x: 200, y: 150 },
    image5: { x: -50, y: 55 },
    image6: { x: -150, y: 100 },
    image7: { x: 50, y: 175 },
    image8: { x: -350, y: 150 },
    image9: { x: 150, y: 150 },
  });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;
    const id = active.id as string;

    setPositions((prev) => ({
      ...prev,
      [id]: {
        x: prev[id as keyof typeof prev].x + delta.x,
        y: prev[id as keyof typeof prev].y + delta.y,
      },
    }));
  };

  const images = [
    {
      id: "image1",
      src: "/brian/IMG_0833.png",
      alt: "Brian image 1",
    },
    {
      id: "image2",
      src: "/brian/IMG_0875.png",
      alt: "Brian image 2",
    },
    {
      id: "image3",
      src: "/brian/IMG_1988.png",
      alt: "Brian image 3",
    },
    {
      id: "image4",
      src: "/brian/IMG_2079.png",
      alt: "Brian image 4",
    },
    {
      id: "image5",
      src: "/brian/IMG_6233.png",
      alt: "Brian image 5",
    },
    {
      id: "image6",
      src: "/brian/IMG_6313.png",
      alt: "Brian image 6",
    },
    {
      id: "image7",
      src: "/brian/IMG_8021.png",
      alt: "Brian image 7",
    },
    {
      id: "image8",
      src: "/brian/IMG_9584.png",
      alt: "Brian image 8",
    },
  ];

  return (
    <div className="relative bg-white">
      {/* Only render draggable images on client side to avoid hydration errors */}
      {mounted && (
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          {images.map((image) => (
            <DraggableImage
              key={image.id}
              id={image.id}
              src={image.src}
              alt={image.alt}
              initialX={positions[image.id as keyof typeof positions].x}
              initialY={positions[image.id as keyof typeof positions].y}
            />
          ))}
        </DndContext>
      )}

      {/* Bottom half with text */}
      <div className="px-4 pb-8 pt-96 flex items-center justify-center">
        <div className="max-w-xl font-[family-name:var(--font-eb-garamond)]">
          <h1 className="text-4xl mb-6 text-gray-900 tracking-tight">Brian,</h1>
          <p className="text-lg leading-relaxed mb-4 text-gray-900">
            I'm so grateful our paths crossed at that Stanford Bay Area meetup,
            even if it took a full year and some poker games to actually become
            friends. As I was writing this, I looked through our texts and found
            some stuff about how we wanted to self-study Swift and take CS 111
            at UCLA together summer 2022. Neither happened LMAO. But I think
            that experience embodies some aspect of your enthusiasm and optimism
            that I so appreciate about our friendship.
          </p>
          <p className="text-lg leading-relaxed mb-4 text-gray-900">
            I love your laugh — it's truly contagious and makes even ordinary
            moments feel special. Whether we were grinding out the 224N final
            projection, wandering through Redwood City on morning adventures, or
            somehow morphing casual conversations into philosophical frameworks
            about the world, you make everything more joyful.
          </p>
          <p className="text-lg leading-relaxed mb-8 text-gray-900">
            I'll never forget Chinese New Year when you invited me to make
            dumplings with your family. Moments like that, where you put so much
            thought into making people feel welcome and included, show what an
            incredible friend you are. I'm so lucky to have you in my life, and
            excited for all the adventures to come!
          </p>

          {/* Henry's signature */}
          <div className="mt-8">
            <p className="text-lg text-gray-900 mb-4">
              With love and appreciation,
            </p>
            <div className="flex">
              <img
                src="/henry.png"
                alt="Henry's signature"
                className="h-24 opacity-80"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
