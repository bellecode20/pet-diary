import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import navi from "../styles/layout/navigations.module.scss";
import UploadNav from "./layout/uploadNav";
import form from "../styles/pages/formOfDiary.module.scss";
const FormOfDiary: NextPage = () => {
  return (
    <div className={form.wrapper}>
      <UploadNav></UploadNav>
      <div className={form.mainContainer}>
        <div className={form.dateForm}>
          <input type="date" />
        </div>
        <div className={form.photoForm}>
          <label htmlFor="diary__form__photo">사진추가버튼</label>
          <input
            type="file"
            id="diary__form__photo"
            accept="image/png, image/jpeg"
            style={{ display: "none" }}
          />
        </div>
        <div className={form.textContainer}>
          <input
            type="text"
            id={form.diary__form__title}
            placeholder="스프와의 첫 만남"
          />
          <textarea
            id={form.diary__form__content}
            placeholder="텍스트 많이 치면 스크롤 생기는 거 대신, 높이 늘어나게 하기https://velog.io/@hwanieee/textarea-%EC%9E%90%EB%8F%99-%EB%86%92%EC%9D%B4-%EC%A1%B0%EC%A0%88"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default FormOfDiary;
