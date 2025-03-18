"use client";

import React from 'react';
import { Job, JobStatus } from '../types/job';
import { useDispatch } from 'react-redux';
import { deleteJob } from '../store/slices/jobSlice';

interface JobCardProps {
  job: Job;
  onEdit: (job: Job) => void;
}

const statusColors = {
  [JobStatus.TO_APPLY]: 'bg-gray-200',
  [JobStatus.PENDING]: 'bg-yellow-200',
  [JobStatus.IN_PROGRESS]: 'bg-blue-200',
  [JobStatus.TECHNICAL_TEST]: 'bg-purple-200',
  [JobStatus.OFFER_ACCEPTED]: 'bg-green-200',
  [JobStatus.OFFER_DECLINED]: 'bg-red-200',
};

const statusLabels = {
  [JobStatus.TO_APPLY]: 'À postuler',
  [JobStatus.PENDING]: 'En attente',
  [JobStatus.IN_PROGRESS]: 'En cours',
  [JobStatus.TECHNICAL_TEST]: 'Test technique',
  [JobStatus.OFFER_ACCEPTED]: 'Offre acceptée',
  [JobStatus.OFFER_DECLINED]: 'Offre refusée',
};

export default function JobCard({ job, onEdit }: JobCardProps) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette candidature ?')) {
      dispatch(deleteJob(job.id));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{job.company}</h3>
          <p className="text-gray-600">{job.position}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm ${statusColors[job.status]}`}>
          {statusLabels[job.status]}
        </span>
      </div>
      
      {job.salaryExpectation && (
        <p className="text-gray-600 mb-4">
          Prétention salariale : {job.salaryExpectation.toLocaleString('fr-FR')} €
        </p>
      )}
      
      <div className="flex justify-end space-x-2">
        <button
          onClick={() => onEdit(job)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Modifier
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Supprimer
        </button>
      </div>
    </div>
  );
} 