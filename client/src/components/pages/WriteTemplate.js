import React from 'react';
import { LongBtn, HeaderArrow, WriteContents } from '../UI';

const WriteTemplate = () => {
  return (
    <div>
      <HeaderArrow txt="글쓰기" />
      {/* 아래 컴포넌트에 handler 필요 */}
      <WriteContents />
      <div className="flex justify-center">
        {/* 추후 disabled 추가 필요 */}
        <LongBtn txt="글쓰기" />
      </div>
    </div>
  );
};

export default WriteTemplate;
