import { SpeakerCard } from "@/app/[locale]/speakers/_components/speaker-card";
import { PageHeading } from "@/components/atoms/page-heading";
import { fetchSessions } from "@/services/sessions";
import { groupSessionsBySpeaker } from "@/utils/speakers";
import { Flex, Grid } from "@chakra-ui/react";
import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function SpeakersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("SpeakersPage");
  const speakers = groupSessionsBySpeaker(await fetchSessions());

  return (
    <Flex direction="column" gap="8" flex="1" width="full" minWidth="0">
      <PageHeading title={t("title")}>{t("description")}</PageHeading>

      <Grid
        as="ul"
        // Safari drops the list role once list-style is none.
        role="list"
        listStyleType="none"
        gap="4"
        templateColumns={{
          base: "1fr",
          sm: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
      >
        {speakers.map((speaker) => (
          <li key={speaker.name}>
            <SpeakerCard speaker={speaker} />
          </li>
        ))}
      </Grid>
    </Flex>
  );
}
