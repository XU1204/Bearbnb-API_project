import github from '../../assets/github.png'
import linkedin from '../../assets/linkedin.png'
import styles from './footer.module.css'

const Footer = () => {
    return (
        <div className={styles.developer}>Developer:  Lijuan Xu
                    <a href='https://github.com/XU1204'>
                        <img className={styles.github} src={github} alt='github'></img>
                    </a>
                    <a href='https://www.linkedin.com/in/lijuan-xu-96151b146/'>
                        <img className={styles.linkedin} src={linkedin} alt='linkedin'></img>
                    </a>
        </div>
    )
}

export default Footer;
