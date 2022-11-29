import React, { useState } from 'react';
import { WriterCard, ViewerCL, ViewerCLX, InputComments } from '../molecules';
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

const ViewerComments = ({ target, userId, writer }) => {
  const [reply, setReply] = useState(
    new Array(dummyData.data.length).fill(false),
  );
  const writeReply = idx => {
    // if (clickReply[idx]) clickReply[idx] = false;
    // else clickReply[idx] = true;
    setReply(prev => {
      const clickReply = prev;
      clickReply[idx] = !clickReply[idx];
      return clickReply;
    });
  };

  return (
    <div className="flex flex-col justify-center mt-[20px] h-full overflow: auto;">
      {dummyData.data.map((x, idx) => {
        // 뷰어와 댓글 작성자가 같은 경우
        if (userId === x.author.memberId) {
          return reply[idx] ? (
            // 댓글 버튼을 눌렀다.
            <>
              <div className="mb-2">
                <ViewerCLX
                  key={idx}
                  nickname={x.author.nickname}
                  contents={x.content}
                  handler={writeReply}
                  id={idx}
                  mainReply={true}
                />
                <div className="mt-1 mb-1"></div>
                <InputComments handler={writeReply} target={target} />
              </div>
              {x.replies.length !== 0 &&
                x.replies.map((y, id) => {
                  // 대댓글 작성자가 뷰어 이다
                  if (y.author.memberId === userId) {
                    return (
                      <>
                        <div className="flex flex-row items-center mb-2">
                          <Recomment />
                          <div className="flex flex-col justify-center">
                            <ViewerCLX
                              key={id}
                              nickname={y.author.nickname}
                              contents={y.content}
                              handler={writeReply}
                              id={id}
                              mainReply={false}
                            />
                          </div>
                        </div>
                      </>
                    );
                  }
                  // 대댓글 작성자가 뷰어가 아니다
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
                              mainReply={false}
                            />
                          </div>
                        </div>
                      </>
                    );
                  }
                  // 댓글을 쓴 사람이 글 작성자다
                  if (y.author.memberId === writer) {
                    return (
                      <>
                        <div className="flex flex-row items-center mb-2">
                          <Recomment />
                          <div className="flex flex-col justify-center">
                            <WriterCard
                              key={id}
                              nickname={y.author.nickname}
                              contents={y.content}
                              handler={writeReply}
                              id={id}
                              mainReply={false}
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
            // 댓글 버튼을 안눌렀다.
            <>
              <div className="mb-2">
                <ViewerCLX
                  key={idx}
                  nickname={x.author.nickname}
                  contents={x.content}
                  handler={writeReply}
                  id={idx}
                  mainReply={true}
                />
              </div>
              {x.replies.length !== 0 &&
                x.replies.map((y, id) => {
                  // 대댓글 작성자가 뷰어 이다
                  if (y.author.memberId === userId) {
                    return (
                      <>
                        <div className="flex flex-row items-center mb-2">
                          <Recomment />
                          <div className="flex flex-col justify-center">
                            <ViewerCLX
                              key={id}
                              nickname={y.author.nickname}
                              contents={y.content}
                              handler={writeReply}
                              id={id}
                              mainReply={false}
                            />
                          </div>
                        </div>
                      </>
                    );
                  }
                  // 대댓글 작성자가 뷰어가 아니다
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
                              mainReply={false}
                            />
                          </div>
                        </div>
                      </>
                    );
                  }
                  // 댓글을 쓴 사람이 글 작성자다
                  if (y.author.memberId === writer) {
                    return (
                      <>
                        <div className="flex flex-row items-center mb-2">
                          <Recomment />
                          <div className="flex flex-col justify-center">
                            <WriterCard
                              key={id}
                              nickname={y.author.nickname}
                              contents={y.content}
                              handler={writeReply}
                              id={id}
                              mainReply={false}
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
        // 뷰어와 댓글 작성자가 다르다.그리고 댓글 작성자가 게시글 작성자와 다르다
        if (userId !== x.author.memberId && writer !== x.author.memberId) {
          console.log(reply[idx]);
          return reply[idx] ? (
            // 댓글 버튼을 눌렀다.
            <>
              <div className="mb-2">
                <ViewerCL
                  key={idx}
                  nickname={x.author.nickname}
                  contents={x.content}
                  handler={writeReply}
                  id={idx}
                  mainReply={true}
                />
                <div className="mt-1 mb-1"></div>
                <InputComments handler={writeReply} target={target} />
              </div>
              {x.replies.length !== 0 &&
                x.replies.map((y, id) => {
                  // 대댓글 작성자가 뷰어 이다
                  if (y.author.memberId === userId) {
                    return (
                      <>
                        <div className="flex flex-row items-center mb-2">
                          <Recomment />
                          <div className="flex flex-col justify-center">
                            <ViewerCLX
                              key={id}
                              nickname={y.author.nickname}
                              contents={y.content}
                              handler={writeReply}
                              id={id}
                              mainReply={false}
                            />
                          </div>
                        </div>
                      </>
                    );
                  }
                  // 대댓글 작성자가 뷰어가 아니다
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
                              mainReply={false}
                            />
                          </div>
                        </div>
                      </>
                    );
                  }
                  // 댓글을 쓴 사람이 글 작성자다
                  if (y.author.memberId === writer) {
                    return (
                      <>
                        <div className="flex flex-row items-center mb-2">
                          <Recomment />
                          <div className="flex flex-col justify-center">
                            <WriterCard
                              key={id}
                              nickname={y.author.nickname}
                              contents={y.content}
                              handler={writeReply}
                              id={id}
                              mainReply={false}
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
            // 댓글 버튼을 안눌렀다.
            <>
              <div className="mb-2">
                <ViewerCL
                  key={idx}
                  nickname={x.author.nickname}
                  contents={x.content}
                  handler={writeReply}
                  id={idx}
                  mainReply={true}
                />
              </div>
              {x.replies.length !== 0 &&
                x.replies.map((y, id) => {
                  // 대댓글 작성자가 뷰어 이다
                  if (y.author.memberId === userId) {
                    return (
                      <>
                        <div className="flex flex-row items-center mb-2">
                          <Recomment />
                          <div className="flex flex-col justify-center">
                            <ViewerCLX
                              key={id}
                              nickname={y.author.nickname}
                              contents={y.content}
                              handler={writeReply}
                              id={id}
                              mainReply={false}
                            />
                          </div>
                        </div>
                      </>
                    );
                  }
                  // 대댓글 작성자가 뷰어가 아니다
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
                              mainReply={false}
                            />
                          </div>
                        </div>
                      </>
                    );
                  }
                  // 댓글을 쓴 사람이 글 작성자다
                  if (y.author.memberId === writer) {
                    return (
                      <>
                        <div className="flex flex-row items-center mb-2">
                          <Recomment />
                          <div className="flex flex-col justify-center">
                            <WriterCard
                              key={id}
                              nickname={y.author.nickname}
                              contents={y.content}
                              handler={writeReply}
                              id={id}
                              mainReply={false}
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
        // 뷰어와 댓글 작성자가 다르다. 그리고 작성자와 댓글 작성자가 같다.
        if (userId !== x.author.memberId && writer === x.author.memberId) {
          return reply[idx] ? (
            // 댓글 버튼을 눌렀다.
            <>
              <div className="mb-2">
                <WriterCard
                  key={idx}
                  nickname={x.author.nickname}
                  contents={x.content}
                  handler={writeReply}
                  id={idx}
                  mainReply={true}
                />
                <div className="mt-1 mb-1"></div>
                <InputComments handler={writeReply} target={target} />
              </div>
              {x.replies.length !== 0 &&
                x.replies.map((y, id) => {
                  // 대댓글 작성자가 뷰어 이다
                  if (y.author.memberId === userId) {
                    return (
                      <>
                        <div className="flex flex-row items-center mb-2">
                          <Recomment />
                          <div className="flex flex-col justify-center">
                            <ViewerCLX
                              key={id}
                              nickname={y.author.nickname}
                              contents={y.content}
                              handler={writeReply}
                              id={id}
                              mainReply={false}
                            />
                          </div>
                        </div>
                      </>
                    );
                  }
                  // 대댓글 작성자가 뷰어가 아니다
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
                              mainReply={false}
                            />
                          </div>
                        </div>
                      </>
                    );
                  }
                  // 댓글을 쓴 사람이 글 작성자다
                  if (y.author.memberId === writer) {
                    return (
                      <>
                        <div className="flex flex-row items-center mb-2">
                          <Recomment />
                          <div className="flex flex-col justify-center">
                            <WriterCard
                              key={id}
                              nickname={y.author.nickname}
                              contents={y.content}
                              handler={writeReply}
                              id={id}
                              mainReply={false}
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
            // 댓글 버튼을 안눌렀다.
            <>
              <div className="mb-2">
                <WriterCard
                  key={idx}
                  nickname={x.author.nickname}
                  contents={x.content}
                  handler={writeReply}
                  id={idx}
                  mainReply={true}
                />
              </div>
              {x.replies.length !== 0 &&
                x.replies.map((y, id) => {
                  // 대댓글 작성자가 뷰어 이다
                  if (y.author.memberId === userId) {
                    return (
                      <>
                        <div className="flex flex-row items-center mb-2">
                          <Recomment />
                          <div className="flex flex-col justify-center">
                            <ViewerCLX
                              key={id}
                              nickname={y.author.nickname}
                              contents={y.content}
                              handler={writeReply}
                              id={id}
                              mainReply={false}
                            />
                          </div>
                        </div>
                      </>
                    );
                  }
                  // 대댓글 작성자가 뷰어가 아니다
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
                              mainReply={false}
                            />
                          </div>
                        </div>
                      </>
                    );
                  }
                  // 댓글을 쓴 사람이 글 작성자다
                  if (y.author.memberId === writer) {
                    return (
                      <>
                        <div className="flex flex-row items-center mb-2">
                          <Recomment />
                          <div className="flex flex-col justify-center">
                            <WriterCard
                              key={id}
                              nickname={y.author.nickname}
                              contents={y.content}
                              handler={writeReply}
                              id={id}
                              mainReply={false}
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

export default ViewerComments;
