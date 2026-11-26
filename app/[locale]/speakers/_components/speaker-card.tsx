import { Card, CardContent, CardTitle } from "@/components/atoms/card";
import { Link } from "@/i18n/navigation";
import type { Speaker } from "@/utils/speakers";
import { Box, Flex, Text, VisuallyHidden } from "@chakra-ui/react";

interface SpeakerCardProps {
  speaker: Speaker;
}

export function SpeakerCard({ speaker }: SpeakerCardProps) {
  return (
    <Card height="full">
      <CardContent gap="3">
        <CardTitle as="h2" fontSize="lg" fontWeight="semibold">
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
              <Link href={`/sessions/${session.id}`}>
                <Flex
                  as="span"
                  direction="column"
                  gap="0.5"
                  fontSize="sm"
                  color="var(--text-primary)"
                >
                  <Text asChild color="var(--text-secondary)">
                    <time dateTime={session.startTime}>
                      {session.startTime}
                    </time>
                  </Text>
                  {/* Keeps "12:15, Title" apart in the link's accessible name. */}
                  <VisuallyHidden>, </VisuallyHidden>
                  <Text
                    as="span"
                    textUnderlineOffset="2px"
                    css={{
                      "a:hover &, a:focus-visible &": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    {session.title}
                  </Text>
                </Flex>
              </Link>
            </Box>
          ))}
        </Flex>
      </CardContent>
    </Card>
  );
}
