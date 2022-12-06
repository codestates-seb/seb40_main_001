import React, { useState } from 'react';
import { WriterCard, ViewerCL, ViewerCLX, InputComments } from '../molecules';
import { Recomment } from '../../../assets/img';

const ViewerComments = ({
  onChange,
  value,
  handler,
  target,
  userId,
  writer,
  commentsData,
  mainReplyDeleteHandler,
  nonMainReplyDeleteHandler,
}) => {
  const [reply, setReply] = useState(false);
  const writeReply = idx => {
    const clickReply = new Array(commentsData.length).fill(false);
    clickReply[idx] = true;
    setReply(clickReply);
  };

  return (
    <div className="flex flex-col items-start w-[350px] mt-[20px] h-full overflow: auto;">
      {commentsData &&
        commentsData.map((x, idx) => {
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
                    deleteHandler={mainReplyDeleteHandler}
                  />
                  <div className="mt-1 mb-1"></div>
                  <InputComments
                    value={value}
                    handler={handler}
                    id={idx}
                    target={target}
                    onChange={onChange}
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
                                parentId={idx}
                                id={id}
                                mainReply={false}
                                deleteHandler={nonMainReplyDeleteHandler}
                              />
                            </div>
                          </div>
                        </>
                      );
                    }
                    // 대댓글을 쓴 사람이 글 작성자다
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
                    deleteHandler={mainReplyDeleteHandler}
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
                                parentId={idx}
                                mainReply={false}
                                deleteHandler={nonMainReplyDeleteHandler}
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
                    return <></>;
                  })}
              </>
            );
          }
          // 뷰어와 댓글 작성자가 다르다.그리고 댓글 작성자가 게시글 작성자와 다르다
          if (userId !== x.author.memberId && writer !== x.author.memberId) {
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
                  <InputComments
                    value={value}
                    handler={handler}
                    id={idx}
                    target={target}
                    onChange={onChange}
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
                                parentId={idx}
                                mainReply={false}
                                deleteHandler={nonMainReplyDeleteHandler}
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
                                parentId={idx}
                                mainReply={false}
                                deleteHandler={nonMainReplyDeleteHandler}
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
                  <InputComments
                    value={value}
                    handler={handler}
                    id={idx}
                    target={target}
                    onChange={onChange}
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
                                parentId={idx}
                                mainReply={false}
                                deleteHandler={nonMainReplyDeleteHandler}
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
                                parentId={idx}
                                id={id}
                                mainReply={false}
                                deleteHandler={nonMainReplyDeleteHandler}
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
