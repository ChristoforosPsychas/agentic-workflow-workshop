import { describe, expect, it } from "vitest";

import type { Session } from "@/types/session";

import { groupSessionsBySpeaker } from "./speakers";

function session(
  overrides: Pick<Session, "id" | "speaker" | "startTime">,
): Session {
  return {
    title: `Talk ${overrides.id}`,
    track: "React",
    room: "Main Hall",
    durationMinutes: 30,
    description: "",
    ...overrides,
  };
}

describe("groupSessionsBySpeaker", () => {
  it("returns one entry per speaker, sorted by name", () => {
    const speakers = groupSessionsBySpeaker([
      session({ id: "a", speaker: "Sofia Almeida", startTime: "09:00" }),
      session({ id: "b", speaker: "Diego Castellanos", startTime: "10:00" }),
      session({ id: "c", speaker: "Marta Fernandez", startTime: "11:00" }),
    ]);

    expect(speakers.map(({ name }) => name)).toEqual([
      "Diego Castellanos",
      "Marta Fernandez",
      "Sofia Almeida",
    ]);
  });

  it("keeps every session of a speaker, in start-time order", () => {
    const [speaker] = groupSessionsBySpeaker([
      session({ id: "late", speaker: "Iker Otxoa", startTime: "15:00" }),
      session({ id: "early", speaker: "Iker Otxoa", startTime: "09:30" }),
    ]);

    expect(speaker).toEqual({
      name: "Iker Otxoa",
      sessions: [
        { id: "early", title: "Talk early", startTime: "09:30" },
        { id: "late", title: "Talk late", startTime: "15:00" },
      ],
    });
  });

  it("leaves out the closing panel's placeholder speaker", () => {
    const speakers = groupSessionsBySpeaker([
      session({
        id: "keynote",
        speaker: "Marta Fernandez",
        startTime: "09:00",
      }),
      session({
        id: "closing-panel",
        speaker: "Full speaker lineup",
        startTime: "17:00",
      }),
    ]);

    expect(speakers.map(({ name }) => name)).toEqual(["Marta Fernandez"]);
  });

  it("returns no speakers when there are no sessions", () => {
    expect(groupSessionsBySpeaker([])).toEqual([]);
  });
});
