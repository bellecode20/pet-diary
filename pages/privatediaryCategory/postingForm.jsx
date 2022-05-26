import Head from "next/head";
import Image from "next/image";
import UploadNav from "../layout/uploadNav";
import form from "../../styles/pages/formOfDiary.module.scss";
import { makeId } from "../../components/makeId";
import { useEffect, useRef, useState } from "react";
import { requestPostToMongodb } from "../../components/requestPostToMongodb";
import { requestPostToCloudinary } from "../../components/requestPostToCloudinary";
const postingForm = () => {
  const date = useRef();
  const title = useRef();
  const content = useRef();
  const [image, setImage] = useState(); //인풋에 올린 사진
  const [preview, setPreview] = useState();
  const checkThisImg = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    } else {
      setImage(null);
    }
  };

  useEffect(() => {
    //인풋에서 첨부할 사진을 선택하고나면, 그 사진을 스트링데이터로 변환시켜 preview state에 담는다.
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else setPreview(null);
  }, [image]);
  const postDiary = async (e) => {
    e.preventDefault();
    console.log("e");
    const form = e.currentTarget;
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === "photo[]"
    );
    // const formData = new FormData();
    const diaryPostId = makeId();
    const enteredDate = date.current.value;
    const enteredTitle = title.current.value;
    const enteredContent = content.current.value;
    //FormData를 만들고 cloudinary에 보낸다. 이렇게 cloudinary에 사진 원본을 저장한다.
    //올리는 파일 수 만큼 cloudinary에 보내고 mongodb에 저장하는 걸 반복한다.
    if (fileInput.files.length > 0) {
      for (let file of fileInput.files) {
        const data = await requestPostToCloudinary(file, "diary-uploads");
        //mongodb에 사진url과, 작성한 글의 id, form의 텍스트 내용들을 함께 보낸다.
        console.log(`data.public_id`);
        console.log(data.public_id);
        let postContent = {
          postId: diaryPostId,
          photoUrl: data.url,
          photoPublicId: data.public_id,
          postingDate: enteredDate,
          title: enteredTitle,
          content: enteredContent,
        };
        const postResult = await requestPostToMongodb(
          "/api/form/postDiary",
          postContent
        );
        console.log("data", data);
      }
    } else {
      const postResult = await requestPostToMongodb(
        "/api/form/postDiary",
        postContent
      );
    }
  };
  return (
    <div className={form.wrapper}>
      <div>
        <UploadNav formId="posting"></UploadNav>
        <form
          className={form.mainContainer}
          encType="multipart/form-data"
          id="posting"
          onSubmit={postDiary}
        >
          <div className={form.dateForm}>
            <label htmlFor="diary__form__date"></label>
            <input
              id="diary__form__date"
              type="date"
              ref={date}
              className={form.date}
            />
          </div>
          <div className={form.photoForm}>
            <label
              htmlFor="diary__form__photo"
              className={image ? form.whenPhoto : form.border} //사진 선택하면 테두리 없어진다.
            >
              <img
                src={preview}
                onClick={() => {
                  setImage(null);
                }}
                className={form.thumbnail}
              ></img>
            </label>
            <input
              type="file"
              multiple
              id="diary__form__photo"
              accept="image/png, image/jpeg"
              style={{ display: "none" }}
              name="photo[]"
              onChange={checkThisImg}
              title="시각장애인리더기"
            />
          </div>
          <div className={form.textContainer}>
            <input
              type="text"
              id={form.diary__form__title}
              className={form.title}
              placeholder="스프와의 첫 만남"
              ref={title}
            />
            <textarea
              id={form.diary__form__content}
              className={form.content}
              placeholder="오늘은 스프가 집에 처음 왔다."
              ref={content}
            ></textarea>
          </div>
        </form>
      </div>
    </div>
  );
};

export default postingForm;
