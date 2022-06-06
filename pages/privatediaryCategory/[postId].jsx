import CarouselSlide from "../components/carouselSlide";
import { getSession } from "next-auth/react";
import { connectToDatabase } from "../../lib/db";
import DetailDiaryNav from "../components/detailDiaryNav";
import form from "../../styles/pages/formOfPosting.module.scss";
import { useDispatch, useSelector } from "react-redux";
import ModalContainer from "../../components/ModalContainer";
import { requestPostToMongodb } from "../../components/requestPostToMongodb";
import { changeCategory } from "../../store/features/modalSlice";
const Post = ({ textedDiary }) => {
  const privateDiary = JSON.parse(textedDiary);
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal.isShown);

  const requestDelete = async () => {
    dispatch(changeCategory("LoadingModal"));
    let postInfo = {
      userId: privateDiary.userId,
      postId: privateDiary.postId,
      photoPublicId: privateDiary.photoPublicId,
    };
    const result = await requestPostToMongodb(
      "../api/form/deleteDiary",
      postInfo
    );
    dispatch(changeCategory("SuccessModal"));
  };

  return (
    <div className={form.wrapper}>
      <DetailDiaryNav userId={privateDiary.userId}></DetailDiaryNav>
      <div className={form.mainContainer}>
        <div className={form.dateForm}>
          <p className={form.date}>{privateDiary.postingDate}</p>
        </div>
        <div className={form.photoForm}>
          <div className={form.whenPhoto}>
            <CarouselSlide data={privateDiary.photo}></CarouselSlide>
          </div>
        </div>
        <div className={form.textContainer}>
          <p className={form.title}>{privateDiary.title}</p>
          <p className={form.content}>{privateDiary.content}</p>
        </div>
      </div>
      {modal && (
        <ModalContainer
          titleText="삭제할까요?"
          yesText="삭제하기"
          yesAction={requestDelete}
        ></ModalContainer>
      )}
    </div>
  );
};

export default Post;

export const getServerSideProps = async (context) => {
  const postId = context.params.postId;
  const client = await connectToDatabase();
  const diaryCollection = client.db().collection("privateDiary");
  const diary = await diaryCollection.findOne({
    postId: postId,
  });
  const textedDiary = JSON.stringify(diary);
  return {
    props: { textedDiary },
  };
};
