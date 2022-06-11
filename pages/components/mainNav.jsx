import navi from "../../styles/components/navigations.module.scss";
import Link from "next/link";
import Image from "next/image";
const MainNav = () => {
  return (
    <div className={navi.tabBar}>
      <Link href="/communityCategory" passHref>
        <a className={navi.menu}>
          <Image src="/community.svg" alt="커뮤니티 탭" layout="fill"></Image>
        </a>
      </Link>
      <Link href="/privatediaryCategory" passHref>
        <a className={navi.menu} id={navi.bigMenu}>
          <Image src="/paw.svg" alt="다이어리 탭" layout="fill"></Image>
        </a>
      </Link>
      <Link href="/settings" passHref>
        <a className={navi.menu}>
          <Image src="/setting.svg" alt="설정 탭" layout="fill"></Image>
        </a>
      </Link>
    </div>
  );
};

export default MainNav;
