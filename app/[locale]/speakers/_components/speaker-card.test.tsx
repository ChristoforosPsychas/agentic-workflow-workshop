import { describe, expect, it } from "vitest";

import { render, screen, within } from "@/tests/utils/render";
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

  it("lists each session with its start time, linking to the session page", () => {
    render(<SpeakerCard speaker={speaker} />);

    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(2);

    const first = within(items[0]).getByRole("link");
    expect(first).toHaveTextContent("10:15");
    expect(first).toHaveTextContent("Server Components Beyond the Tutorial");
    // next-intl's Link adds the default locale prefix.
    expect(first).toHaveAttribute(
      "href",
      "/en/sessions/server-components-deep-dive",
    );

    // Screen readers hear "10:15, Title", not "10:15Title". jsdom has no
    // layout, so it drops the space the browser keeps — the comma is the point.
    expect(first).toHaveAccessibleName(
      /^10:15,\s?Server Components Beyond the Tutorial$/,
    );

    expect(within(items[1]).getByRole("link")).toHaveAttribute(
      "href",
      "/en/sessions/rsc-workshop",
    );
  });
});
