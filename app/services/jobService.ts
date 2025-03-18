import { Job } from '../types/job';

const BASE_URL = 'http://127.0.0.1:3000';

export const jobService = {
  getAllJobs: async (): Promise<Job[]> => {
    const response = await fetch(`${BASE_URL}/jobs`);
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des jobs');
    }
    const data = await response.json();
    return data;
  },

  getJobById: async (id: number): Promise<Job> => {
    const response = await fetch(`${BASE_URL}/jobs/${id}`);
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération du job');
    }
    return response.json();
  },

  createJob: async (job: Omit<Job, 'id'>): Promise<Job> => {
    const response = await fetch(`${BASE_URL}/jobs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(job),
    });
    if (!response.ok) {
      throw new Error('Erreur lors de la création du job');
    }
    return response.json();
  },

  updateJob: async (id: number, job: Partial<Job>): Promise<Job> => {
    const response = await fetch(`${BASE_URL}/jobs/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(job),
    });
    if (!response.ok) {
      throw new Error('Erreur lors de la mise à jour du job');
    }
    return response.json();
  },

  deleteJob: async (id: number): Promise<void> => {
    const response = await fetch(`${BASE_URL}/jobs/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Erreur lors de la suppression du job');
    }
  },
}; 