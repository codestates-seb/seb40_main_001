import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HeaderArrow from '../UI/molecules/HeaderArrow';
import ApplicantSet from '../UI/molecules/Applicant';
import InputComments from '../UI/molecules/InputComments';
import DetailContentsWriter from '../UI/organisms/DetailContentsWriter';
import WriterComments from '../UI/organisms/WriterComments';
import { client } from '../../client/client';

const ArounderWriter = ({ writer, userId }) => {
  const { id } = useParams();
  // eslint-disable-next-line no-unused-vars
  const [contentsData, setContentsData] = useState([]);

  const getContentsData = async () => {
    const response = await client.get(`/exercises/${id}`);
    setContentsData(response.data);
    console.log(contentsData.host.image);
  };

  const img = [
    {
      src: 'https://www.sisajunior.com/img/play/dica/chat/%EB%B3%B4%EB%85%B8%EB%B3%B4%EB%85%B84.jpg',
    },
    {
      src: 'https://w.namu.la/s/fbe29c52a03345a112f33d89632e39735b30e9cd3d85346db314841d27e13f5148542ea262ae9fcd04c1a5c86c1a07586e381983ef8c4ce600ea9378fe4066a20cc0cc852ead850742da5a7bdbc4d2b106793134d34f08ab8703103c226b4947',
    },
    {
      src: 'https://t1.daumcdn.net/cfile/tistory/997E5C3C5BA1E68137',
    },
  ];

  const dummyData = [
    {
      id: 0,
      target:
        'https://img1.daumcdn.net/thumb/C500x500/?fname=http://t1.daumcdn.net/brunch/service/user/4jyM/image/ApCGVgNo3Rh-6DT433umzzxSg9o.jpg',
      nickname: '앤디',
    },
    {
      id: 1,
      title: '같이 농구 하실분?!!',
      target:
        'https://i.pinimg.com/474x/49/ec/a8/49eca86ab8fb9e496d5789f871559ab2.jpg',
      nickname: '헬리',
      createDate: '2022.11.18',
      endDate: '2022.11.19',
      content: `일요일 오후 4시부터 서울숲에서 같이 해요!
      댓글에 연락수단 말씀해주시면 대댓글로 남겨드릴게요!
      참고로 농구 초보입니다 >< !`,
    },
    {
      id: 2,
      target: 'https://pbs.twimg.com/media/EdTEFR8UwAInwNl.png',
      nickname: '루모스루모스루모스루모스루모스루모스',
    },
    {
      id: 3,
      target: 'https://pbs.twimg.com/media/FACQ9-hUcAcA_11.jpg',
      nickname: '큐원',
    },
    {
      id: 4,
      target:
        'https://w.namu.la/s/9071d0575b6d14c0d6fc5832e26fe8ef0a298a1abb1d442cc3c865534ec5e949e8a2d195fe425ebb15f2f1f5b270e6b86979bd1e3fcb4e9d9432bdfbf4fb02a69870a8a0d4fb299d4636c753d0b63f3b91a57816434dd21697483bf942d5d549',
      nickname: '가형',
    },
    {
      id: 5,
      target:
        'https://t1.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/4arX/image/TrbRquy4TZ1rvMVYBYaIXp0cTxo.jpg',
      nickname: '유정',
    },
  ];

  const updateHandler = () => {
    console.log('update');
  };

  const deleteHandler = () => {
    console.log('delete');
  };

  useEffect(() => {
    getContentsData();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center overflow: auto;">
      <HeaderArrow txt={'상세 글 보기'} />
      <DetailContentsWriter
        contentsData={contentsData}
        updateHandler={updateHandler}
        deleteHandler={deleteHandler}
        writer={writer}
        img={img}
      />
      <ApplicantSet dummyData={dummyData} writer={writer} />
      <InputComments target="댓글을" />
      <WriterComments target="답글을" userId={userId} writer={writer} />
    </div>
  );
};

export default ArounderWriter;
