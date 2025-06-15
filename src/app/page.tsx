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
      src: "/yannik/IMG_1403.png",
      alt: "Yannik image 1",
    },
    {
      id: "image2",
      src: "/yannik/IMG_1885.png",
      alt: "Yannik image 2",
    },
    {
      id: "image3",
      src: "/yannik/IMG_5779.png",
      alt: "Yannik image 3",
    },
    {
      id: "image4",
      src: "/yannik/IMG_8395.png",
      alt: "Yannik image 4",
    },
    {
      id: "image5",
      src: "/yannik/IMG_1500.png",
      alt: "Yannik image 5",
    },
    {
      id: "image6",
      src: "/yannik/IMG_1554.png",
      alt: "Yannik image 6",
    },
    {
      id: "image7",
      src: "/yannik/IMG_1587.png",
      alt: "Yannik image 7",
    },
    {
      id: "image8",
      src: "/yannik/IMG_1782.png",
      alt: "Yannik image 8",
    },
    {
      id: "image9",
      src: "/yannik/IMG_9460 2.png",
      alt: "Yannik image 9",
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
          <h1 className="text-4xl mb-6 text-gray-900 tracking-tight">
            Yannik,
          </h1>
          <p className="text-lg leading-relaxed mb-4 text-gray-900">
            I'm so lucky to have found someone who found my rant on optimizing
            Chipotle orders endearing. I think that moment somehow encapsulates
            a lot of what has made our friendship special - your genuine
            curiosity about everything and our shared ability to find joy in the
            simple and absurd. From that first dinner at Terun to our countless
            adventures since, you've brought such a unique energy to my life 😊
          </p>
          <p className="text-lg leading-relaxed mb-4 text-gray-900">
            Our weekly goal lunches became one of my favorite Stanford
            traditions - even though we'd inevitably yap about everything except
            our actual goals. I'll also always remember the late nights
            exploring campus, the time spent being the number one and two chai
            enjoyers at BOB, and our trips to Berkeley, New York, and Vancouver.
            As you head to Jane Street, I know you'll do amazing things, but I
            hope you never lose that ability to smile at anything, to ask the
            kinds of questions that change how people think, and to be so down
            to clown.
          </p>
          <p className="text-lg leading-relaxed mb-8 text-gray-900">
            Thank you for being someone I can tell anything to - from the most
            trivial mundane thoughts to the harder, more emotional things. Thank
            you for seeing me, for all the special moments, and for showing me
            how to approach life with more curiosity and joy. I'll miss having
            you nearby at Stanford, but I know our friendship transcends
            distance. Here's to all the adventures ahead!
          </p>

          {/* Henry's signature */}
          <div className="mt-8">
            <p className="text-lg text-gray-900 mb-4">
              With love and admiration,
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
