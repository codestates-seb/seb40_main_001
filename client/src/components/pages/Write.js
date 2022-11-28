import React, { useState, useEffect } from 'react';
import { LongBtn, HeaderArrow, WriteContents } from '../UI';
import { clientImg } from '../../client/client';

const Write = () => {
  const [data, setData] = useState({
    exercise: '',
    title: '',
    content: '',
    gender: '',
    img: [],
    startTime: new Date(),
    endTime: new Date(),
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const [imgForm, setImgForm] = useState();
  const [imgList, setImgList] = useState([]);

  const fileHandler = e => {
    if (imgList.length > 3) return;
    const imgUp = new FormData();
    imgUp.append(`image`, e.target.files[0], e.target.files[0].name);
    setImgForm(imgUp);
    setImgList(prev => [...prev, e.target.files[0]]);
  };

  const dataHandler = (target, change) => {
    const newData = data;
    newData[target] = change;
    setData(newData);
  };

  const handleDelete = idx => {
    const newArr = imgList.filter((el, id) => id !== idx);
    setImgList(newArr);
    imgForm.delete(`image${idx}`);
  };

  const submitWrite = () => {
    // 이미지 생성
    clientImg
      .post('/images', imgForm)
      .then(res => {
        const newData = data;
        newData.img.push(res.imageId);
        setData(newData);
      })
      .catch(err => {
        console.log(err);
      });
    // 제출
    // const payload = {
    //   title: data.title,
    //   content: data.content,
    //   genderType: data.gender === '무관' ? 'ALL' : 'SAME',
    //   category: data.exercise,
    //   exerciseAt: data.startTime,
    //   endAt: data.endTime,
    //   imageIdList: data.img,
    // };

    // client
    //   .post('/exercises', payload)
    //   .then(() => {
    //     //
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  };

  // 여기가 동작을 안 해서 사람을 미치게 하는 중 ㅠㅠ
  // dep가 의미가 없는 상태... data로 넣어도 key로 넣어도 문제
  useEffect(() => {
    console.log(data);
    console.log('-----------------');
    if (data.exercise && data.title && data.content && data.gender) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [data.exercise, data.title, data.content, data.gender]);

  // localStorage 임시
  useEffect(() => {
    localStorage.setItem(
      'accessToken',
      'Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlcyI6WyJVU0VSIl0sImVtYWlsIjoidGVzdEB0ZS5zdCIsIm1lbWJlcklkIjoxLCJzdWIiOiJ0ZXN0QHRlLnN0IiwiaWF0IjoxNjY5NjE3MjY1LCJleHAiOjE2Njk2MzE2NjV9.4jCQTTCh06yyh_btH5TeDGqhK36cFiyPdywHSY6x7e9E_VFjcszUVVpDqIBfJqppJalIvRFa0GTd_8N1o1DAWg',
    );
  }, []);

  return (
    <div>
      <HeaderArrow txt="글쓰기" />
      {/* 아래 컴포넌트에 handler 필요 */}
      <WriteContents
        dataHandler={dataHandler}
        fileHandler={fileHandler}
        handleDelete={handleDelete}
        img={imgList}
      />
      <div className="flex w-full h-[30px] justify-center">
        <LongBtn txt="글쓰기" onClick={submitWrite} disabled={isDisabled} />
      </div>
    </div>
  );
};

export default Write;
