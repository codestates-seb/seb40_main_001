import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import HeaderArrow from '../UI/molecules/HeaderArrow';
import ApplicantSet from '../UI/molecules/Applicant';
import InputComments from '../UI/molecules/InputComments';
import DetailContents from '../UI/organisms/DetailContents';
import ViewerComments from '../UI/organisms/ViewerComments';
import { client } from '../../client/client';

const ArounderViewer = () => {
  const navigate = useNavigate();
  const userId = +localStorage.getItem('memberId');
  const { id } = useParams();
  const [contentsData, setContentsData] = useState([]);
  const [proposalsData, setProposalsData] = useState([]);
  const [commentsData, setCommentsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [writeComments, setWriteComments] = useState('');
  const [replyComments, setReplyComments] = useState('');

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

  // reply input value 저장
  const recommentsHandler = e => {
    setReplyComments(e.target.value);
  };

  // 화살표 클릭 시 main으로 돌아가기
  const arrowHandler = () => {
    navigate('/main');
  };

  // 댓글 삭제 handler
  const mainReplyDeleteHandler = async idx => {
    alert('댓글을 삭제합니다.');
    await client.delete(`/comments/${commentsData[idx].commentId}`).then(() => {
      window.location.reload();
    });
  };

  // 대댓글 삭제 handler
  const nonMainReplyDeleteHandler = async (parentId, idx) => {
    alert('대댓글을 삭제합니다.');
    await client
      .delete(`/replies/${commentsData[parentId].replies[idx].replyId}`)
      .then(() => {
        window.location.reload();
      });
  };

  // 댓글 달기
  const writeMainReplies = () => {
    if (writeComments === '') {
      alert('내용을 입력해주세요.');
      return;
    }
    const body = {
      content: writeComments,
    };
    client.post(`/exercises/${id}/comments`, body).then(() => {
      alert('댓글이 등록되었습니다.');
      window.location.reload();
      setWriteComments('');
    });
  };

  // 대댓글 달기
  // eslint-disable-next-line no-unused-vars
  const writeSubReplies = idx => {
    if (replyComments === '') {
      alert('내용을 입력해주세요.');
      return;
    }
    const body = {
      content: replyComments,
    };
    client
      .post(`/comments/${commentsData[idx].commentId}/replies`, body)
      .then(() => {
        alert('댓글이 등록되었습니다.');
        window.location.reload();
        setReplyComments('');
      });
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
        <div className="flex flex-col justify-center items-center overflow:auto mb-[5rem]">
          <HeaderArrow arrowHandler={arrowHandler} txt={'상세 글 보기'} />
          <DetailContents
            contentsData={contentsData}
            img={contentsData && contentsData.images}
          />
          <ApplicantSet
            proposalsData={proposalsData}
            writer={contentsData.host && contentsData.host.memberId}
            userId={userId}
            contentsData={contentsData}
          />
          <InputComments
            target="댓글을"
            handler={writeMainReplies} // post 요청 줘야한다
            onChange={commentsHandler}
            value={writeComments}
          />
          <ViewerComments
            target="답글을"
            writer={contentsData.host && contentsData.host.memberId}
            userId={userId}
            commentsData={commentsData}
            mainReplyDeleteHandler={mainReplyDeleteHandler}
            nonMainReplyDeleteHandler={nonMainReplyDeleteHandler}
            handler={writeSubReplies}
            onChange={recommentsHandler}
            value={replyComments}
          />
        </div>
      )}
    </>
  );
};

export default ArounderViewer;
