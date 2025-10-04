import { useAppDispatch, useAppSelector } from '../store/hooks.ts';
import { fetchRoadmaps, setActiveRoadmap } from '../store/slices/roadmaps.slice.ts';
import selectActiveRoadmap from '../store/selectors/roadmap.selector.ts';
import type { ReactElement } from 'react';

const Test = (): ReactElement => {
  const state = useAppSelector((state) => state);

  const dispatch = useAppDispatch();
  const handleGetData = (): void => {
    void dispatch(fetchRoadmaps());
  };

  const handleSelect = (id: string): void => {
    dispatch(setActiveRoadmap(id));
  };

  const selectedRoadmap = selectActiveRoadmap(state);

  return (
    <div>
      <h1>Test page</h1>
      <button onClick={handleGetData}>get data</button>

      <ul>
        {Object.values(state.roadmaps.roadmaps.byId).map((roadmap) => (
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
