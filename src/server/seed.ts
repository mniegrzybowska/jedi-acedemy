import type Database from "better-sqlite3";

const jedis = [
  {
    name: "Yoda",
    bio: "Grand Master of the Jedi Order for over 800 years. Renowned for his wisdom, mastery of the Force, and unconventional teaching methods.",
  },
  {
    name: "Obi-Wan Kenobi",
    bio: "Legendary Jedi Master and member of the Jedi Council. Known for his skills in diplomacy, defensive lightsaber combat, and mentoring Anakin Skywalker.",
  },
  {
    name: "Mace Windu",
    bio: "Senior member of the Jedi Council and master of Vaapad, the most aggressive form of lightsaber combat. A formidable warrior and strategist.",
  },
  {
    name: "Ahsoka Tano",
    bio: "Former Padawan of Anakin Skywalker who walked her own path. A skilled duelist and independent thinker who bridges the old and new ways of the Force.",
  },
  {
    name: "Luke Skywalker",
    bio: "Hero of the Rebellion and founder of the new Jedi Order. Believes in redemption and the balance between emotion and discipline.",
  },
  {
    name: "Qui-Gon Jinn",
    bio: "Maverick Jedi Master who followed the Living Force. A compassionate teacher who valued intuition and connection with all living things.",
  },
];

const courses = [
  {
    title: "Lightsaber Combat Fundamentals",
    description:
      "Master the basics of lightsaber construction and Forms I-III. Learn proper stance, parrying techniques, and the philosophy behind the Jedi weapon. Includes hands-on sparring sessions.",
    jediIdx: 2,
    maxCapacity: 15,
    schedule: "Mon & Wed, 09:00-11:00",
  },
  {
    title: "Advanced Force Meditation",
    description:
      "Deepen your connection to the Force through ancient meditation techniques. Explore Force visions, telepathy, and achieving inner balance. Prerequisites: basic Force sensitivity.",
    jediIdx: 0,
    maxCapacity: 10,
    schedule: "Tue & Thu, 07:00-08:30",
  },
  {
    title: "Diplomatic Negotiation",
    description:
      "Learn the art of peaceful conflict resolution as practiced by the Jedi. Covers interplanetary diplomacy, trade disputes, and de-escalation strategies used across the galaxy.",
    jediIdx: 1,
    maxCapacity: 20,
    schedule: "Wed & Fri, 14:00-16:00",
  },
  {
    title: "Starfighter Piloting Basics",
    description:
      "Get behind the controls of a Jedi starfighter. Covers flight mechanics, hyperspace navigation, astromech coordination, and basic dogfighting maneuvers.",
    jediIdx: 4,
    maxCapacity: 8,
    schedule: "Mon & Fri, 10:00-12:00",
  },
  {
    title: "The Living Force",
    description:
      "Explore the connection between the Force and all living things. Learn to sense the world around you, communicate with nature, and understand the will of the Force in everyday life.",
    jediIdx: 5,
    maxCapacity: 12,
    schedule: "Tue, 15:00-17:30",
  },
  {
    title: "Dual-Wielding Saber Techniques",
    description:
      "An advanced course in Jar'Kai — the art of fighting with two lightsabers. Learn to balance offense and defense simultaneously. Requires completion of Lightsaber Combat Fundamentals.",
    jediIdx: 3,
    maxCapacity: 10,
    schedule: "Thu & Sat, 11:00-13:00",
  },
  {
    title: "Force Healing & Resilience",
    description:
      "Discover the rare Force techniques used for healing wounds and building mental resilience. Covers self-healing, aiding allies, and protecting your mind from dark side influence.",
    jediIdx: 0,
    maxCapacity: 12,
    schedule: "Fri, 09:00-11:30",
  },
  {
    title: "Jedi History & Philosophy",
    description:
      "A comprehensive study of the Jedi Order's history spanning thousands of years. Explore the rise and fall of the Order, key philosophical debates, and lessons for the future.",
    jediIdx: 4,
    maxCapacity: 25,
    schedule: "Sat, 10:00-12:00",
  },
];

export function seed(db: Database.Database) {
  const insertJedi = db.prepare(
    "INSERT INTO jedi (name, bio, avatar) VALUES (?, ?, ?)"
  );
  const insertCourse = db.prepare(
    "INSERT INTO course (title, description, jediId, maxCapacity, schedule) VALUES (?, ?, ?, ?, ?)"
  );

  const jediIds: number[] = [];
  for (const j of jedis) {
    const result = insertJedi.run(j.name, j.bio, null);
    jediIds.push(Number(result.lastInsertRowid));
  }

  for (const c of courses) {
    insertCourse.run(
      c.title,
      c.description,
      jediIds[c.jediIdx],
      c.maxCapacity,
      c.schedule
    );
  }
}
