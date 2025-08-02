import { useParams } from 'react-router';
import { CharacterDetails } from './CharacterDetails.tsx';

export function CharacterDetailsWrapper() {
  const { id } = useParams();
  return (
    <aside>
      <CharacterDetails id={Number(id)} />
    </aside>
  );
}
