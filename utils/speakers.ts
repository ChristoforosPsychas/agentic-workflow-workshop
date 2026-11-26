import type { Session } from "@/types/session";

/**
 * Placeholder `speaker` value for sessions with no single speaker (the closing
 * panel). It names a group, not a person, so it never gets a speaker card.
 */
const NOT_A_SPEAKER = "Full speaker lineup";

export type SpeakerSession = Pick<Session, "id" | "title" | "startTime">;

export interface Speaker {
  name: string;
  sessions: SpeakerSession[];
}

/**
 * One entry per speaker, sorted by name, each with their sessions in start-time
 * order. Placeholder speakers are left out.
 */
export function groupSessionsBySpeaker(sessions: Session[]): Speaker[] {
  const bySpeaker = new Map<string, SpeakerSession[]>();

  for (const { id, title, startTime, speaker } of sessions) {
    if (speaker === NOT_A_SPEAKER) continue;

    const speakerSessions = bySpeaker.get(speaker) ?? [];
    speakerSessions.push({ id, title, startTime });
    bySpeaker.set(speaker, speakerSessions);
  }

  return [...bySpeaker]
    .map(([name, speakerSessions]) => ({
      name,
      sessions: speakerSessions.toSorted((a, b) =>
        a.startTime.localeCompare(b.startTime),
      ),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}
