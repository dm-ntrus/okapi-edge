import { getSetting } from '@/lib/db/queries';
import { DEFAULT_SITE_ABOUT } from '@/content/mock-data';
import { isDbConfigured } from '@/lib/db/client';
import { AboutSettingsForm } from '@/components/admin/AboutSettingsForm';

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function str(value: unknown, fallback = '') {
  return typeof value === 'string' ? value : fallback;
}

function loc(root: Record<string, unknown> | null, locale: 'fr' | 'en') {
  return asRecord(root?.[locale]) ?? asRecord(root?.fr) ?? asRecord(root?.en);
}

export default async function AdminAboutSettingsPage() {
  const setting = await getSetting('site.about');
  const value = asRecord(setting?.value);
  const heroFr = loc(asRecord(value?.hero), 'fr');
  const heroEn = loc(asRecord(value?.hero), 'en');
  const historyFr = loc(asRecord(value?.history), 'fr');
  const historyEn = loc(asRecord(value?.history), 'en');
  const governanceFr = loc(asRecord(value?.governance), 'fr');
  const governanceEn = loc(asRecord(value?.governance), 'en');
  const ambitionFr = loc(asRecord(value?.ambition), 'fr');
  const ambitionEn = loc(asRecord(value?.ambition), 'en');

  const timelineRaw = Array.isArray(value?.timeline) ? value.timeline : DEFAULT_SITE_ABOUT.timeline;
  const timeline = timelineRaw.map((raw, i) => {
    const item = asRecord(raw);
    const fallback = DEFAULT_SITE_ABOUT.timeline[i];
    return {
      year: str(item?.year, fallback?.year ?? ''),
      fr: str(item?.fr ?? item?.label, fallback?.fr ?? ''),
      en: str(item?.en ?? item?.label, fallback?.en ?? ''),
    };
  });

  const values = {
    heroEyebrowFr: str(heroFr?.eyebrow, DEFAULT_SITE_ABOUT.hero.fr.eyebrow),
    heroEyebrowEn: str(heroEn?.eyebrow, DEFAULT_SITE_ABOUT.hero.en.eyebrow),
    heroTitleFr: str(heroFr?.title, DEFAULT_SITE_ABOUT.hero.fr.title),
    heroTitleEn: str(heroEn?.title, DEFAULT_SITE_ABOUT.hero.en.title),
    heroDescriptionFr: str(heroFr?.description, DEFAULT_SITE_ABOUT.hero.fr.description),
    heroDescriptionEn: str(heroEn?.description, DEFAULT_SITE_ABOUT.hero.en.description),
    historyEyebrowFr: str(historyFr?.eyebrow, DEFAULT_SITE_ABOUT.history.fr.eyebrow),
    historyEyebrowEn: str(historyEn?.eyebrow, DEFAULT_SITE_ABOUT.history.en.eyebrow),
    historyTitleFr: str(historyFr?.title, DEFAULT_SITE_ABOUT.history.fr.title),
    historyTitleEn: str(historyEn?.title, DEFAULT_SITE_ABOUT.history.en.title),
    historyBody1Fr: str(historyFr?.body1, DEFAULT_SITE_ABOUT.history.fr.body1),
    historyBody1En: str(historyEn?.body1, DEFAULT_SITE_ABOUT.history.en.body1),
    historyBody2Fr: str(historyFr?.body2, DEFAULT_SITE_ABOUT.history.fr.body2),
    historyBody2En: str(historyEn?.body2, DEFAULT_SITE_ABOUT.history.en.body2),
    timeline,
    governanceEyebrowFr: str(governanceFr?.eyebrow, DEFAULT_SITE_ABOUT.governance.fr.eyebrow),
    governanceEyebrowEn: str(governanceEn?.eyebrow, DEFAULT_SITE_ABOUT.governance.en.eyebrow),
    governanceTitleFr: str(governanceFr?.title, DEFAULT_SITE_ABOUT.governance.fr.title),
    governanceTitleEn: str(governanceEn?.title, DEFAULT_SITE_ABOUT.governance.en.title),
    governanceDescriptionFr: str(
      governanceFr?.description,
      DEFAULT_SITE_ABOUT.governance.fr.description,
    ),
    governanceDescriptionEn: str(
      governanceEn?.description,
      DEFAULT_SITE_ABOUT.governance.en.description,
    ),
    governanceHqLabelFr: str(
      governanceFr?.hq_label ?? governanceFr?.hqLabel,
      DEFAULT_SITE_ABOUT.governance.fr.hqLabel,
    ),
    governanceHqLabelEn: str(
      governanceEn?.hq_label ?? governanceEn?.hqLabel,
      DEFAULT_SITE_ABOUT.governance.en.hqLabel,
    ),
    ambitionTitleFr: str(ambitionFr?.title, DEFAULT_SITE_ABOUT.ambition.fr.title),
    ambitionTitleEn: str(ambitionEn?.title, DEFAULT_SITE_ABOUT.ambition.en.title),
    ambitionDescriptionFr: str(
      ambitionFr?.description,
      DEFAULT_SITE_ABOUT.ambition.fr.description,
    ),
    ambitionDescriptionEn: str(
      ambitionEn?.description,
      DEFAULT_SITE_ABOUT.ambition.en.description,
    ),
    ambitionCtaFr: str(ambitionFr?.cta, DEFAULT_SITE_ABOUT.ambition.fr.cta),
    ambitionCtaEn: str(ambitionEn?.cta, DEFAULT_SITE_ABOUT.ambition.en.cta),
  };

  return <AboutSettingsForm values={values} dbOk={isDbConfigured()} />;
}
