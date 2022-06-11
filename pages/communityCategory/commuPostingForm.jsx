import UploadNav from "../components/uploadNav";
import form from "../../styles/pages/formOfPosting.module.scss";
import { makeId } from "../../components/makeId";
import { useEffect, useRef, useState } from "react";
import { requestPostToCloudinary } from "../../components/requestPostToCloudinary";
import { requestPostToMongodb } from "../../components/requestPostToMongodb";
import { makeTimestamp } from "../../components/makeTimestamp";
import { useDispatch, useSelector } from "react-redux";
import {
  changeCategory,
  changeContentText,
  modalIsShown,
} from "../../store/features/modalSlice";
import ModalContainer from "../../components/ModalContainer";
import CarouselSlide from "../components/carouselSlide";
const CommuPostingForm = () => {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal.isShown);
  const title = useRef();
  const content = useRef();
  const [image, setImage] = useState(); //인풋에 올린 사진
  const [preview, setPreview] = useState();
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
        let reader = new FileReader();
        reader.onload = (e) => {
          setPreview((preview) => [...preview, e.target.result]);
        };
        reader.readAsDataURL(x);
      }
    } else {
      setPreview(null);
    }
  }, [image]);

  const postCommu = async (e) => {
    e.preventDefault();
    dispatch(modalIsShown(true));
    dispatch(changeCategory("LoadingModal"));
    const form = e.currentTarget;
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === "photo[]"
    );
    const commuPostId = makeId();
    const enteredTitle = title.current.value;
    const enteredContent = content.current.value;
    //올리는 파일 수 만큼 cloudinary에 보내고 mongodb에 저장하는 걸 반복한다.
    if (
      enteredTitle === "" ||
      enteredContent === "" ||
      fileInput.files.length < 1
    ) {
      dispatch(changeCategory("ErrorCloseModal"));
      dispatch(changeContentText("모든 항목을 채워주세요"));
      return;
    }
    let postContent = {
      postId: commuPostId,
      title: enteredTitle,
      content: enteredContent,
      timestamp: makeTimestamp(),
    };
    if (fileInput.files.length > 0) {
      for (let file of fileInput.files) {
        const data = await requestPostToCloudinary(
          file,
          "community-uploads"
        ).catch((e) => console.error(e));
        //mongodb에 사진url과, 작성한 글의 id, form의 텍스트 내용들을 함께 보낸다.
        postContent.photoUrl = data.url;
        postContent.photoPublicId = data.public_id;
        const postResult = await requestPostToMongodb(
          "/api/form/postCommu",
          postContent
        );
      }
    } else {
      const postResult = await requestPostToMongodb(
        "/api/form/postCommu",
        postContent
      );
    }
    dispatch(changeCategory("SuccessModal"));
  };
  return (
    <div className={form.wrapper}>
      <UploadNav formId="postingCommu"></UploadNav>
      <form
        className={form.mainContainer}
        encType="multipart/form-data"
        id="postingCommu"
        onSubmit={postCommu}
      >
        <div className={form.dateForm}></div>
        {preview && <CarouselSlide data={preview}></CarouselSlide>}
        <div className={form.photoForm}>
          <label
            htmlFor="commu__form__photo"
            className={preview ? form.whenPhoto : form.border} //사진 선택하면 테두리 없어진다.
          >
            + 사진
          </label>
          <input
            type="file"
            multiple
            id="commu__form__photo"
            // accept="image/png, image/jpeg"
            style={{ display: "none" }}
            name="photo[]"
            onChange={checkThisImg}
            title="시각장애인리더기"
          />
        </div>
        <div className={form.textContainer}>
          <input
            type="text"
            className={form.title}
            placeholder="우리집 냥이 소개하기"
            ref={title}
          />
          <textarea
            className={form.content}
            placeholder="사람들에게 우리집 냥이를 자랑해보세요"
            ref={content}
          ></textarea>
        </div>
      </form>
      {modal && <ModalContainer></ModalContainer>}
    </div>
  );
};

export default CommuPostingForm;
