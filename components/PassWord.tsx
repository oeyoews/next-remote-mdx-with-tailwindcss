'use client';

import { useEffect, useState } from 'react';
import { FcUnlock } from 'react-icons/fc';

const PassWord = ({ content, originPassword }: any) => {
  const [password, setPassword] = useState('');
  const [showContent, setShowContent] = useState(false);
  const [error, setError] = useState(false);

  const handlePasswordInput = (event: any) => {
    setPassword(event.target.value);
  };

  const handlePasswordSubmit = (e: any) => {
    e.preventDefault();
    // 这里假设预设的密码是"password"
    console.log(password, originPassword);
    if (password === originPassword) {
      setShowContent(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    // 在showContent状态改变时，滚动到顶部
    if (showContent) {
      window.scrollTo(0, 0);
    }
  }, [showContent]);

  return (
    <div>
      {!showContent && (
        <>
          <form
            onSubmit={handlePasswordSubmit}
            className="flex items-center justify-center space-x-2"
          >
            <input
              placeholder=" 请输入密码"
              type="password"
              value={password}
              onChange={handlePasswordInput}
              className="rounded border-none bg-neutral-100 p-1 outline-none transition duration-300 hover:bg-neutral-200"
            />
            <button
              type="submit"
              className="rounded bg-neutral-200 p-2 transition duration-300 hover:bg-neutral-300"
            >
              <FcUnlock className="scale-125" />
            </button>
          </form>
          <div className="flex items-center justify-center space-x-2">
            {error && <p className="font-semibold text-red-600">密码错误</p>}
          </div>
        </>
      )}

      {showContent && content}
    </div>
  );
};

export default PassWord;
