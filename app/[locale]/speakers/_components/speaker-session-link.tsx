import { Link } from "@/i18n/navigation";
import type { SpeakerSession } from "@/utils/speakers";
import { Flex, Text, VisuallyHidden } from "@chakra-ui/react";

interface SpeakerSessionLinkProps {
  session: SpeakerSession;
}

export function SpeakerSessionLink({ session }: SpeakerSessionLinkProps) {
  return (
    <Link href={`/sessions/${session.id}`}>
      <Flex
        as="span"
        direction="column"
        gap="0.5"
        fontSize="sm"
        color="var(--text-primary)"
      >
        <Text asChild color="var(--text-secondary)">
          <time dateTime={session.startTime}>{session.startTime}</time>
        </Text>
        {/* Keeps "12:15, Title" apart in the link's accessible name. */}
        <VisuallyHidden>, </VisuallyHidden>
        <Text
          as="span"
          textUnderlineOffset="2px"
          css={{
            "a:hover &, a:focus-visible &": { textDecoration: "underline" },
          }}
        >
          {session.title}
        </Text>
      </Flex>
    </Link>
  );
}
