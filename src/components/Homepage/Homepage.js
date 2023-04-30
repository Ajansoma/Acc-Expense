import { useState } from 'react';
import Charts from './Charts/Charts';
import styles from './Homepage.module.css';
import Report from './Reports/Reports';
import Revenue from './Revenue/Revenue';

const Homepage = function () {
  const [overlay, setOverlay] = useState(false);
  const overlayHandler = function () {
    setOverlay((prevState) => !prevState);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Revenue />
        <Charts />
        <Report />
      </div>
      {overlay && <div className={styles.overlay}></div>}
    </div>
  );
};
export default Homepage;
