import { useAppDispatch, useAppSelector } from '../store/hooks.ts';
import { fetchRoadmaps, setActiveRoadmap } from '../store/slices/roadmaps.slice.ts';
import selectActiveRoadmap from '../store/selectors/roadmap.selector.ts';

const Test = () => {
  const roadmaps = useAppSelector((state) => state.roadmaps);
  const goals = useAppSelector((state) => state.goals);
  const tasks = useAppSelector((state) => state.tasks);

  const dispatch = useAppDispatch();
  const handleGetData = () => {
    dispatch(fetchRoadmaps());
  };

  const handleSelect = (id: string) => {
    dispatch(setActiveRoadmap(id));
  };

  const selectedRoadmap = selectActiveRoadmap({ roadmaps, goals, tasks });

  return (
    <div>
      <h1>Test page</h1>
      <button onClick={handleGetData}>get data</button>

      <ul>
        {Object.values(roadmaps.roadmaps.byId).map((roadmap) => (
          <li>
            <h3>{roadmap.title}</h3>
            <button
              onClick={() => {
                handleSelect(roadmap.id);
              }}
            >
              select
            </button>
          </li>
        ))}
      </ul>

      {selectedRoadmap !== null && (
        <>
          <h2>Selected Roadmap: {selectedRoadmap.title}</h2>
          <ul>
            {selectedRoadmap.goals.map((goal) => (
              <li key={goal.id}>
                <h3>{goal.title}</h3>
                <ul>
                  {goal.tasks.map((task) => (
                    <li key={task.id}>{task.title}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Test;
