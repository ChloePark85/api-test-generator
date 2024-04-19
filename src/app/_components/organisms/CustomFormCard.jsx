"use client";

import style from "./customFormCard.module.css";
import { useRouter } from "next/navigation";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import CheckBox from "../atoms/Check";

export default function CustomFormCard() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState();

  const router = useRouter();
  const onClickClose = () => {
    router.back();
    // TODO: 뒤로가기가 /home이 아니면 /home으로 보내기
  };

  const onChangeId = (e) => {
    setId(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const onChangeNickname = (e) => {
    setNickname(e.target.value);
  };
  const onChangeImageFile = (e) => {
    e.target.files && setImageFile(e.target.files[0]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:9090/api/users", {
      method: "post",
      body: JSON.stringify({
        id,
        nickname,
        image,
        password,
      }),
      credentials: "include",
    })
      .then((response) => {
        console.log(response.status);
        if (response.status === 200) {
          router.replace("/home");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <div className={style.modalBackground}>
        <div className={style.modal}>
          <div className={style.modalHeader}>
            <div>결제 서비스 테스트 케이스</div>
            <span className={style.progressBar}></span>
          </div>
          <CheckBox />
          <ul class="checklist">
            <li class="checked">고객 결제 요약이 마이너스가 되면 안 됩니다</li>
            <li>고객 결제 금액과 상품의 가격이 일치해야 합니다</li>
            <li>
              PG사로 부터 결제 취소의 실패할 경우 500에러를 반환해야 합니다
            </li>
          </ul>
          <ul class="checklist">
            <li>
              결제할 돈이 없더라도 다른 사람이 조치를 요청할 경우 400에러를
              반환해야 합니다
            </li>
            <li class="checked">남한 존에 영수증 링크를 표시해야 합니다</li>
          </ul>
          <div className={style.modalFooter}>
            <button className={style.actionButton} disabled>
              + 새 그룹 추가
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
