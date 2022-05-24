import { getSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import UploadNav from "../../layout/uploadNav";
import form from "../../../styles/pages/formOfDiary.module.scss";
import IsUploading from "../../IsUploading";
import { makeId } from "../../../components/makeId";
import { useEffect, useRef, useState } from "react";
import { connectToDatabase } from "../../../lib/db";

const updatingCommu = () => {
  return;
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
export default updatingCommu;
