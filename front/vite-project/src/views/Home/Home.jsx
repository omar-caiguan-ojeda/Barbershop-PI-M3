
import styles from "./Home.module.css";

function Home() {
    return (
        <div className={styles.homeContainer}>
            
            <header className={styles.header}>
                <h1 className={styles.title}>Bienvenidos a la Barbería</h1>
                <img
                    src=  "https://www.peluker.com/blog/wp-content/uploads/2024/03/%C2%BFcuanto-cuesta-una-barberia.jpeg"
                    alt="Barbería Clásica"
                    className={styles.headerImage}
                />
            </header>
        </div>
    );
}

export default Home;



