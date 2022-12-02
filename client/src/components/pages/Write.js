import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
  const [postId, setPostId] = useState(0);
  const [isRewrite, setIsRewrite] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const arrowHandler = () => {
    navigate('/main');
  };

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
    if (isRewrite) setIsDisable(false);
  };

  const handleDelete = idx => {
    const newArr = imgList.filter((el, id) => id !== idx);
    setImgList(newArr);
  };

  const submitWrite = img => {
    if (!data.exercise || !data.title || !data.content || !data.gender) {
      return;
    }
    if (img) {
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
          client.post('/exercises', payload).then(() => {
            navigate('/main');
          });
        })
        .catch(e => {
          if (e.response.data.status === 422) {
            alert(e.response.data.message);
          }
        });
    } else {
      const payload = {
        title: data.title,
        content: data.content,
        genderType: data.gender === '무관' ? 'ALL' : 'SAME',
        category: data.exercise,
        exerciseAt: data.startTime,
        endAt: data.endTime,
      };
      client
        .post('/exercises', payload)
        .then(() => {
          navigate('/main');
        })
        .catch(e => {
          if (e.response.data.status === 422) {
            alert(e.response.data.message);
          }
        });
    }
    // 제출
  };

  const submitPatch = () => {
    if (!data.exercise || !data.title || !data.content || !data.gender) {
      return;
    }
    const newImgArr = imgList.filter(el => el.name);
    const originImgArr = imgList.fil;
    if (newImgArr.length > 0) {
      // 이미지 생성
      const newImg = new FormData();
      newImgArr.forEach(el => {
        if (el.name) {
          newImg.append('image', el, el.name);
        }
      });
      // 이미지 서버로 전송
      clientImg
        .post('/images', newImg)
        .then(res => {
          const newData = data;
          originImgArr.forEach(el => {
            if (el.imageId) {
              newData.img.push(el.imageId);
            }
          });
          res.data.forEach(el => {
            if (el.imageId) {
              newData.img.push(el.imageId);
            }
          });
          newData.img = newData.img.filter(el => el);
          setData(newData);
          if (data.img.length > 0) {
            return {
              title: data.title,
              content: data.content,
              genderType: data.gender === '무관' ? 'ALL' : 'SAME',
              category: data.exercise,
              exerciseAt: data.startTime,
              endAt: data.endTime,
              imageIdList: data.img,
            };
          }
          return {
            title: data.title,
            content: data.content,
            genderType: data.gender === '무관' ? 'ALL' : 'SAME',
            category: data.exercise,
            exerciseAt: data.startTime,
            endAt: data.endTime,
          };
        })
        .then(payload => {
          client.patch(`/exercises/${postId}`, payload).then(() => {
            navigate('/main');
          });
        })
        .catch(e => {
          if (e.response.data.status === 422) {
            alert(e.response.data.message);
          }
        });
    } else {
      const newData = data;
      newData.img = newData.img.filter(el => el);
      setData(newData);

      const payload = {
        title: data.title,
        content: data.content,
        genderType: data.gender === '무관' ? 'ALL' : 'SAME',
        category: data.exercise,
        exerciseAt: data.startTime,
        endAt: data.endTime,
        imageIdList: data.img,
      };
      client
        .patch(`/exercises/${postId}`, payload)
        .then(() => {
          navigate('/main');
        })
        .catch(e => {
          if (e.response.data.status === 422) {
            alert(e.response.data.message);
          }
        });
    }
    // 제출
  };

  useEffect(() => {
    if (location.state) {
      setIsRewrite(true);
      setIsDisable(false);
      const before = location.state.data[0];
      console.log(before.images);
      setData({
        exercise: before.category,
        title: before.title,
        content: before.content,
        gender: before.genderType,
        img: before.images.map(el => el.imgageId),
        startTime: before.exerciseAt,
        endTime: before.endAt,
      });
      setImgList(before.images);
      setPostId(location.state.data[1]);
    }
  }, [location]);

  return (
    <div>
      <HeaderArrow txt="글쓰기" arrowHandler={arrowHandler} />
      {/* 아래 컴포넌트에 handler 필요 */}
      <WriteContents
        data={data}
        dataHandler={dataHandler}
        fileHandler={fileHandler}
        handleDelete={handleDelete}
        img={imgList}
      />
      <div className="flex w-full h-[30px] justify-center">
        <LongBtn
          txt="글쓰기"
          hasImg={imgList.length > 0}
          onClick={isRewrite ? submitPatch : submitWrite}
          disabled={isDisable}
        />
      </div>
    </div>
  );
};

export default Write;
