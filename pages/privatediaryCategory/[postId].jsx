import navi from "../../styles/layout/navigations.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { connectToDatabase } from "../../lib/db";
import DetailDiaryNav from "../layout/DetailDiaryNav";
import form from "../../styles/pages/formOfDiary.module.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DeleteModal from "../layout/deleteModal";
import { useEffect, useState } from "react";
import DeleteDecisionModal from "../layout/deleteDecisionModal";
const Post = ({ textedDiary, showModal, setShowModal }) => {
  const router = useRouter();
  const privateDiary = JSON.parse(textedDiary);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setShowModal(showModal);
  }, [showModal]);

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading]);
  useEffect(() => {
    setShowSuccessModal(showSuccessModal);
  }, [showSuccessModal]);

  //캐러셀 라이브러리 설정코드다.
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };
  return (
    <div className={form.wrapper}>
      <div>
        <DetailDiaryNav
          postId={privateDiary.postId}
          userId={privateDiary.userId}
          setShowModal={setShowModal}
          mode="updateDiary"
        ></DetailDiaryNav>
        <div className={form.mainContainer}>
          <div className={form.dateForm}>
            <p className={form.date}>{privateDiary.postingDate}</p>
          </div>
          <div className={form.photoForm}>
            <div className={form.whenPhoto}>
              <Slider {...settings}>
                {privateDiary.photo.map((img) => (
                  <img src={img}></img>
                ))}
              </Slider>
            </div>
          </div>
          <div className={form.textContainer}>
            <p className={form.title}>{privateDiary.title}</p>
            <p className={form.content}>{privateDiary.content}</p>
          </div>
        </div>
      </div>
      {isLoading && (
        <DeleteModal
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          showSuccessModal={showSuccessModal}
          setShowSuccessModal={setShowSuccessModal}
        ></DeleteModal>
      )}
      {showModal && (
        <DeleteDecisionModal
          postId={privateDiary.postId}
          userId={privateDiary.userId}
          photoPublicId={privateDiary.photoPublicId}
          setIsLoading={setIsLoading}
          setShowModal={setShowModal}
          showSuccessModal={showSuccessModal}
          setShowSuccessModal={setShowSuccessModal}
        ></DeleteDecisionModal>
      )}
    </div>
  );
};

export default Post;

export const getServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: "/signup",
        permanent: false,
      },
    };
  }
  console.log(`session index.jsx`);
  console.log(session);
  console.log(session.user.userId);
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