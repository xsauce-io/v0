import type { NextPage } from 'next';
import { Dashboard } from '../components/dashboard';
import { ActionCard } from '../components/actionCard';
import { BatchPrediction } from '@mui/icons-material';
import { PredictToggle } from '../components/predictionToggle';

const Testing: NextPage = () => {
	return (
		//#F5DEB3 - Vanilla
		//#E5E5E5 - Gray
		<>
			<ActionCard />
			<div className="p-4"></div>
			<PredictToggle />
		</>
	);
};

export default Testing;
