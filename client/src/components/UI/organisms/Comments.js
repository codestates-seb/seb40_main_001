import React, { useState } from 'react';
import WriterCardX from '../molecules/WriterCardLayouts_X';
import WriterCard from '../molecules/WriterCardLayouts';
import ViewerCL from '../molecules/CommentViewer';
import ViewerCLX from '../molecules/CommentViewer_X';
import { ReactComponent as Recomments } from '../../../assets/img/icons/recomment.svg';
import InputComments from '../molecules/InputComments';

const Comments = ({ target }) => {
  const [reply, setReply] = useState(false);

  const dummyData = [
    {
      userId: '헬리',
      nickname: '헬리',
      recontents: '저 배드민턴 초보인데 참가 가능한가요?',
      writer: true,
      viewer: false,
      comments: true,
      recomments: false,
    },
    {
      userId: '헬리',
      nickname: '앤디',
      recontents: '저 배드민턴 중수인데 참가 가능한가요?',
      writer: false,
      viewer: true,
      comments: false,
      recomments: 'true',
    },
    {
      userId: '헬리',
      nickname: '루모스',
      recontents: '저 배드민턴 고수인데 참가 가능한가요?',
      writer: false,
      viewer: true,
      comments: false,
      recomments: 'true',
    },
    {
      userId: '헬리',
      nickname: '큐원',
      recontents: '저 배드민턴 볼보이인데 참가 가능한가요?',
      writer: false,
      viewer: true,
      comments: true,
      recomments: true,
    },
    {
      userId: '헬리',
      nickname: '가형',
      recontents: '저 배드민턴 심판인데 참가 가능한가요?',
      writer: false,
      viewer: true,
      comments: false,
      recomments: true,
    },
    {
      userId: '헬리',
      nickname: '유정',
      recontents: '저 배드민턴 하수인데 참가 가능한가요?',
      writer: false,
      viewer: true,
      comments: false,
      recomments: true,
    },
  ];

  /* 댓글 구현
  1. 답글을 눌렀을 때 input 창이 나와야한다. (답글 => handler props 통일)
  2. 글쓴이 인지 뷰어인지 id 값을 확인한 다음 창이 바뀌어서 달려야한다.
  3. 아래 화살표와 함께 달려야한다.
  */
  const writeReply = idx => {
    const replyInput = new Array(dummyData.length).fill(false);
    replyInput[idx] = true;
    setReply(replyInput);
  };

  return (
    <div className="flex flex-col justify-center mt-[20px] h-full overflow: auto;">
      {dummyData.map((x, idx) => {
        if (!reply[idx]) {
          if (x.comments && x.viewer) {
            return x.userId !== x.nickname ? (
              <div className="mb-2">
                <ViewerCL
                  key={idx}
                  nickname={x.nickname}
                  contents={x.recontents}
                  handler={writeReply}
                  id={idx}
                />
              </div>
            ) : (
              <div className="mb-2">
                <ViewerCLX
                  key={idx}
                  nickname={x.nickname}
                  contents={x.recontents}
                  handler={writeReply}
                  id={idx}
                />
              </div>
            );
          }
          if (x.comments && x.writer) {
            return x.userId !== x.nickname ? (
              <div className="mb-2">
                <WriterCard
                  key={idx}
                  nickname={x.nickname}
                  contents={x.recontents}
                  handler={writeReply}
                  id={idx}
                />
              </div>
            ) : (
              <div className="mb-2">
                <WriterCardX
                  key={idx}
                  nickname={x.nickname}
                  contents={x.recontents}
                  handler={writeReply}
                  id={idx}
                />
              </div>
            );
          }
          if (x.recomments && x.viewer) {
            return (
              <div className="flex flex-row items-center mb-2">
                <Recomments />
                <ViewerCL
                  key={idx}
                  nickname={x.nickname}
                  contents={x.recontents}
                  handler={writeReply}
                  id={idx}
                />
              </div>
            );
          }
        }
        if (reply[idx]) {
          if (x.comments && x.viewer) {
            return x.userId !== x.nickname ? (
              <div className="mb-2">
                <ViewerCL
                  key={idx}
                  nickname={x.nickname}
                  contents={x.recontents}
                  handler={writeReply}
                  id={idx}
                />
                <div className="mt-1 mb-1"></div>
                <InputComments handler={writeReply} />
              </div>
            ) : (
              <div className="mb-2">
                <ViewerCLX
                  key={idx}
                  nickname={x.nickname}
                  contents={x.recontents}
                  handler={writeReply}
                  id={idx}
                />
                <div className="mt-1 mb-1"></div>
                <InputComments handler={writeReply} />
              </div>
            );
          }
          if (x.comments && x.writer) {
            return x.userId !== x.nickname ? (
              <div className="mb-2">
                <WriterCard
                  key={idx}
                  nickname={x.nickname}
                  contents={x.recontents}
                  handler={writeReply}
                  id={idx}
                />
                <div className="mt-1 mb-1"></div>
                <InputComments handler={writeReply} />
              </div>
            ) : (
              <div className="mb-2">
                <WriterCardX
                  key={idx}
                  nickname={x.nickname}
                  contents={x.recontents}
                  handler={writeReply}
                  id={idx}
                />
                <div className="mt-1 mb-1"></div>
                <InputComments handler={writeReply} target={target} />
              </div>
            );
          }
          if (x.recomments && x.viewer) {
            return (
              <div className="flex flex-row items-center mb-2">
                <Recomments />
                <div className="flex flex-col justify-center">
                  <ViewerCL
                    key={idx}
                    nickname={x.nickname}
                    contents={x.recontents}
                    handler={writeReply}
                    id={idx}
                  />
                  <div className="mt-1 mb-1"></div>
                  <InputComments handler={writeReply} target={target} />
                </div>
              </div>
            );
          }
        }
        return <></>;
      })}
    </div>
  );
};

export default Comments;
