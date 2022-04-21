import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import navi from "../styles/layout/navigations.module.scss";
import UploadNav from "./layout/uploadNav";
import form from "../styles/pages/formOfDiary.module.scss";
import Post from "./layout/post";
import rp from "../styles/pages/readPost.module.scss";
const ReadPost: NextPage = () => {
  return (
    <div className={rp.wrapper}>
      <UploadNav></UploadNav>
      <div className={rp.mainContainer}>
        <Post></Post>
        <div className={rp.commentsContainer}>
          <div className={rp.comment}>
            <img src="/diary_cat_01.jpg" className={rp.profileImg}></img>
            <p className={rp.profileName}>치즈가 좋아</p>
            <p className={rp.commentText}>
              sdjklfsjdrgio너무...너무...너무...너무...너무...너무...귀엽네요...!!!!!
            </p>
          </div>
          <div className={rp.comment}>
            <img src="/diary_cat_01.jpg" className={rp.profileImg}></img>
            <p className={rp.profileName}>치즈가 좋아</p>
            <p className={rp.commentText}>
              sdjklfsjdrgio너무...너무...너무...너무...너무...너무...귀엽네요...!!!!!
            </p>
          </div>
        </div>
      </div>
      <div className={rp.commentInputBar}>
        <input type="text" className={rp.commentInput}></input>
      </div>
    </div>
  );
};

export default ReadPost;
