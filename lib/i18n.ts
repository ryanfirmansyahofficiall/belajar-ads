import { Locale } from './routes';

export function getStatusLabel(status: string | null | undefined, locale: Locale): string {
  if (!status) return locale === 'id' ? 'Tersedia' : 'Available';

  const map: Record<string, { id: string; en: string }> = {
    AVAILABLE: { id: 'Tersedia', en: 'Available' },
    COMING_SOON: { id: 'Segera Hadir', en: 'Coming Soon' },
    SOLD_OUT: { id: 'Habis Terjual', en: 'Sold Out' },
    CLOSED: { id: 'Pendaftaran Ditutup', en: 'Closed' },
    COMPLETED: { id: 'Selesai', en: 'Completed' },
    UPCOMING: { id: 'Mendatang', en: 'Upcoming' },
    OPEN: { id: 'Pendaftaran Dibuka', en: 'Registration Open' },
  };

  const normalized = status.toUpperCase().replace(/\s+/g, '_');
  return map[normalized]?.[locale] || status.replace(/_/g, ' ');
}

export function getLevelLabel(level: string | null | undefined, locale: Locale): string {
  if (!level) return locale === 'id' ? 'Semua Level' : 'All Levels';

  const map: Record<string, { id: string; en: string }> = {
    'ALL LEVELS': { id: 'Semua Level', en: 'All Levels' },
    BEGINNER: { id: 'Pemula', en: 'Beginner' },
    INTERMEDIATE: { id: 'Menengah', en: 'Intermediate' },
    ADVANCED: { id: 'Tingkat Lanjut', en: 'Advanced' },
  };

  const normalized = level.toUpperCase();
  return map[normalized]?.[locale] || level;
}

export function getFormatLabel(format: string | null | undefined, locale: Locale): string {
  if (!format) return 'Online';

  const map: Record<string, { id: string; en: string }> = {
    ONLINE: { id: 'Online', en: 'Online' },
    OFFLINE: { id: 'Tatap Muka', en: 'In-Person' },
    HYBRID: { id: 'Hybrid', en: 'Hybrid' },
  };

  const normalized = format.toUpperCase();
  return map[normalized]?.[locale] || format;
}

export function getCategoryLabel(category: string | null | undefined, locale: Locale): string {
  if (!category) return '';

  const map: Record<string, { id: string; en: string }> = {
    ECOURSE: { id: 'E-Course', en: 'E-Course' },
    TRAINING: { id: 'Live Training', en: 'Live Training' },
    WORKSHOP: { id: 'Workshop', en: 'Workshop' },
    PRIVATE_MENTORING: { id: 'Mentoring Privat', en: 'Private Mentoring' },
    COMPANY_TRAINING: { id: 'Training Perusahaan', en: 'Corporate Training' },
    MEETUP: { id: 'Meetup', en: 'Meetup' },
    WEBINAR: { id: 'Webinar', en: 'Webinar' },
    ADS_CLINIC: { id: 'Klinik Iklan', en: 'Ads Clinic' },
    COMMUNITY_EVENT: { id: 'Event Komunitas', en: 'Community Event' },
  };

  const normalized = category.toUpperCase().replace(/\s+/g, '_');
  return map[normalized]?.[locale] || category.replace(/_/g, ' ');
}

export function getPriceLabel(price: string | null | undefined, locale: Locale): string {
  if (!price || price.trim() === '' || price.toLowerCase().includes('free / community')) {
    return locale === 'id' ? 'Gratis / Komunitas' : 'Free / Community';
  }
  return price;
}
