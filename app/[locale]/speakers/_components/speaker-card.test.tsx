import { describe, expect, it } from "vitest";

import { render, screen } from "@/tests/utils/render";
import type { Speaker } from "@/utils/speakers";

import { SpeakerCard } from "./speaker-card";

const speaker: Speaker = {
  name: "Iker Otxoa",
  sessions: [
    {
      id: "server-components-deep-dive",
      title: "Server Components Beyond the Tutorial",
      startTime: "10:15",
    },
    { id: "rsc-workshop", title: "RSC Workshop", startTime: "15:00" },
  ],
};

describe("SpeakerCard", () => {
  it("names the speaker in a heading", () => {
    render(<SpeakerCard speaker={speaker} />);

    expect(
      screen.getByRole("heading", { level: 2, name: "Iker Otxoa" }),
    ).toBeInTheDocument();
  });

  it("lists one link per session, in the given order", () => {
    render(<SpeakerCard speaker={speaker} />);

    expect(
      screen.getAllByRole("link").map((link) => link.getAttribute("href")),
    ).toEqual([
      "/en/sessions/server-components-deep-dive",
      "/en/sessions/rsc-workshop",
    ]);
  });
});
