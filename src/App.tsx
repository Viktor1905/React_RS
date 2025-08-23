import './App.module.css';
import styles from './App.module.css';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { ControlledForm } from './components/ControlledForm/ControlledForm.tsx';
import { UncontrolledForm } from './components/UncontrolledForm/UncontrolledForm.tsx';

function App() {
  const [whichOpen, setWhichOpen] = useState('');
  return (
    <>
      <div className={styles.buttonWrapper}>
        <button onClick={() => setWhichOpen('uncontrolled')}>
          {' '}
          Open uncontrolled form
        </button>
        <button onClick={() => setWhichOpen('controlled')}>
          {' '}
          Open controlled form
        </button>
      </div>
      {whichOpen &&
        createPortal(
          whichOpen === 'controlled' ? (
            <div role="dialog" className={styles.modalContainer}>
              <ControlledForm
                closeWindow={() => setWhichOpen('')}
                whichOpen={whichOpen}
              />
            </div>
          ) : (
            <div role="dialog" className={styles.modalContainer}>
              <UncontrolledForm
                closeWindow={() => setWhichOpen('')}
                whichOpen={whichOpen}
              />
            </div>
          ),
          document.body
        )}
    </>
  );
}

export default App;
