import type { NextPage } from 'next';
import { Dashboard } from '../components/dashboard';
import { ActionCard } from '../components/actionCard';
import { BatchPrediction } from '@mui/icons-material';
import { PredictToggle } from '../components/predictionToggle';
import { useWindowDimensions } from '../utils/hooks/useWindowDimensionsTS';
const Testing: NextPage = () => {
	const windowDimensions = useWindowDimensions();
	const width = windowDimensions?.width;
	const height = windowDimensions?.height;
	return (
		//#F5DEB3 - Vanilla
		//#E5E5E5 - Gray
		<>
			{/* <ActionCard /> */}
			<div className="p-4 text-black"> {width}</div>
			<div className="p-4 text-black"> {height}</div>
			{/* <PredictToggle /> */}
		</>
	);
};

export default Testing;
