import { RenderData, type MyFormData } from './RenderData.tsx';
import styles from './styles.module.css';
import { useSelector } from 'react-redux';
import { selectSubmittedUncontrolledData } from '../../store/slice/uncontrolledSlice.ts';
import { selectSubmittedData } from '../../store/slice/controlledSlice.ts';
export function Main() {
  const submittedData: MyFormData | null = useSelector(selectSubmittedData);
  const submittedUncontrolledData: MyFormData | null = useSelector(
    selectSubmittedUncontrolledData
  );
  return (
    <div className={styles.wrapper}>
      <RenderData submittedData={submittedUncontrolledData} />
      <RenderData submittedData={submittedData} />
    </div>
  );
}
