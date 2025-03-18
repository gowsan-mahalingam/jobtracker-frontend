import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Job } from '../../types/job';
import { jobService } from '../../services/jobService';

interface JobState {
  jobs: Job[];
  loading: boolean;
  error: string | null;
}

const initialState: JobState = {
  jobs: [],
  loading: false,
  error: null,
};

// Thunks
export const fetchJobs = createAsyncThunk(
  'jobs/fetchJobs',
  async () => {
    return await jobService.getAllJobs();
  }
);

export const createJob = createAsyncThunk(
  'jobs/createJob',
  async (job: Omit<Job, 'id'>) => {
    return await jobService.createJob(job);
  }
);

export const updateJob = createAsyncThunk(
  'jobs/updateJob',
  async ({ id, job }: { id: number; job: Partial<Job> }) => {
    return await jobService.updateJob(id, job);
  }
);

export const deleteJob = createAsyncThunk(
  'jobs/deleteJob',
  async (id: number) => {
    await jobService.deleteJob(id);
    return id;
  }
);

export const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setJobs: (state: JobState, action: PayloadAction<Job[]>) => {
      state.jobs = action.payload;
    },
    addJob: (state: JobState, action: PayloadAction<Job>) => {
      state.jobs.push(action.payload);
    },
    updateJob: (state: JobState, action: PayloadAction<Job>) => {
      const index = state.jobs.findIndex((job: Job) => job.id === action.payload.id);
      if (index !== -1) {
        state.jobs[index] = action.payload;
      }
    },
    deleteJob: (state: JobState, action: PayloadAction<number>) => {
      state.jobs = state.jobs.filter((job: Job) => job.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Jobs
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Une erreur est survenue';
      })
      // Create Job
      .addCase(createJob.fulfilled, (state, action) => {
        state.jobs.push(action.payload);
      })
      // Update Job
      .addCase(updateJob.fulfilled, (state, action) => {
        const index = state.jobs.findIndex((job) => job.id === action.payload.id);
        if (index !== -1) {
          state.jobs[index] = action.payload;
        }
      })
      // Delete Job
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.jobs = state.jobs.filter((job) => job.id !== action.payload);
      });
  },
});

export const { setJobs, addJob, updateJob: updateJobAction, deleteJob: deleteJobAction } = jobSlice.actions;
export default jobSlice.reducer; 