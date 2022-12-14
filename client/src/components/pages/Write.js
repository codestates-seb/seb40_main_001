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
    if (imgList.length === 3) {
      alert(
        '이미지는 최대 3개까지 첨부 가능합니다. 이미지 리스트가 리셋됩니다.',
      );
      setImgList([]);
      return;
    }
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

    const isFast = new Date(data.startTime) < new Date();
    const isEnd = new Date(data.endTime) < new Date(data.startTime);
    if (isFast) {
      alert('운동 시작 시간이 현재 시간보다 빠릅니다.');
      setImgList([]);
      return;
    }
    if (isEnd) {
      alert('종료 시작이 시작 시간보다 빠릅니다.');
      setImgList([]);
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
          if (e.response) {
            if (e.response.data.status === 422) {
              if (
                e.response.data.message ===
                'Start time is earlier than current time'
              ) {
                alert('시작 시간이 현재 시간보다 빠릅니다.');
                setImgList([]);
              } else if (
                e.response.data.message === 'Start time is later than end time'
              ) {
                alert('종료 시작이 시작 시간보다 빠릅니다.');
                setImgList([]);
              } else {
                alert(e.response.data.message);
                setImgList([]);
              }
            }
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
          if (e.response) {
            if (e.response.data.status === 422) {
              if (
                e.response.data.message ===
                'Start time is earlier than current time'
              ) {
                alert('시작 시간이 현재 시간보다 빠릅니다.');
                setImgList([]);
              } else if (
                e.response.data.message === 'Start time is later than end time'
              ) {
                alert('종료 시작이 시작 시간보다 빠릅니다.');
                setImgList([]);
              } else {
                alert(e.response.data.message);
                setImgList([]);
              }
            }
          }
        });
    }
    // 제출
  };

  const submitPatch = () => {
    if (!data.exercise || !data.title || !data.content || !data.gender) {
      return;
    }

    const isFast = new Date(data.startTime) < new Date();
    const isEnd = new Date(data.endTime) < new Date(data.startTime);
    if (isFast) {
      alert('운동 시작 시간이 현재 시간보다 빠릅니다.');
      setImgList([]);
      return;
    }
    if (isEnd) {
      alert('종료 시작이 시작 시간보다 빠릅니다.');
      setImgList([]);
      return;
    }

    const newImgArr = imgList.filter(el => el.name);
    const originImgArr = imgList.filter(el => el.originImgArr);
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
          if (e.response) {
            if (e.response.data.status === 422) {
              if (
                e.response.data.message ===
                'Start time is earlier than current time'
              ) {
                alert('시작 시간이 현재 시간보다 빠릅니다.');
                setImgList([]);
              } else if (
                e.response.data.message === 'Start time is later than end time'
              ) {
                alert('종료 시작이 시작 시간보다 빠릅니다.');
                setImgList([]);
              } else {
                alert(e.response.data.message);
                setImgList([]);
              }
            }
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
          if (e.response) {
            if (e.response.data.status === 422) {
              if (
                e.response.data.message ===
                'Start time is earlier than current time'
              ) {
                alert('시작 시간이 현재 시간보다 빠릅니다.');
              } else if (
                e.response.data.message === 'Start time is later than end time'
              ) {
                alert('종료 시작이 시작 시간보다 빠릅니다.');
              }
            }
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
      <WriteContents
        data={data}
        dataHandler={dataHandler}
        fileHandler={fileHandler}
        handleDelete={handleDelete}
        img={imgList}
      />
      <div
        className="flex w-full h-[30px] justify-center"
        onClick={() => {
          if (isRewrite) {
            submitPatch();
          } else {
            submitWrite(imgList.length > 0);
          }
        }}
      >
        <LongBtn txt="글쓰기" disabled={isDisable} />
      </div>
    </div>
  );
};

export default Write;
