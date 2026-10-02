import { prisma } from './prisma';

export interface SiteSettings {
  communityUrl: string;
  whatsappUrl: string;
  instagramUrl: string;
  facebookUrl: string;
  youtubeUrl: string;
  lmsUrl: string;
  contactEmail: string;
  googleAnalyticsId: string;
  metaPixelId: string;
}

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  communityUrl: 'https://t.me/belajaradsofficial',
  whatsappUrl: "https://wa.me/6281573005000?text=Assalamu'alaikum,%20bisa%20konsultasi%20terkait%20pelatihan%20beriklan%20di%20meta%20ads",
  instagramUrl: 'https://www.instagram.com/belajaradsofficial?stkn=a3g2ZTBxbmNtZWJh',
  facebookUrl: 'https://www.facebook.com/share/1CFRa4T7oE/',
  youtubeUrl: 'https://youtube.com/ryanfirmansyahofficial',
  lmsUrl: 'https://ryanfirmansyah.my.id',
  contactEmail: 'belajaradsofficial@gmail.com',
  googleAnalyticsId: '',
  metaPixelId: '',
};

export function normalizeUrl(url?: string | null): string {
  if (!url) return '';
  const trimmed = url.trim();
  if (!trimmed) return '';
  if (/^(https?:\/\/|mailto:)/i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

/**
 * Retrieve unified site settings from database (SiteSetting model) with fallback
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const records = await prisma.siteSetting.findMany();
    const map: Record<string, string> = {};
    for (const r of records) {
      if (r.value !== undefined && r.value !== null) {
        map[r.key] = r.value.trim();
      }
    }

    const rawCommunity = map['COMMUNITY_URL'] || process.env.COMMUNITY_URL || DEFAULT_SITE_SETTINGS.communityUrl;
    const rawWhatsapp = map['WHATSAPP_URL'] || process.env.WHATSAPP_URL || DEFAULT_SITE_SETTINGS.whatsappUrl;
    const rawInstagram = map['INSTAGRAM_URL'] || process.env.INSTAGRAM_URL || DEFAULT_SITE_SETTINGS.instagramUrl;
    const rawFacebook = map['FACEBOOK_URL'] || process.env.FACEBOOK_URL || DEFAULT_SITE_SETTINGS.facebookUrl;
    const rawYoutube = map['YOUTUBE_URL'] || process.env.YOUTUBE_URL || DEFAULT_SITE_SETTINGS.youtubeUrl;
    const rawLms = map['LMS_URL'] || process.env.LMS_URL || DEFAULT_SITE_SETTINGS.lmsUrl;

    return {
      communityUrl: normalizeUrl(rawCommunity),
      whatsappUrl: normalizeUrl(rawWhatsapp),
      instagramUrl: normalizeUrl(rawInstagram),
      facebookUrl: normalizeUrl(rawFacebook),
      youtubeUrl: normalizeUrl(rawYoutube),
      lmsUrl: normalizeUrl(rawLms),
      contactEmail: map['EMAIL_CONTACT'] || process.env.EMAIL_CONTACT || DEFAULT_SITE_SETTINGS.contactEmail,
      googleAnalyticsId: map['NEXT_PUBLIC_GA_ID'] ?? process.env.NEXT_PUBLIC_GA_ID ?? '',
      metaPixelId: map['NEXT_PUBLIC_META_PIXEL_ID'] ?? process.env.NEXT_PUBLIC_META_PIXEL_ID ?? '',
    };
  } catch (error) {
    console.error('Failed to load site settings from database:', error);
    return DEFAULT_SITE_SETTINGS;
  }
}
