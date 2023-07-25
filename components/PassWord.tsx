'use client';

import { useEffect, useState } from 'react';
import { FcUnlock } from 'react-icons/fc';

const PassWord = ({ title, content, originPassword }: any) => {
  const [password, setPassword] = useState('');
  const [showContent, setShowContent] = useState(false);
  const [error, setError] = useState(false);

  const handlePasswordInput = (event: any) => {
    setPassword(event.target.value);
  };

  const handlePasswordSubmit = (e: any) => {
    e.preventDefault();
    if (password === originPassword) {
      // 获取已存储的密码对象
      const storedPasswords = JSON.parse(
        localStorage.getItem('PostPasswords') || '{}',
      );
      // 更新或添加postname对应的密码
      storedPasswords[title] = { password };
      // 存储更新后的密码对象
      localStorage.setItem('PostPasswords', JSON.stringify(storedPasswords));
      setShowContent(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  const checkPassword = () => {
    const storedPasswords = JSON.parse(
      localStorage.getItem('PostPasswords') || '{}',
    );
    const storedPassword = storedPasswords[title]?.password;
    return storedPassword === originPassword;
  };

  useEffect(() => {
    const isPasswordSaved = checkPassword();
    if (isPasswordSaved) {
      setShowContent(true);
    }
  }, []);

  // useEffect(() => {
  //   // 在showContent状态改变时，滚动到顶部
  //   if (showContent) {
  //     window.scrollTo(0, 0);
  //   }
  // }, [showContent]);

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
