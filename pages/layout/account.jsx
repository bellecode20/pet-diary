import sign from "../../styles/pages/signUp.module.scss";
const Account = ({ main }) => {
  return (
    <div className={sign.wrapper}>
      <img
        className={sign.logo}
        src="/logo.png"
        height="100px"
        width="100px"
      ></img>
      {main}
    </div>
  );
};

export default Account;
