import navi from "../../styles/components/navigations.module.scss";
import Link from "next/link";
const MainNav = () => {
  return (
    <div className={navi.tabBar}>
      <Link href="/communityCategory" passHref>
        <a className={navi.menu}>
          <img src="/community.svg" className={navi.menuLogo}></img>
        </a>
      </Link>
      <Link href="/privatediaryCategory" passHref>
        <a className={navi.menu}>
          <img src="/paw.svg" className={navi.menuBigLogo}></img>
        </a>
      </Link>
      <Link href="/settings" passHref>
        <a className={navi.menu}>
          <img src="/setting.svg" className={navi.menuLogo}></img>
        </a>
      </Link>
    </div>
  );
};

export default MainNav;
