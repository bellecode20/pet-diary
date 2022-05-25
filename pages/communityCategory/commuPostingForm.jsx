import UploadNav from "../layout/uploadNav";
import form from "../../styles/pages/formOfdiary.module.scss";
import IsUploading from "../IsUploading";
import { makeId } from "../../components/makeId";
import { useEffect, useRef, useState } from "react";
import { requestPostToCloudinary } from "../../components/requestPostToCloudinary";
import { requestPostToMongodb } from "../../components/requestPostToMongodb";
import { makeTimestamp } from "../../components/makeTimestamp";
const CommuPostingForm = () => {
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

  const postCommu = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === "photo[]"
    );
    // const formData = new FormData();
    const commuPostId = makeId();
    const enteredTitle = title.current.value;
    const enteredContent = content.current.value;
    //FormData를 만들고 cloudinary에 보낸다. 이렇게 cloudinary에 사진 원본을 저장한다.
    //올리는 파일 수 만큼 cloudinary에 보내고 mongodb에 저장하는 걸 반복한다.

    let postContent = {
      postId: commuPostId,
      title: enteredTitle,
      content: enteredContent,
      timestamp: makeTimestamp(),
    };
    if (fileInput.files.length > 0) {
      for (let file of fileInput.files) {
        const data = await requestPostToCloudinary(file, "community-uploads");
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
  };
  return (
    <div className={form.wrapper}>
      <div>
        <UploadNav formId="postingCommu"></UploadNav>
        <form
          className={form.mainContainer}
          encType="multipart/form-data"
          id="postingCommu"
          onSubmit={postCommu}
        >
          <div className={form.dateForm}>
            <p className={form.date}>커뮤니티 글 쓰기</p>
          </div>
          <div className={form.photoForm}>
            <label
              htmlFor="commu__form__photo"
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
              id="commu__form__photo"
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
      </div>
    </div>
  );
};

export default CommuPostingForm;
