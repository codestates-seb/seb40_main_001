import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import HeaderArrow from '../UI/molecules/HeaderArrow';
import ApplicantSet from '../UI/molecules/Applicant';
import InputComments from '../UI/molecules/InputComments';
import DetailContentsWriter from '../UI/organisms/DetailContentsWriter';
import WriterComments from '../UI/organisms/WriterComments';
import { client } from '../../client/client';
import userInfoState from '../../recoil/atoms';

const ArounderWriter = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const UserId = useRecoilValue(userInfoState);
  const [contentsData, setContentsData] = useState([]);
  const [proposalsData, setProposalsData] = useState([]);
  const [commentsData, setCommentsData] = useState([]);
  const [loading, setLoading] = useState(false);

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
      `/exercises/${id}/comments?cursorId=0&size=3`,
    );
    setCommentsData(commentsResponse.data.data);
  };

  const updateHandler = () => {
    console.log('update');
  };

  const deleteHandler = async () => {
    await client.delete(`/exercises/${id}`);
    navigate('/main');
  };

  // eslint-disable-next-line no-unused-vars
  const mainReplyDeleteHandler = async () => {
    await client.delete(`/comments/${commentsData.commentId}`);
  };

  // eslint-disable-next-line no-unused-vars
  const nonMainReplyDeleteHandler = async () => {
    await client.delete(`/replies/${commentsData.replies.replyId}`);
  };

  const [writeComments, setWriteComments] = useState('');

  const commentsHandler = e => {
    setWriteComments(e.target.value);
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

  const arrowHandler = () => {
    navigate('/main');
  };

  return (
    <>
      {loading && (
        <div className="flex flex-col justify-center items-center overflow: auto;">
          <HeaderArrow arrowHandler={arrowHandler} txt={'상세 글 보기'} />
          <DetailContentsWriter
            contentsData={contentsData}
            updateHandler={updateHandler}
            deleteHandler={deleteHandler}
            writer={contentsData.host && contentsData.host.memberId}
            img={contentsData && contentsData.images}
          />
          <ApplicantSet
            proposalsData={proposalsData}
            writer={contentsData.host && contentsData.host.memberId}
            userId={UserId}
          />
          <InputComments
            target="댓글을"
            // handler={''} // post 요청 줘야한다
            onChange={commentsHandler}
            value={writeComments}
          />
          <WriterComments
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

export default ArounderWriter;
