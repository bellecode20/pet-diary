import UploadNav from "../components/uploadNav";
import ModalContainer from "../../components/ModalContainer";
import { makeId } from "../../components/makeId";
import { useEffect, useRef, useState } from "react";
import { requestPostToMongodb } from "../../components/requestPostToMongodb";
import { requestPostToCloudinary } from "../../components/requestPostToCloudinary";
import form from "../../styles/pages/formOfPosting.module.scss";
import { useDispatch, useSelector } from "react-redux";
import CarouselSlide from "../components/carouselSlide";
import { makeTimestamp } from "../../components/makeTimestamp";
import {
  changeContentText,
  changeCategory,
  modalIsShown,
} from "../../store/features/modalSlice";
const timeStamp = makeTimestamp();
const PostingForm = () => {
  const date = useRef();
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
  const dispatch = useDispatch();
  // dispatch(modalIsShown(false));
  const modal = useSelector((state) => state.modal.isShown);
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
  const postDiary = async (e) => {
    e.preventDefault();
    dispatch(modalIsShown(true));
    dispatch(changeCategory("LoadingModal"));
    const form = e.currentTarget;
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === "photo[]"
    );
    const diaryPostId = makeId();
    const enteredDate = date.current.value;
    const enteredTitle = title.current.value;
    const enteredContent = content.current.value;
    if (
      enteredDate === "" ||
      enteredTitle === "" ||
      enteredContent === "" ||
      fileInput.files.length < 1
    ) {
      dispatch(changeCategory("ErrorCloseModal"));
      dispatch(changeContentText("모든 항목을 채워주세요"));
      return;
    }
    //올리는 파일 수 만큼 cloudinary에 보내고 mongodb에 저장하는 걸 반복한다.
    if (fileInput.files.length > 0) {
      for (let file of fileInput.files) {
        const data = await requestPostToCloudinary(file, "diary-uploads");
        //mongodb에 사진url과, 작성한 글의 id, form의 텍스트 내용들을 함께 보낸다.
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
      }
    } else {
      const postResult = await requestPostToMongodb(
        "/api/form/postDiary",
        postContent
      );
    }
    dispatch(changeCategory("SuccessModal"));
  };
  return (
    <div className={form.wrapper}>
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
            defaultValue={`${timeStamp.year}-${timeStamp.month}-${timeStamp.date}`}
            ref={date}
            className={form.date}
          />
        </div>
        {preview && <CarouselSlide data={preview}></CarouselSlide>}
        <div className={form.photoForm}>
          <label
            htmlFor="diary__form__photo"
            className={image ? form.whenPhoto : form.border} //사진 선택하면 테두리 없어진다.
          >
            + 사진
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
      {modal && <ModalContainer></ModalContainer>}
    </div>
  );
};

export default PostingForm;
