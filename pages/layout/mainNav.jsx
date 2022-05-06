import navi from "../../styles/layout/navigations.module.scss";
import Image from "next/image";
const MainNav = () => {
  return (
    <div className={navi.tabBar}>
      <div className={navi.menu}>
        <img src="/diary_cat_01.jpg" className={navi.menuLogo}></img>
        <p>board</p>
      </div>
      <div className={navi.menu}>
        <img src="/diary_cat_01.jpg" className={navi.menuBigLogo}></img>
      </div>
      <div className={navi.menu}>
        <img src="/diary_cat_01.jpg" className={navi.menuLogo}></img>
        <p>설정</p>
      </div>
    </div>
  );
};

export default MainNav;
