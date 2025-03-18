"use client";

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { fetchJobs } from '../store/slices/jobSlice';
import { Job } from '../types/job';

const JobList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { jobs, loading, error } = useSelector((state: RootState) => state.jobs);

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Erreur!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {jobs.map((job: Job) => (
        <div
          key={job.id}
          className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-200"
        >
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{job.position}</h2>
              <p className="text-gray-600">{job.company}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium
              ${job.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800' :
                job.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                job.status === 'OFFER_DECLINED' ? 'bg-red-100 text-red-800' :
                'bg-green-100 text-green-800'}`}>
              {job.status}
            </span>
          </div>
          
          <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <span className="font-medium">Salaire attendu:</span>
              <span className="ml-2">{job.salaryExpectation} €</span>
            </div>
            <div>
              <span className="font-medium">Créé le:</span>
              <span className="ml-2">
                {new Date(job.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div>
              <span className="font-medium">Dernière mise à jour:</span>
              <span className="ml-2">
                {new Date(job.updatedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobList; 