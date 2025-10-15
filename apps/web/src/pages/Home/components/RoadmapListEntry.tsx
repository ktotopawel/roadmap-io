import type { ReactElement } from 'react';
import ComplexityIndicator from '../../../components/ComplexityIndicator.tsx';

interface IRoadmapListEntry {
  title: string;
  description: string | null;
  complexity: number;
  progress: number;
}

const RoadmapListEntry = ({
  title,
  description,
  complexity,
  progress,
}: IRoadmapListEntry): ReactElement => {
  return (
    <div>
      <h4>{title}</h4>
      {description && <p>{description}</p>}
      <ComplexityIndicator complexity={complexity} />
      progress: {progress}%
    </div>
  );
};

export default RoadmapListEntry;
