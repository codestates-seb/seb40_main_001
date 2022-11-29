import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LongBtn, HeaderArrow, WriteContents } from '../UI';
import { client, clientImg } from '../../client/client';

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
  const [imgList, setImgList] = useState([]);
  const [disableObj, setDisableObj] = useState({
    exercise: true,
    title: true,
    content: true,
    gender: true,
  });
  const [isDisable, setIsDisable] = useState(true);

  const navigate = useNavigate();

  const fileHandler = e => {
    if (imgList.length > 3) return;
    setImgList(prev => [...prev, e.target.files[0]]);
  };

  const dataHandler = (target, change) => {
    setData(prev => {
      const newData = prev;
      newData[target] = change;
      return newData;
    });
    setDisableObj(prev => {
      const newData = prev;
      newData[target] = change.length <= 0;
      return newData;
    });

    const val = Object.values(disableObj);
    const res = val.filter(el => el === true).length;
    setIsDisable(res > 0);
  };

  const handleDelete = idx => {
    const newArr = imgList.filter((el, id) => id !== idx);
    setImgList(newArr);
  };

  const submitWrite = () => {
    if (!data.exercise || !data.title || !data.content || !data.gender) {
      return;
    }

    // 이미지 생성
    const imgUp = new FormData();
    imgList.forEach(el => {
      imgUp.append('image', el, el.name);
    });

    // 이미지 서버로 전송
    clientImg
      .post('/images', imgUp)
      .then(res => {
        const newData = data;
        res.data.forEach(el => {
          newData.img.push(el.imageId);
        });
        setData(newData);
        return {
          title: data.title,
          content: data.content,
          genderType: data.gender === '무관' ? 'ALL' : 'SAME',
          category: data.exercise,
          exerciseAt: data.startTime,
          endAt: data.endTime,
          imageIdList: data.img,
        };
      })
      .then(payload => {
        client
          .post('/exercises', payload)
          .then(() => {
            navigate('/main');
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
      });

    // 제출
  };

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
        <LongBtn txt="글쓰기" onClick={submitWrite} disabled={isDisable} />
      </div>
    </div>
  );
};

export default Write;
