import UploadNav from "../../components/uploadNav";
import form from "../../../styles/pages/formOfPosting.module.scss";
import { getSession, useSession } from "next-auth/react";
import { connectToDatabase } from "../../../lib/db";
import { useEffect, useRef, useState } from "react";
import { requestPostToMongodb } from "../../../components/requestPostToMongodb";
import { requestPostToCloudinary } from "../../../components/requestPostToCloudinary";
import ModalContainer from "../../../components/ModalContainer";
import { useDispatch, useSelector } from "react-redux";
import {
  modalIsShown,
  changeCategory,
  changeContentText,
} from "../../../store/features/modalSlice";
import CarouselSlide from "../../components/carouselSlide";
const updatingCommu = ({ textedCommunity }) => {
  const commuPost = JSON.parse(textedCommunity);
  const [titleValue, setTitleValue] = useState(commuPost.title);
  const [contentValue, setContentValue] = useState(commuPost.content);
  const [image, setImage] = useState(); //input에서 선택한 사진 파일
  const [preview, setPreview] = useState();
  const modal = useSelector((state) => state.modal.isShown);
  const dispatch = useDispatch();
  const updateCommu = async (e) => {
    e.preventDefault();
    dispatch(modalIsShown(true));
    dispatch(changeCategory("LoadingModal"));
    const form = e.currentTarget;
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === "newCommuPhoto[]"
    );
    if (
      titleValue === "" ||
      contentValue === "" ||
      fileInput.files.length < 1
    ) {
      dispatch(changeCategory("ErrorCloseModal"));
      dispatch(changeContentText("모든 항목을 채워주세요"));
      return;
    }
    if (fileInput.files.length > 0) {
      let commuInfoForUpdating = {
        userId: commuPost.userId,
        postId: commuPost.commuPostId,
        collectionName: "community",
      };
      //1. 이 글의 Id를 보내고, 사진 삭제 요청한다. (cloudinary -> mongodb 순)
      const deleteResult = await fetch("../../api/form/deleteForUpdate", {
        method: "POST",
        body: JSON.stringify(commuInfoForUpdating),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await deleteResult.json();
      for (let i = 0; i < fileInput.files.length; i++) {
        const data = await requestPostToCloudinary(
          fileInput.files[i],
          "community-uploads"
        );
        let updateCommuToMongo = {
          commuPostId: commuPost.commuPostId,
          userId: commuPost.userId,
          photo: data.url,
          photoPublicId: data.public_id,
          title: titleValue,
          content: contentValue,
          forLoopIndex: i,
        };
        const postResult = await requestPostToMongodb(
          "/api/form/updateCommu",
          updateCommuToMongo
        );
        console.log("postResult", postResult);
        dispatch(modalIsShown(true));
      }
    } else {
      //사진은 수정하지 않은 경우이다.
      let updateCommuToMongo = {
        commuPostId: commuPost.commuPostId,
        userId: commuPost.userId,
        title: titleValue,
        content: contentValue,
        onlyText: true,
      };
      const postResult = await requestPostToMongodb(
        "/api/form/updateCommu",
        updateCommuToMongo
      );
    }
    dispatch(changeCategory("SuccessModal"));
  };
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
        reader.onloadend = () => {
          const url = reader.result;
          setPreview((preview) => [...preview, url]);
        };
        reader.readAsDataURL(x);
      }
    } else if (commuPost.photo.length > 0) {
      setPreview(commuPost.photo);
    } else setPreview(null);
  }, [image]);

  return (
    <div className={form.wrapper}>
      <UploadNav formId="updatingCommu"></UploadNav>
      <form
        className={form.mainContainer}
        encType="multipart/form-data"
        id="updatingCommu"
        onSubmit={updateCommu}
      >
        <div className={form.dateForm}>
          <p className={form.date}>커뮤니티 글 쓰기</p>
        </div>
        {preview && <CarouselSlide data={preview}></CarouselSlide>}
        <div className={form.photoForm}>
          <label
            htmlFor="updateCommu__form__photo"
            // className={form.noPhoto}
            className={preview ? form.whenPhoto : form.noPhoto}
          >
            + 사진
          </label>
          <input
            type="file"
            multiple
            id="updateCommu__form__photo"
            accept="image/png, image/jpeg"
            style={{ display: "none" }}
            name="newCommuPhoto[]"
            onChange={checkThisImg}
            title="시각장애인리더기"
          />
        </div>
        <div className={form.textContainer}>
          <input
            type="text"
            className={form.title}
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
          />
          <textarea
            className={form.content}
            value={contentValue}
            onChange={(e) => setContentValue(e.target.value)}
          ></textarea>
        </div>
      </form>
      {modal && <ModalContainer></ModalContainer>}
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const { postId } = context.query;
  const client = await connectToDatabase();
  const communityCollection = client.db().collection("community");
  const community = await communityCollection.findOne({
    commuPostId: postId,
  });
  const textedCommunity = JSON.stringify(community);
  return {
    //props로 몽고디비데이터도 전달
    props: { textedCommunity },
  };
};
export default updatingCommu;
