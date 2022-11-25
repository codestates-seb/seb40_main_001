import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/pages/Landing';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Main from './components/pages/Main';
import ArounderViewer from './components/pages/ArounderViewer';
import ArounderWriter from './components/pages/ArounderWriter';
import WriteTemplate from './components/pages/WriteTemplate';
import MypageTemplate from './components/pages/MypageTemplate';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/main" element={<Main />}></Route>
          <Route path="/arounderv/:id" element={<ArounderViewer />}></Route>
          <Route path="/arounderw/:id" element={<ArounderWriter />}></Route>
          <Route path="/write" element={<WriteTemplate />}></Route>
          <Route path="/mypage" element={<MypageTemplate />}></Route>
          {/* <Route path='*' element={} */}
          {/* 없는 URl 로 접속 시 에러 띄울 창이 필요할 지 ? */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
