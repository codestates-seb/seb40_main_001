import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import HeaderArrow from '../UI/molecules/HeaderArrow';
import ApplicantSet from '../UI/molecules/Applicant';
import InputComments from '../UI/molecules/InputComments';
import DetailContents from '../UI/organisms/DetailContents';
import ViewerComments from '../UI/organisms/ViewerComments';
import { client } from '../../client/client';
import userInfoState from '../../recoil/atoms';

// 해당 id 값을 어떻게 받아오는가에 대한 로직 -> 승환님 도와줘요오
// Applicant button onClick event setting
// input button onClick event setting
// change createAt && endAt -> YYYY-MM-DD
// leftArrow connect navigate page

const ArounderViewer = () => {
  const navigate = useNavigate();
  const UserId = useRecoilValue(userInfoState);
  const { id } = useParams();
  const [contentsData, setContentsData] = useState([]);
  const [proposalsData, setProposalsData] = useState([]);
  const [commentsData, setCommentsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [writeComments, setWriteComments] = useState('');

  // 글 내용 관련 데이터 가져오기
  const getContentsData = async () => {
    const contentsResponse = await client.get(`/exercises/${id}`);
    setContentsData(contentsResponse.data);
  };

  // 지원자 데이터 가져오기
  const getProposalsData = async () => {
    const proposalsResponse = await client.get(`/exercises/${id}/proposals`);
    setProposalsData(proposalsResponse.data.data);
  };

  // 댓글 데이터 가져오기
  const getCommentsData = async () => {
    const commentsResponse = await client.get(
      `/exercises/${id}/comments?cursorId=0&size=100`,
    );
    setCommentsData(commentsResponse.data.data);
  };

  // input value 저장
  const commentsHandler = e => {
    setWriteComments(e.target.value);
  };

  // 화살표 클릭 시 main으로 돌아가기
  const arrowHandler = () => {
    navigate('/main');
  };

  // 댓글 삭제 handler
  // eslint-disable-next-line no-unused-vars
  const mainReplyDeleteHandler = async () => {
    // await client.delete(`/comments/${commentsData.commentId}`);
    console.log(commentsData.commentID);
  };

  // 대댓글 삭제 handler
  // eslint-disable-next-line no-unused-vars
  const nonMainReplyDeleteHandler = async () => {
    // await client.delete(`/replies/${commentsData.replies.replyId}`);
    console.log(commentsData && commentsData.replies);
  };

  // 댓글 달기
  const writeMainReplies = e => {
    e.preventDefault();
    if (writeComments === '') {
      alert('내용을 입력해주세요.');
      return;
    }
    const body = {
      content: writeComments,
    };
    client.post(`/exercises/${id}/comments`, body);
    setWriteComments('');
  };

  // 대댓글 달기
  // eslint-disable-next-line no-unused-vars
  const writeSubReplies = e => {
    e.preventDefault();
    if (writeComments === '') {
      alert('내용을 입력해주세요.');
      return;
    }
    const body = {
      content: writeComments,
    };
    client.post(`/comments/{comment-id}/replies`, body);
    setWriteComments('');
  };

  useEffect(() => {
    const dataSetting = async () => {
      await getContentsData();
      await getProposalsData();
      await getCommentsData();
      setLoading(true);
    };
    dataSetting();
  }, []);

  return (
    <>
      {loading && (
        <div className="flex flex-col justify-center items-center overflow: auto;">
          <HeaderArrow arrowHandler={arrowHandler} txt={'상세 글 보기'} />
          <DetailContents
            contentsData={contentsData}
            img={contentsData && contentsData.images}
          />
          <ApplicantSet
            proposalsData={proposalsData}
            writer={contentsData.host && contentsData.host.memberId}
            userId={UserId}
          />
          <InputComments
            target="댓글을"
            handler={writeReplies} // post 요청 줘야한다
            onChange={commentsHandler}
            value={writeMainReplies}
          />
          <ViewerComments
            target="답글을"
            writer={contentsData.host && contentsData.host.memberId}
            userId={UserId}
            commentsData={commentsData}
            mainReplyDeleteHandler={mainReplyDeleteHandler}
            nonMainReplyDeleteHandler={nonMainReplyDeleteHandler}
          />
        </div>
      )}
    </>
  );
};

export default ArounderViewer;
