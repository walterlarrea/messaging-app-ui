import styles from './Loader.module.css'
import { WiStars } from 'react-icons/wi'

const Loader = () => {
	return (
		<>
			<div className={styles.backdrop}></div>
			<div className={styles.loader}>
				<div className={styles.child}>
					<WiStars />
				</div>
				<div className={styles.child}>
					<WiStars />
				</div>
				<div className={styles.child}>
					<WiStars />
				</div>
				<div className={styles.child}>
					<WiStars />
				</div>
			</div>
		</>
	)
}

export default Loader
