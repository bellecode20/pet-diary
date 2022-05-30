import navi from "../../styles/components/navigations.module.scss";
import Link from "next/link";
const MainNav = () => {
  return (
    <div className={navi.tabBar}>
      <Link href="/communityCategory" passHref>
        <a className={navi.menu}>
          <img src="/diary_cat_01.jpg" className={navi.menuLogo}></img>
          <p>커뮤니티</p>
        </a>
      </Link>
      <Link href="/privatediaryCategory" passHref>
        <a className={navi.menu}>
          <img src="/diary_cat_01.jpg" className={navi.menuBigLogo}></img>
        </a>
      </Link>
      <Link href="/settings" passHref>
        <a className={navi.menu}>
          <img src="/diary_cat_01.jpg" className={navi.menuLogo}></img>
          <p>설정</p>
        </a>
      </Link>
    </div>
  );
};

export default MainNav;
