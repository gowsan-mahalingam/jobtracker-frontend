import JobForm from './components/JobForm';
import JobList from './components/JobList';

export default function Home() {
  const handleClose = () => {
    // Logique de fermeture
  };
  return (
    <main>
      {/* <JobForm onClose={handleClose} /> */}
      <JobList />
    </main>
  );
}
