import navi from "../../styles/layout/navigations.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import { connectToDatabase } from "../../lib/db";
import UploadNav from "../layout/uploadNav";
import form from "../../styles/pages/formOfDiary.module.scss";

const Post = ({ textedDiary }) => {
  const router = useRouter();
  const privateDiary = JSON.parse(textedDiary);
  return (
    <div className={form.wrapper}>
      <div>
        <UploadNav></UploadNav>
        <div className={form.mainContainer}>
          <div className={form.dateForm}>
            <p className={form.date}>{privateDiary.postingDate}</p>
          </div>
          <div className={form.photoForm}>
            {/* <label
              htmlFor="diary__form__photo"
              className={image ? null : form.border} //사진 선택하면 테두리 없어진다.
            > */}
            {privateDiary.photo.map((img) => (
              <Image
                src={img}
                width="500px"
                height="500px"
                className={form.thumbnail}
              ></Image>
            ))}
          </div>
          <div className={form.textContainer}>
            <p className={form.title}>{privateDiary.title}</p>
            <p className={form.content}>{privateDiary.content}</p>
          </div>
        </div>
      </div>
      {/* {showModal && (
        <IsUploading
          uploaded={uploaded}
          setUploaded={setUploaded}
          showModal={showModal}
          setShowModal={setShowModal}
        ></IsUploading>
      )} */}
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
