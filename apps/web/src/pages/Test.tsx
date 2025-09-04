import { useAppDispatch } from '../store/hooks.ts';
import { fetchRoadmaps } from '../store/slices/roadmaps.slice.ts';

const Test = () => {
  const dispatch = useAppDispatch();
  const handleGetData = () => {
    dispatch(fetchRoadmaps());
  };

  return (
    <div>
      <h1>Test page</h1>
      <button onClick={handleGetData}>get data</button>
    </div>
  );
};

export default Test;
