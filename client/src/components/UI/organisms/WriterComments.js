import React, { useState } from 'react';
import { WriterCardX, ViewerCL, InputComments } from '../molecules';
import { Recomment } from '../../../assets/img';

const WriterComments = ({
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
    <div className="flex flex-col justify-center mt-[20px] ml-[40px] w-full h-full overflow: auto;">
      {commentsData &&
        commentsData.map((x, idx) => {
          // 글 작성자인 경우
          if (writer === x.author.memberId) {
            return reply[idx] ? (
              // 댓글 쓰기를 눌렀다
              <div key={idx}>
                <div className="mb-2">
                  <WriterCardX
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
                    // 대댓글 작성자가 글작성자 이다
                    if (y.author.memberId === writer) {
                      return (
                        <div key={id}>
                          <div className="flex flex-row items-center mb-2">
                            <Recomment />
                            <div className="flex flex-col justify-center">
                              <WriterCardX
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
                        </div>
                      );
                    }
                    // 대댓글 작성자가 글 작성자가 아니다
                    if (y.author.memberId !== userId) {
                      return (
                        <div key={id}>
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
                        </div>
                      );
                    }
                    return <></>;
                  })}
              </div>
            ) : (
              // 댓글 쓰기를 누르지 않았다
              <div key={idx}>
                <div className="mb-2">
                  <WriterCardX
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
                    // 대댓글 작성자가 글작성자 이다
                    if (y.author.memberId === userId) {
                      return (
                        <div key={id}>
                          <div className="flex flex-row items-center mb-2">
                            <Recomment />
                            <div className="flex flex-col justify-center">
                              <WriterCardX
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
                        </div>
                      );
                    }
                    // 대댓글 작성자가 글작성자가 아니다
                    if (y.author.memberId !== userId) {
                      return (
                        <div key={id}>
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
                        </div>
                      );
                    }
                    return <></>;
                  })}
              </div>
            );
          }
          // 글 작성자가 아닌 경우
          if (writer !== x.author.memberId) {
            return reply[idx] ? (
              // 댓글 쓰기를 눌렀다
              <div key={idx}>
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
                    // 대댓글 작성자가 글작성자 이다
                    if (y.author.memberId === userId) {
                      return (
                        <div key={id}>
                          <div className="flex flex-row items-center mb-2">
                            <Recomment />
                            <div className="flex flex-col justify-center">
                              <WriterCardX
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
                        </div>
                      );
                    }
                    // 대댓글 작성자가 글작성자가 아니다
                    if (y.author.memberId !== userId) {
                      return (
                        <div key={id}>
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
                        </div>
                      );
                    }
                    return <></>;
                  })}
              </div>
            ) : (
              // 댓글 쓰기를 누르지 않았다
              <div key={idx}>
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
                    // 대댓글 작성자가 글작성자 이다
                    if (y.author.memberId === userId) {
                      return (
                        <div key={id}>
                          <div className="flex flex-row items-center mb-2">
                            <Recomment />
                            <div className="flex flex-col justify-center">
                              <WriterCardX
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
                        </div>
                      );
                    }
                    // 대댓글 작성자가 글작성자가 아니다
                    if (y.author.memberId !== userId) {
                      return (
                        <div key={id}>
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
                        </div>
                      );
                    }
                    return <></>;
                  })}
              </div>
            );
          }
          return <></>;
        })}
    </div>
  );
};

export default WriterComments;
