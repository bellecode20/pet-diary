import UploadNav from "../../components/uploadNav";
import communityHome from "../../../styles/pages/communityHome.module.scss";
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
import Image from "next/image";
import SaveBtn from "../../components/saveBtn";
const UpdatingCommu = ({ textedCommunity }) => {
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
    if (titleValue === "" || contentValue === "") {
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
        reader.onloadend = (e) => {
          setPreview((preview) => [...preview, e.target.result]);
        };
        reader.readAsDataURL(x);
      }
    } else if (commuPost.photo.length > 0) {
      setPreview(commuPost.photo);
    } else setPreview(null);
  }, [image]);

  return (
    <div
      className={
        modal ? communityHome.wrapper + " noScroll" : communityHome.wrapper
      }
    >
      <UploadNav formId="updatingCommu"></UploadNav>
      <form
        className={communityHome.mainContainer}
        encType="multipart/form-data"
        id="updatingCommu"
        onSubmit={updateCommu}
      >
        <div className={communityHome.mainContent}>
          <input
            type="text"
            className={communityHome.title}
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
          />
          {preview && <CarouselSlide data={preview}></CarouselSlide>}
          <div className={communityHome.photoForm}>
            <label
              htmlFor="updateCommu__form__photo"
              className={
                preview ? communityHome.whenPhoto : communityHome.noPhoto
              }
            >
              <div className={communityHome.imageContainer}>
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
              id="updateCommu__form__photo"
              accept="image/png, image/jpeg"
              style={{ display: "none" }}
              name="newCommuPhoto[]"
              onChange={checkThisImg}
              title="시각장애인리더기"
            />
          </div>
          <textarea
            className={communityHome.content}
            value={contentValue}
            onChange={(e) => setContentValue(e.target.value)}
          ></textarea>
        </div>
        <SaveBtn></SaveBtn>
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
export default UpdatingCommu;
