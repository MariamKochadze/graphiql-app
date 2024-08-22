import { METHODS } from '@app/common/constants';
import styles from './Restfull.module.scss';

export default function RestPage() {
  return (
    <div className={styles.restfull}>
      <span>svg: url</span>
      <form className={styles.form}>
        <div>
          <input list="methods" name="method" placeholder={METHODS.GET} />
          <datalist id="methods">
            {Object.values(METHODS).map(method => (
              <option key={method} value={method} />
            ))}
          </datalist>
          <input type="text" name="url" />
        </div>
        <input type="submit" value="Send" />
      </form>
    </div>
  );
}
