import navi from "../../styles/components/navigations.module.scss";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
const MainNav = () => {
  const router = useRouter();
  const isInWhatPage = () => {
    const page = router.pathname;
    if (page.includes("community")) return "Community";
    else if (page.includes("diary")) return "Diary";
    else return "Settings";
  };
  const currentPage = isInWhatPage();
  return (
    <header className={navi.header}>
      <div className={navi.headerAlign}>
        <p>{currentPage}</p>
        <div className={navi.tabBar_new}>
          <Link href="/communityCategory" passHref>
            <a className={navi.menu_new}>
              <Image
                src={
                  currentPage == "Community"
                    ? "/community--black.png"
                    : "/community.png"
                }
                alt="커뮤니티 탭"
                layout="fill"
              ></Image>
            </a>
          </Link>
          <Link href="/privatediaryCategory" passHref>
            <a className={navi.menu_new}>
              <Image
                src={currentPage == "Diary" ? "/paw--black.png" : "/paw.png"}
                alt="다이어리 탭"
                layout="fill"
              ></Image>
            </a>
          </Link>
          <Link href="/settings" passHref>
            <a className={navi.menu_new}>
              <Image
                src={
                  currentPage == "Settings"
                    ? "/setting--black.png"
                    : "/setting.png"
                }
                alt="설정 탭"
                layout="fill"
              ></Image>
            </a>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default MainNav;
