import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import post from "../../styles/layout/post.module.scss";
const Post: NextPage = () => {
  return (
    <div className={post.postContainer}>
      <h1 className={post.tagContainer}>
        <span className={post.tag}>일상</span>
      </h1>
      <p className={post.content}>
        집에 들어오면 반겨줘요! 기특한 우리 냥이ㅎ 퇴근 후에 얘 덕분에 힘이 나요
      </p>
      <div className={post.imgsPreview}>
        <img src="/community_cat_01.jpg" height="100%" width="100%"></img>
      </div>
      <p className={post.name}>스프집사</p>
      <p className={post.date}>04. 05</p>
      <div className={post.social}>
        <span className={post.like}>츄르</span>
        <span className={post.comment}>댓글</span>
      </div>
    </div>
  );
};

export default Post;
