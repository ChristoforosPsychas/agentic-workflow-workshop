import { describe, expect, it } from "vitest";

import { render, screen } from "@/tests/utils/render";

import { SpeakerSessionLink } from "./speaker-session-link";

const session = {
  id: "server-components-deep-dive",
  title: "Server Components Beyond the Tutorial",
  startTime: "10:15",
};

describe("SpeakerSessionLink", () => {
  it("links to the session page", () => {
    render(<SpeakerSessionLink session={session} />);

    // next-intl's Link adds the default locale prefix.
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/en/sessions/server-components-deep-dive",
    );
  });

  it("names the link by start time and title, kept apart", () => {
    render(<SpeakerSessionLink session={session} />);

    // Screen readers hear "10:15, Title", not "10:15Title". jsdom has no
    // layout, so it drops the space the browser keeps — the comma is the point.
    expect(screen.getByRole("link")).toHaveAccessibleName(
      /^10:15,\s?Server Components Beyond the Tutorial$/,
    );
  });
});
