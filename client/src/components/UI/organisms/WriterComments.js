import React, { useState } from 'react';
import { WriterCardX, ViewerCL, InputComments } from '../molecules';
import { Recomment } from '../../../assets/img';

const dummyData = {
  data: [
    // replies length = 0 일 경우 댓글 없음
    // 이대로 렌더 해줘도 크게 상관 없을 듯
    {
      commentId: 1,
      content: '저랑 산책 같이 해요!',
      author: {
        memberId: 2,
        email: 'apple@gmail.com',
        nickname: '사과',
        address: {
          addressId: 1,
          sido: '서울특별시',
          sigungu: '강남구',
          eupmyeondong: null,
        },
        image: null,
      },
      createdAt: '2022-11-22T23:40:45.408774',
      updatedAt: '2022-11-22T23:40:45.408774',
      replies: [
        {
          comment: {
            commentId: 1,
          },
          replyId: 1,
          content: '공원 앞에서 만나요.',
          author: {
            memberId: 1,
            email: 'orange@gmail.com',
            nickname: '오렌지',
            address: {
              addressId: 1,
              sido: '서울특별시',
              sigungu: '강남구',
              eupmyeondong: null,
            },
            image: null,
          },
          createdAt: '2022-11-24T14:24:43.652116',
          updatedAt: '2022-11-24T14:24:43.652116',
        },
        {
          comment: {
            commentId: 1,
          },
          replyId: 2,
          content: '저도 같이 해도 될까요?',
          author: {
            memberId: 5,
            email: 'orange@gmail.com',
            nickname: '수박',
            address: {
              addressId: 1,
              sido: '서울특별시',
              sigungu: '강남구',
              eupmyeondong: null,
            },
            image: null,
          },
          createdAt: '2022-11-24T14:24:43.652116',
          updatedAt: '2022-11-24T14:24:43.652116',
        },
      ],
    },
    {
      commentId: 2,
      content: '저랑 산책 같이 해요!',
      author: {
        memberId: 3,
        email: 'apple@gmail.com',
        nickname: '딸기',
        address: {
          addressId: 1,
          sido: '서울특별시',
          sigungu: '강남구',
          eupmyeondong: null,
        },
        image: null,
      },
      createdAt: '2022-11-22T23:40:45.408774',
      updatedAt: '2022-11-22T23:40:45.408774',
      replies: [],
    },
    {
      commentId: 3,
      content: '저랑 산책 같이 해요!',
      author: {
        memberId: 4,
        email: 'apple@gmail.com',
        nickname: '망고',
        address: {
          addressId: 1,
          sido: '서울특별시',
          sigungu: '강남구',
          eupmyeondong: null,
        },
        image: null,
      },
      createdAt: '2022-11-22T23:40:45.408774',
      updatedAt: '2022-11-22T23:40:45.408774',
      replies: [
        {
          comment: {
            commentId: 1,
          },
          replyId: 2,
          content: '저랑 같이 하실래요?',
          author: {
            memberId: 5,
            email: 'orange@gmail.com',
            nickname: '수박',
            address: {
              addressId: 1,
              sido: '서울특별시',
              sigungu: '강남구',
              eupmyeondong: null,
            },
            image: null,
          },
          createdAt: '2022-11-24T14:24:43.652116',
          updatedAt: '2022-11-24T14:24:43.652116',
        },
      ],
    },
  ],
  hasNext: true,
  nextCursorId: 1,
};

const WriterComments = ({ target, userId, writer }) => {
  const [reply, setReply] = useState(false);

  const writeReply = idx => {
    const clickReply = new Array(dummyData.data.length).fill(false);
    clickReply[idx] = true;
    setReply(clickReply);
  };

  // Add reply delete button function & drop off props
  // Add edit button function & connect navigate
  // Api connect detail contents delete button
  // Add main reply button function && sub reply

  return (
    <div className="flex flex-col justify-center mt-[20px] h-full overflow: auto;">
      {dummyData.data.map((x, idx) => {
        // 글 작성자인 경우
        if (writer === x.author.memberId) {
          return reply[idx] ? (
            // 댓글 쓰기를 눌렀다
            <>
              <div className="mb-2">
                <WriterCardX
                  key={idx}
                  nickname={x.author.nickname}
                  contents={x.content}
                  handler={writeReply}
                  id={idx}
                  mainRe={true}
                />
                <div className="mt-1 mb-1"></div>
                <InputComments handler={writeReply} target={target} />
              </div>
              {x.replies.length !== 0 &&
                x.replies.map((y, id) => {
                  // 대댓글 작성자가 글작성자 이다
                  if (y.author.memberId === writer) {
                    return (
                      <>
                        <div className="flex flex-row items-center mb-2">
                          <Recomment />
                          <div className="flex flex-col justify-center">
                            <WriterCardX
                              key={id}
                              nickname={y.author.nickname}
                              contents={y.content}
                              handler={writeReply}
                              id={id}
                              mainRe={false}
                            />
                          </div>
                        </div>
                      </>
                    );
                  }
                  // 대댓글 작성자가 글 작성자가 아니다
                  if (y.author.memberId !== userId) {
                    return (
                      <>
                        <div className="flex flex-row items-center mb-2">
                          <Recomment />
                          <div className="flex flex-col justify-center">
                            <ViewerCL
                              key={id}
                              nickname={y.author.nickname}
                              contents={y.content}
                              handler={writeReply}
                              id={id}
                              mainRe={false}
                            />
                          </div>
                        </div>
                      </>
                    );
                  }
                  return <></>;
                })}
            </>
          ) : (
            // 댓글 쓰기를 누르지 않았다
            <>
              <div className="mb-2">
                <WriterCardX
                  key={idx}
                  nickname={x.author.nickname}
                  contents={x.content}
                  handler={writeReply}
                  id={idx}
                  mainRe={true}
                />
              </div>
              {x.replies.length !== 0 &&
                x.replies.map((y, id) => {
                  // 대댓글 작성자가 글작성자 이다
                  if (y.author.memberId === userId) {
                    return (
                      <>
                        <div className="flex flex-row items-center mb-2">
                          <Recomment />
                          <div className="flex flex-col justify-center">
                            <WriterCardX
                              key={id}
                              nickname={y.author.nickname}
                              contents={y.content}
                              handler={writeReply}
                              id={id}
                              mainRe={false}
                            />
                          </div>
                        </div>
                      </>
                    );
                  }
                  // 대댓글 작성자가 글작성자가 아니다
                  if (y.author.memberId !== userId) {
                    return (
                      <>
                        <div className="flex flex-row items-center mb-2">
                          <Recomment />
                          <div className="flex flex-col justify-center">
                            <ViewerCL
                              key={id}
                              nickname={y.author.nickname}
                              contents={y.content}
                              handler={writeReply}
                              id={id}
                              mainRe={false}
                            />
                          </div>
                        </div>
                      </>
                    );
                  }
                  return <></>;
                })}
            </>
          );
        }
        // 글 작성자가 아닌 경우
        if (writer !== x.author.memberId) {
          return reply[idx] ? (
            // 댓글 쓰기를 눌렀다
            <>
              <div className="mb-2">
                <ViewerCL
                  key={idx}
                  nickname={x.author.nickname}
                  contents={x.content}
                  handler={writeReply}
                  id={idx}
                  mainRe={true}
                />
                <div className="mt-1 mb-1"></div>
                <InputComments handler={writeReply} target={target} />
              </div>
              {x.replies.length !== 0 &&
                x.replies.map((y, id) => {
                  // 대댓글 작성자가 글작성자 이다
                  if (y.author.memberId === userId) {
                    return (
                      <>
                        <div className="flex flex-row items-center mb-2">
                          <Recomment />
                          <div className="flex flex-col justify-center">
                            <WriterCardX
                              key={id}
                              nickname={y.author.nickname}
                              contents={y.content}
                              handler={writeReply}
                              id={id}
                              mainRe={false}
                            />
                          </div>
                        </div>
                      </>
                    );
                  }
                  // 대댓글 작성자가 글작성자가 아니다
                  if (y.author.memberId !== userId) {
                    return (
                      <>
                        <div className="flex flex-row items-center mb-2">
                          <Recomment />
                          <div className="flex flex-col justify-center">
                            <ViewerCL
                              key={id}
                              nickname={y.author.nickname}
                              contents={y.content}
                              handler={writeReply}
                              id={id}
                              mainRe={false}
                            />
                          </div>
                        </div>
                      </>
                    );
                  }
                  return <></>;
                })}
            </>
          ) : (
            // 댓글 쓰기를 누르지 않았다
            <>
              <div className="mb-2">
                <ViewerCL
                  key={idx}
                  nickname={x.author.nickname}
                  contents={x.content}
                  handler={writeReply}
                  id={idx}
                  mainRe={true}
                />
              </div>
              {x.replies.length !== 0 &&
                x.replies.map((y, id) => {
                  // 대댓글 작성자가 글작성자 이다
                  if (y.author.memberId === userId) {
                    return (
                      <>
                        <div className="flex flex-row items-center mb-2">
                          <Recomment />
                          <div className="flex flex-col justify-center">
                            <WriterCardX
                              key={id}
                              nickname={y.author.nickname}
                              contents={y.content}
                              handler={writeReply}
                              id={id}
                              mainRe={false}
                            />
                          </div>
                        </div>
                      </>
                    );
                  }
                  // 대댓글 작성자가 글작성자가 아니다
                  if (y.author.memberId !== userId) {
                    return (
                      <>
                        <div className="flex flex-row items-center mb-2">
                          <Recomment />
                          <div className="flex flex-col justify-center">
                            <ViewerCL
                              key={id}
                              nickname={y.author.nickname}
                              contents={y.content}
                              handler={writeReply}
                              id={id}
                              mainRe={false}
                            />
                          </div>
                        </div>
                      </>
                    );
                  }
                  return <></>;
                })}
            </>
          );
        }
        return <></>;
      })}
    </div>
  );
};

export default WriterComments;
