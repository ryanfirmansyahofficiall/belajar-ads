// Centralized Route Map & Helpers to guarantee zero broken links

export type Locale = 'id' | 'en';

export const DEFAULT_LOCALE: Locale = 'id';
export const LOCALES: Locale[] = ['id', 'en'];

export const ROUTES = {
  HOME: '/',
  
  // Programs
  PROGRAMS: '/programs',
  PROGRAMS_META_ADS: '/programs/meta-ads',
  PROGRAMS_ECOURSE: '/programs/e-course',
  PROGRAMS_TRAINING: '/programs/training',
  PROGRAMS_WORKSHOP: '/programs/workshop',
  PROGRAMS_PRIVATE_MENTORING: '/programs/private-mentoring',

  // Events
  EVENTS: '/events',
  EVENT_DETAIL: (slug: string) => `/events/${slug}`,

  // Community & Business
  COMMUNITY: '/community',
  FOR_BUSINESS: '/for-business',

  // Resources
  RESOURCES: '/resources',
  ARTICLES: '/resources/articles',
  ARTICLE_DETAIL: (slug: string) => `/resources/articles/${slug}`,
  TUTORIALS: '/resources/tutorials',
  CASE_STUDIES: '/resources/case-studies',
  ADS_BREAKDOWN: '/resources/ads-breakdown',
  FREE_RESOURCES: '/resources/free-resources',

  // Company
  ABOUT: '/about',
  CONTACT: '/contact',

  // Admin Routes
  ADMIN_LOGIN: '/admin/login',
  ADMIN_DASHBOARD: '/admin',
  ADMIN_PAGES: '/admin/pages',
  ADMIN_PAGES_EDIT: (key: string) => `/admin/pages/${key}`,
  ADMIN_ARTICLES: '/admin/articles',
  ADMIN_ARTICLES_NEW: '/admin/articles/new',
  ADMIN_ARTICLES_EDIT: (id: string) => `/admin/articles/${id}/edit`,
  ADMIN_PROGRAMS: '/admin/programs',
  ADMIN_PROGRAMS_NEW: '/admin/programs/new',
  ADMIN_PROGRAMS_EDIT: (id: string) => `/admin/programs/${id}/edit`,
  ADMIN_EVENTS: '/admin/events',
  ADMIN_EVENTS_NEW: '/admin/events/new',
  ADMIN_EVENTS_EDIT: (id: string) => `/admin/events/${id}/edit`,
  ADMIN_RESOURCES: '/admin/resources',
  ADMIN_RESOURCES_NEW: '/admin/resources/new',
  ADMIN_MENTORS: '/admin/mentors',
  ADMIN_LEADS: '/admin/leads',
  ADMIN_SETTINGS: '/admin/settings',
  ADMIN_SETTINGS_SECURITY: '/admin/settings/security',
};
