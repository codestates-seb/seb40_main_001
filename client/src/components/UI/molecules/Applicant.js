import React, { useState } from 'react';
import Applicant from '../atoms/Applicant';
import { ShortBtn } from '../atoms';
import { client } from '../../../client/client';

const ApplicantSet = ({ contentsData, proposalsData, writer, userId }) => {
  const [together, setTogether] = useState(false);
  const [checkProfile, setCheckProfile] = useState(false);
  const [isSelected, setIsSelected] = useState(0);

  const buttonHandler = () => {
    setTogether(!together);
  };

  const checkUsable = proposalsData.map(x => {
    return x.participant && x.participant.memberId;
  });

  const profileHandler = id => {
    const profiles = new Array(proposalsData.length).fill(false);
    profiles[id] = true;
    setCheckProfile(profiles);
    setIsSelected(id);
  };

  const txt = together ? '완료' : '함께하기';

  const submitProposals = async () => {
    await client
      .post(`/exercises/${contentsData.exerciseId}/proposals`)
      .then(() => {
        buttonHandler();
        alert('신청 완료했습니다.');
        window.location.reload();
      });
  };

  // eslint-disable-next-line no-unused-vars
  const confirmProposals = async () => {
    await client
      .post(`/proposals/${proposalsData[isSelected].proposalId}/approvals`)
      .then(() => {
        alert('어라운더를 정했습니다.');
        window.location.reload();
      });
  };

  // 지원자 없음 && 뷰어 일 때
  if (
    contentsData &&
    contentsData.exerciseStatus === 'ACTIVE' &&
    proposalsData.length === 0 &&
    writer !== userId
  ) {
    return (
      <>
        <div className="flex flex-row w-[350px] items-end justify-end">
          <div className="flex items-center">
            <ShortBtn
              txt={txt}
              handleClick={submitProposals}
              pink={!together}
              disabled={together}
            />
          </div>
        </div>
      </>
    );
  }
  // 지원자 없음 && 글작성자 일 때
  if (
    contentsData &&
    contentsData.exerciseStatus === 'ACTIVE' &&
    proposalsData.length === 0 &&
    writer === userId
  ) {
    return (
      <>
        <div className="flex flex-row w-[350px] items-end justify-end">
          <div className="flex items-center">
            <ShortBtn
              txt={'모집 중'}
              handleClick={buttonHandler}
              pink={!together}
              disabled={!together}
            />
          </div>
        </div>
      </>
    );
  }

  const buttonType = () => {
    if (
      contentsData &&
      contentsData.exerciseStatus === 'CLOSED' &&
      writer === userId
    ) {
      return (
        <div className="flex items-center">
          <ShortBtn txt={'확정완료'} disabled={!together} />
        </div>
      );
    }
    if (
      contentsData &&
      contentsData.exerciseStatus === 'CLOSED' &&
      writer !== userId &&
      checkUsable.indexOf(userId) !== -1
    ) {
      return (
        <div className="flex items-center">
          <ShortBtn txt={'신청완료'} disabled={!together} />
        </div>
      );
    }
    if (writer === userId) {
      return (
        <div className="flex items-center">
          <ShortBtn
            txt={txt}
            handleClick={confirmProposals}
            pink={!together}
            disabled={together}
          />
        </div>
      );
    }
    if (writer !== userId && checkUsable.indexOf(userId) === -1) {
      return (
        <div className="flex items-center">
          <ShortBtn
            txt={txt}
            handleClick={submitProposals}
            pink={!together}
            disabled={together}
          />
        </div>
      );
    }
    return (
      <div className="flex items-center">
        <ShortBtn txt={'신청완료'} disabled={!together} />
      </div>
    );
  };
  // 예외 사항 외 리턴
  return (
    <div className="flex flex-row w-[350px] items-start justify-start">
      <div className=" flex items-center justify-between">
        <div className="carousel w-[250px] mr-[10px] overflow-x-scroll flex flex-row">
          {proposalsData.map((x, id) => {
            // 글 모집 기간이 아닐 때
            if (contentsData && contentsData.exerciseStatus === 'CLOSED') {
              return (
                <>
                  <div
                    key={id}
                    className="flex flex-col justify-center items-center mr-[5px] opacity-60"
                  >
                    <Applicant
                      target={
                        x.participant &&
                        x.participant.image &&
                        x.participant.image.remotePath
                      }
                    />
                    <div className="text-center w-[50px] text-200 truncate">
                      {x.participant && x.participant.nickname}
                    </div>
                  </div>
                </>
              );
            }
            // 글 모집 기간일 때
            if (contentsData && contentsData.exerciseStatus === 'ACTIVE') {
              // 신청자 일 때 && 신청하지 않은 사람일 때
              if (writer !== userId && checkUsable.indexOf(userId) === -1) {
                return (
                  <>
                    <div
                      key={id}
                      className="flex flex-col justify-center items-center mr-[5px] opacity-60"
                    >
                      <Applicant
                        target={
                          x.participant &&
                          x.participant.image &&
                          x.participant.image.remotePath
                        }
                      />
                      <div className="text-center w-[50px] text-200 truncate">
                        {x.participant && x.participant.nickname}
                      </div>
                    </div>
                  </>
                );
              }
              // 신청자 일 때 && 신청한 사람일 때
              if (writer !== userId && checkUsable.indexOf(userId) !== -1) {
                return (
                  <>
                    <div
                      key={id}
                      className="flex flex-col justify-center items-center mr-[5px] opacity-60"
                    >
                      <Applicant
                        target={
                          x.participant &&
                          x.participant.image &&
                          x.participant.image.remotePath
                        }
                      />
                      <div className="text-center w-[50px] text-200 truncate">
                        {x.participant && x.participant.nickname}
                      </div>
                    </div>
                  </>
                );
              }
              // 작성자 일 때 && 선택하지 않았을 때
              if (writer === userId && checkProfile[id]) {
                return (
                  <>
                    <div
                      key={id}
                      className="flex flex-col  justify-center items-center mr-[5px] opacity-100"
                      onClick={() => profileHandler(id)}
                    >
                      <Applicant
                        target={
                          x.participant &&
                          x.participant.image &&
                          x.participant.image.remotePath
                        }
                      />
                      <div className="text-center w-[50px] text-200 truncate items-center">
                        {x.participant && x.participant.nickname}
                      </div>
                    </div>
                  </>
                );
              }
              // 작성자 일 때 && 선택을 했을 때
              if (writer === userId && !checkProfile[id]) {
                return (
                  <>
                    <div
                      key={id}
                      className="flex flex-col justify-center items-center mr-[5px] opacity-60"
                      onClick={() => profileHandler(id)}
                    >
                      <Applicant
                        target={
                          x.participant &&
                          x.participant.image &&
                          x.participant.image.remotePath
                        }
                      />
                      <div className="text-center w-[50px] text-200 truncate">
                        {x.participant && x.participant.nickname}
                      </div>
                    </div>
                  </>
                );
              }
            }

            return <></>;
          })}
        </div>
        {buttonType()}
      </div>
    </div>
  );
};

export default ApplicantSet;
