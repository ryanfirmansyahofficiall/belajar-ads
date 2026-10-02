export type Locale = 'id' | 'en';

export type ProgramCategory = 
  | 'ECOURSE' 
  | 'TRAINING' 
  | 'WORKSHOP' 
  | 'PRIVATE_MENTORING' 
  | 'COMPANY_TRAINING';

export type ProgramStatus = 
  | 'AVAILABLE' 
  | 'COMING_SOON' 
  | 'SOLD_OUT' 
  | 'CLOSED' 
  | 'COMPLETED';

export type EventCategory = 
  | 'WORKSHOP' 
  | 'MEETUP' 
  | 'TRAINING' 
  | 'WEBINAR' 
  | 'ADS_CLINIC' 
  | 'COMMUNITY_EVENT';

export type EventStatus = 
  | 'UPCOMING' 
  | 'OPEN' 
  | 'SOLD_OUT' 
  | 'CLOSED' 
  | 'COMPLETED';

export type ResourceType = 
  | 'TUTORIAL' 
  | 'CASE_STUDY' 
  | 'ADS_BREAKDOWN' 
  | 'FREE_RESOURCE';

export type LeadSource = 
  | 'CONTACT_FORM' 
  | 'BUSINESS_INQUIRY' 
  | 'EVENT_REGISTRATION' 
  | 'COMMUNITY_CTA' 
  | 'PROGRAM_CTA';

export type LeadStatus = 
  | 'NEW' 
  | 'CONTACTED' 
  | 'QUALIFIED' 
  | 'CLOSED';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}
