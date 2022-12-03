import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import HeaderArrow from '../UI/molecules/HeaderArrow';
import ApplicantSet from '../UI/molecules/Applicant';
import InputComments from '../UI/molecules/InputComments';
import DetailContentsWriter from '../UI/organisms/DetailContentsWriter';
import WriterComments from '../UI/organisms/WriterComments';
import { client } from '../../client/client';

const ArounderWriter = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [contentsData, setContentsData] = useState([]);
  const [proposalsData, setProposalsData] = useState([]);
  const [commentsData, setCommentsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [writeComments, setWriteComments] = useState('');
  const userId = +localStorage.getItem('memberId');

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

  // 게시글 수정하기
  const updateHandler = () => {
    if (contentsData.exerciseStatus === 'ACTIVE') {
      navigate('/write', {
        state: {
          data: [contentsData, id],
        },
      });
    } else {
      alert('모집이 종료된 운동입니다.');
    }
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
  const writeSubReplies = idx => {
    if (writeComments === '') {
      alert('내용을 입력해주세요.');
      return;
    }
    const body = {
      content: writeComments,
    };
    client
      .post(`/comments/${commentsData[idx].commentId}/replies`, body)
      .then(() => {
        alert('댓글이 등록되었습니다.');
        window.location.reload();
        setWriteComments('');
      });
  };

  // 게시글 삭제하기
  const deleteHandler = async () => {
    await client.delete(`/exercises/${id}`);
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
        <div className="flex flex-col justify-center items-center overflow:auto mb-[5rem]">
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
            userId={userId}
            contentsData={contentsData}
          />
          <InputComments
            target="댓글을"
            handler={writeMainReplies} // post 요청 줘야한다
            onChange={commentsHandler}
            value={writeComments}
          />
          <WriterComments
            target="답글을"
            writer={contentsData.host && contentsData.host.memberId}
            userId={userId}
            commentsData={commentsData}
            mainReplyDeleteHandler={mainReplyDeleteHandler}
            nonMainReplyDeleteHandler={nonMainReplyDeleteHandler}
            handler={writeSubReplies}
            onChange={commentsHandler}
            Value={writeComments}
          />
        </div>
      )}
    </>
  );
};

export default ArounderWriter;
