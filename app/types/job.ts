export enum JobStatus {
  TO_APPLY = 'TO_APPLY',
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  TECHNICAL_TEST = 'TECHNICAL_TEST',
  OFFER_ACCEPTED = 'OFFER_ACCEPTED',
  OFFER_DECLINED = 'OFFER_DECLINED'
}

export interface Job {
  id: number;
  company: string;
  position: string;
  status: JobStatus;
  salaryExpectation: number | null;
  createdAt: string;
  updatedAt: string;
} 