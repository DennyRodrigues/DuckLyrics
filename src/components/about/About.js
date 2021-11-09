import styles from './About.module.css';

function About() {
    return (
      <div className={styles.About}>
        <h1>About this Website</h1>
        <p>It's a website where you can search for songs. You can also translate the lyrics to Duck Language(Even though you are not going to understant a lot).  </p> <p> The information in this site came from the Genius API, and this site was build using React. </p>
        <p>
          This site was made by Denny Rodrigues do Carmo. You can see others os my
          projects in  <a href="https://github.com/DennyRodrigues?tab=repositories"> my GitHub repository</a>
        </p>  
      </div>
    );
}

export default About;