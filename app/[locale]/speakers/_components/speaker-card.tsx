import { SpeakerSessionLink } from "@/app/[locale]/speakers/_components/speaker-session-link";
import { Card, CardContent, CardTitle } from "@/components/atoms/card";
import type { Speaker } from "@/utils/speakers";
import { Box, Flex } from "@chakra-ui/react";

interface SpeakerCardProps {
  speaker: Speaker;
}

export function SpeakerCard({ speaker }: SpeakerCardProps) {
  return (
    <Card height="full">
      <CardContent gap="3">
        <CardTitle as="h2" fontSize="md">
          {speaker.name}
        </CardTitle>

        {/* role="list": Safari drops the list role once list-style is none. */}
        <Flex
          as="ul"
          role="list"
          direction="column"
          gap="3"
          listStyleType="none"
        >
          {speaker.sessions.map((session) => (
            <Box as="li" key={session.id}>
              <SpeakerSessionLink session={session} />
            </Box>
          ))}
        </Flex>
      </CardContent>
    </Card>
  );
}
