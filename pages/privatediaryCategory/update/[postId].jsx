import { getSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import UploadNav from "../../layout/uploadNav";
import form from "../../../styles/pages/formOfDiary.module.scss";
import IsUploading from "../../IsUploading";
import { makeId } from "../../../components/makeId";
import { useEffect, useRef, useState } from "react";
import { connectToDatabase } from "../../../lib/db";

const updatingForm = ({ showModal, setShowModal, textedDiary }) => {
  const date = useRef();
  const title = useRef();
  const content = useRef();
  const postInfo = JSON.parse(textedDiary);
  const [dateValue, setDateValue] = useState(postInfo.postingDate);
  const [titleValue, setTitleValue] = useState(postInfo.title);
  const [contentValue, setContentValue] = useState(postInfo.content);
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
  //showModal이 바뀌면 최상위 파일인 _app에도 반영한다.
  useEffect(() => {
    setShowModal(showModal);
  }, [showModal]);

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
  const requestDelete = () => {};
  const postDiary = async (e) => {
    e.preventDefault();
    console.log("update [postId]");
    const form = e.currentTarget;
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === "newPhoto[]"
    );
    let enteredInfo = {
      date: dateValue,
      title: titleValue,
      content: contentValue,
    };

    console.log(enteredInfo);
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
              value={dateValue}
              onChange={(e) => setDateValue(e.target.value)}
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
              name="newPhoto[]"
              onChange={checkThisImg}
              title="시각장애인리더기"
            />
          </div>
          <div className={form.textContainer}>
            <input
              type="text"
              id={form.diary__form__title}
              className={form.title}
              ref={title}
              value={titleValue}
              onChange={(e) => setTitleValue(e.target.value)}
            />
            <textarea
              id={form.diary__form__content}
              className={form.content}
              ref={content}
              value={contentValue}
              onChange={(e) => setContentValue(e.target.value)}
            ></textarea>
          </div>
        </form>
      </div>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  console.log(context.params);
  //context로 받아온 것을 getSession으로 꺼내준다. 만약 유저가 인증되었다면 쿠키가 존재한다.
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: "/signup",
        permanent: false,
      },
    };
  }
  const client = await connectToDatabase();
  const diaryCollection = client.db().collection("privateDiary");
  const diary = await diaryCollection.findOne({
    postId: context.params.postId,
  });
  const textedDiary = JSON.stringify(diary);
  return {
    //props로 몽고디비데이터도 전달
    props: { session, textedDiary },
  };
};
export default updatingForm;
