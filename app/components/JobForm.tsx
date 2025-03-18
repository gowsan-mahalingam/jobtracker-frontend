"use client";

import React, { useState, useEffect } from 'react';
import { Job, JobStatus } from '../types/job';
import { useDispatch } from 'react-redux';
import { addJob, updateJob } from '../store/slices/jobSlice';
import { AppDispatch } from '../store';

interface JobFormProps {
  job?: Job;
  onClose: () => void;
}

const defaultJob: Omit<Job, 'id'> = {
  company: '',
  position: '',
  status: JobStatus.TO_APPLY,
  salaryExpectation: null,
  createdAt: '',
  updatedAt: '',
};

export default function JobForm({ job, onClose }: JobFormProps) {
  const [formData, setFormData] = useState<Omit<Job, 'id'>>(defaultJob);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (job) {
      setFormData({
        company: job.company,
        position: job.position,
        status: job.status,
        salaryExpectation: job.salaryExpectation,
        createdAt: job.createdAt,
        updatedAt: job.updatedAt
      });
    }
  }, [job]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (job) {
      dispatch(updateJob({ id: job.id, job: formData }));
    } else {
      dispatch(addJob({ ...formData, id: Date.now() }));
    }
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'salaryExpectation' ? (value ? parseInt(value) : null) : value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">
          {job ? 'Modifier la candidature' : 'Nouvelle candidature'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700">
              Entreprise
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="position" className="block text-sm font-medium text-gray-700">
              Poste
            </label>
            <input
              type="text"
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
              Statut
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {Object.values(JobStatus).map(status => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="salaryExpectation" className="block text-sm font-medium text-gray-700">
              Prétention salariale (€)
            </label>
            <input
              type="number"
              id="salaryExpectation"
              name="salaryExpectation"
              value={formData.salaryExpectation || ''}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              {job ? 'Modifier' : 'Ajouter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 