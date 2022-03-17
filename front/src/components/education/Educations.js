import React, { useState, useEffect } from "react";
import EducationEditForm from "./EducationEditForm";
import EducationCard from "./EducationCard";

/**
 * @param {Object} val - eduList 배열 안에 있는 각각의 객체, 예시:{ school: "서울대학교", major: "컴퓨터", position: "박사졸업" }
 * @param {Array} eduList - 학력 정보 리스트
 * @param {function} setEduList - eduList 상태를 바꿀 수 있는 함수(사용자의 학력 정보를 추가, 변경, 삭제를 eduList 상태값을 변경하여 바꾸는데 그때 사용)
 * @param {Boolean} isEditable - 편집 가능한지 여부(여기선 하위 컴포넌트에 props로 넘겨주기 위 가져옴)
 * @returns (\<Educations key={index} val={val} eduList={eduList} setEduList={setEduList} isEditable={isEditable}/>)
 */
function Educations({ val, eduList, setEduList, isEditable }) {
  /**
   * @param {Boolean} isEditing - 편집페이지를 보여줄지 카드페이지로 보여줄지
   * @param {function} setIsEditing - isEditing 상태를 바꿀 수 있는 함수(해당 기능을 통해 편집버튼을 누르면 해당 값(상태)을 변경시켜 편집페이지와 카드페이지로 전환할 수 있음)
   */
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div>
      {/* isEditing 이 true면 <EducationEditForm/>편집페이지렌더링 false면 <EducationCard/>카드페이지를 렌더링*/}
      {isEditing ? (
        <EducationEditForm
          val={val}
          eduList={eduList}
          setEduList={setEduList}
          setIsEditing={setIsEditing}
        ></EducationEditForm>
      ) : (
        <EducationCard
          val={val}
          isEditable={isEditable}
          setIsEditing={setIsEditing}
        ></EducationCard>
      )}
    </div>
  );
}

export default Educations;
