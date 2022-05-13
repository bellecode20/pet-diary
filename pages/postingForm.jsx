import Head from "next/head";
import Image from "next/image";
import navi from "../styles/layout/navigations.module.scss";
import UploadNav from "./layout/uploadNav";
import form from "../styles/pages/formOfDiary.module.scss";
import { makeId } from "../components/makeId";
const postingForm = () => {
  const postDiary = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === "photo[]"
    );
    const formData = new FormData();
    const diaryPostId = makeId();
    //FormData를 만들고 cloudinary에 보낸다. 이렇게 cloudinary에 사진 원본을 저장한다.
    //올리는 파일 수 만큼 cloudinary에 보내고 mongodb에 저장하는 걸 반복한다.
    for (let file of fileInput.files) {
      formData.append("file", file);
      formData.append("upload_preset", "diary-uploads");
      const data = await fetch(
        "https://api.cloudinary.com/v1_1/diarycloud/image/upload",
        {
          method: "POST",
          body: formData,
        }
      ).then((res) => res.json());
      //mongodb에 사진url과, 작성한 글의 id, form의 텍스트 내용들을 함께 보낸다.
      let postContent = {
        postId: diaryPostId,
        photoUrl: data.url,
      };
      const postResult = await fetch("/api/form/postDiary", {
        method: "POST",
        body: JSON.stringify(postContent),
        //headers
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
      console.log("data", data);
    }
  };
  return (
    <div className={form.wrapper}>
      <UploadNav></UploadNav>
      <form
        className={form.mainContainer}
        encType="multipart/form-data"
        id="posting"
        onSubmit={postDiary}
      >
        <div className={form.dateForm}>
          <label htmlFor="diary__form__date">날짜</label>
          <input id="diary__form__date" type="date" />
        </div>
        <div className={form.photoForm}>
          <label htmlFor="diary__form__photo">사진추가버튼</label>
          <input
            type="file"
            multiple
            id="diary__form__photo"
            accept="image/png, image/jpeg"
            style={{ display: "none" }}
            name="photo[]"
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
      </form>
    </div>
  );
};

export default postingForm;
