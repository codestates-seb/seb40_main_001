import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import HeaderArrow from '../UI/molecules/HeaderArrow';
import ApplicantSet from '../UI/molecules/Applicant';
import InputComments from '../UI/molecules/InputComments';
import DetailContentsWriter from '../UI/organisms/DetailContentsWriter';
import WriterComments from '../UI/organisms/WriterComments';
import { client } from '../../client/client';
import userInfoState from '../../recoil/atoms';

const img = [
  {
    remotePath:
      'https://www.sisajunior.com/img/play/dica/chat/%EB%B3%B4%EB%85%B8%EB%B3%B4%EB%85%B84.jpg',
  },
  {
    remotePath:
      'https://w.namu.la/s/fbe29c52a03345a112f33d89632e39735b30e9cd3d85346db314841d27e13f5148542ea262ae9fcd04c1a5c86c1a07586e381983ef8c4ce600ea9378fe4066a20cc0cc852ead850742da5a7bdbc4d2b106793134d34f08ab8703103c226b4947',
  },
  {
    remotePath: 'https://t1.daumcdn.net/cfile/tistory/997E5C3C5BA1E68137',
  },
];

const ArounderWriter = () => {
  const { id } = useParams();
  const UserId = useRecoilValue(userInfoState);
  const [contentsData, setContentsData] = useState([]);
  const [proposalsData, setProposalsData] = useState([]);
  const [commentsData, setCommentsData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getContentsData = async () => {
    const contentsResponse = await client.get(`/exercises/${id}`);
    setContentsData(contentsResponse.data);
  };

  const getProposalsData = async () => {
    const proposalsResponse = await client.get(`/exercises/${id}/proposals`);
    setProposalsData(proposalsResponse.data.data);
  };

  const getCommentsData = async () => {
    const commentsResponse = await client.get(
      `/exercises/${id}/comments?cursorId=0&size=3`,
    );
    setCommentsData(commentsResponse.data.data);
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

  const updateHandler = () => {
    console.log('update');
  };

  const deleteHandler = () => {
    console.log('delete');
  };

  console.log(UserId);

  return (
    <>
      {loading && (
        <div className="flex flex-col justify-center items-center overflow: auto;">
          <HeaderArrow txt={'상세 글 보기'} />
          <DetailContentsWriter
            contentsData={contentsData}
            updateHandler={updateHandler}
            deleteHandler={deleteHandler}
            writer={contentsData.host && contentsData.host.memberId}
            img={img}
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
          />
        </div>
      )}
    </>
  );
};

export default ArounderWriter;
