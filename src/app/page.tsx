"use client";

import { HeroSection } from "./HeroSection";
import { CoursesSection } from "./courses/CoursesSection";

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <HeroSection />
      <CoursesSection />
    </div>
  );
}
