import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import header from "../styles/layout/header.module.scss";
import MainNav from "./layout/mainNav";
const Home = () => {
  return (
    <div className={styles.wrapper}>
      <div className={header.header}>Diary</div>
      <div className={styles.mainContainer}>
        <div className={styles.dayContainer}>
          <div className={styles.timeLineStart}></div>
          <div className={styles.timeLineCircle}></div>
          <div className={styles.timeLine}></div>
          <div className={styles.dateOfDiary}>2022. 04. 01</div>
          <div className={styles.diary}>
            <div>스프와의 첫 만남</div>
            <div></div>
            <Image src="/diary_cat_01.jpg" width="500px" height="500px"></Image>
            <div className={styles.diaryContent}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac
              tellus consectetur, imperdiet mauris ac, elementum tellus. Sed
              commodo, lorem a vulputate semper, elit mi tincidunt sapien, non
              convallis ex erat ac odio. In est Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Sed ac tellus consectetur, imperdiet
              mauris ac, elementum tellus. Sed commodo, lorem a vulputate
              semper, elit mi tincidunt sapien, non convallis ex erat ac odio.
              In est
            </div>
          </div>
        </div>
      </div>
      <div className={styles.addBtn}>+</div>
      <MainNav></MainNav>
    </div>
  );
};

export default Home;
