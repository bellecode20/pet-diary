import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { connectToDatabase } from "../../../lib/db";
import { requestPostToCloudinary } from "../../../components/requestPostToCloudinary";
import { requestPostToMongodb } from "../../../components/requestPostToMongodb";
import CarouselSlide from "../../components/carouselSlide";
import {
  changeCategory,
  changeContentText,
  modalIsShown,
} from "../../../store/features/modalSlice";
import UploadNav from "../../components/uploadNav";
import ModalContainer from "../../../components/ModalContainer";
import SaveBtn from "../../components/saveBtn";
import form from "../../../styles/pages/formOfPosting.module.scss";
const UpdatingForm = ({ textedDiary }) => {
  const date = useRef();
  const title = useRef();
  const content = useRef();
  const postInfo = JSON.parse(textedDiary);
  const [dateValue, setDateValue] = useState(postInfo.postingDate);
  const [titleValue, setTitleValue] = useState(postInfo.title);
  const [contentValue, setContentValue] = useState(postInfo.content);
  const [image, setImage] = useState(); //인풋에 올린 사진
  const [preview, setPreview] = useState();
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal.isShown);
  const checkThisImg = (e) => {
    const allArray = Array.from(e.target.files);
    if (allArray.length > 0) {
      setPreview([]);
      setImage(allArray);
    } else {
      setImage(null);
    }
  };
  useEffect(() => {
    //인풋에서 첨부할 사진을 선택하고나면, 그 사진을 스트링데이터로 변환시켜 preview state에 담는다.
    if (image) {
      for (let x of image) {
        const reader = new FileReader();
        reader.onloadend = (e) => {
          setPreview((preview) => [...preview, e.target.result]);
        };
        reader.readAsDataURL(x);
      }
    } else if (postInfo.photo.length > 0) {
      setPreview(postInfo.photo);
    } else setPreview(null);
  }, [image]);

  const postDiary = async (e) => {
    e.preventDefault();
    dispatch(modalIsShown(true));
    dispatch(changeCategory("LoadingModal"));
    const form = e.currentTarget;
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === "newPhoto[]"
    );
    if (titleValue === "" || contentValue === "") {
      dispatch(changeCategory("ErrorCloseModal"));
      dispatch(changeContentText("모든 항목을 채워주세요"));
      return;
    }
    if (fileInput.files.length > 0) {
      let postInfoForUpdating = {
        userId: postInfo.userId,
        postId: postInfo.postId,
        collectionName: "privateDiary",
      };
      //1. 이 글의 Id를 보내고, 사진 삭제 요청한다. (cloudinary -> mongodb 순)
      const deleteResult = await fetch("../../api/form/deleteForUpdate", {
        method: "POST",
        body: JSON.stringify(postInfoForUpdating),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await deleteResult.json();
      //2. 새로운 사진을 업로드하길 요청한다.
      for (let i = 0; i < fileInput.files.length; i++) {
        const data = await requestPostToCloudinary(
          fileInput.files[i],
          "diary-uploads"
        );
        //mongodb에 사진url과, 작성한 글의 id, form의 텍스트 내용들, 반복문을 몇번째 도는 중인지 함께 보낸다.
        let updateDiaryContent = {
          userId: postInfo.userId,
          postId: postInfo.postId,
          photoUrl: data.url,
          photoPublicId: data.public_id,
          postingDate: dateValue,
          title: titleValue,
          content: contentValue,
          forLoopIndex: i,
        };
        const postResult = await requestPostToMongodb(
          "/api/form/updateDiary",
          updateDiaryContent
        );
      }
    } else {
      //사진은 수정하지 않은 경우이다.
      let updateDiaryContent = {
        userId: postInfo.userId,
        postId: postInfo.postId,
        postingDate: dateValue,
        title: titleValue,
        content: contentValue,
        onlyText: true,
      };
      const postResult = await requestPostToMongodb(
        "/api/form/updateDiary",
        updateDiaryContent
      );
    }
    dispatch(changeCategory("SuccessModal"));
  };
  return (
    <div className={modal ? form.wrapper + " noScroll" : form.wrapper}>
      <UploadNav formId="updateDiary"></UploadNav>
      <form
        className={form.mainContainer}
        encType="multipart/form-data"
        id="updateDiary"
        onSubmit={postDiary}
      >
        <div className={form.mainContent}>
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
          {preview && <CarouselSlide data={preview}></CarouselSlide>}
          <div
            className={form.photoForm + " " + (preview ? null : form.makeFull)}
          >
            {/* <div className={form.photoForm}> */}
            <label
              htmlFor="diary__form__photo"
              className={preview ? form.whenPhoto : form.noPhoto}
            >
              <div className={form.imageContainer}>
                <Image
                  src="/camera--black.png"
                  layout="fill"
                  alt="사진 추가하기"
                ></Image>
              </div>
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
        </div>
        <SaveBtn></SaveBtn>
      </form>
      {modal && <ModalContainer></ModalContainer>}
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const client = await connectToDatabase();
  const diaryCollection = client.db().collection("privateDiary");
  const diary = await diaryCollection.findOne({
    postId: context.params.postId,
  });
  const textedDiary = JSON.stringify(diary);
  return {
    //props로 몽고디비데이터도 전달
    props: { textedDiary },
  };
};
export default UpdatingForm;
