'use client'

import { FcUnlock } from 'react-icons/fc'
import { useState, useEffect } from "react";

const PassWord = ({ content, originPassword }: any) => {
	const [password, setPassword] = useState("");
	const [showContent, setShowContent] = useState(false);
	const [error, setError] = useState(false);

	const handlePasswordInput = (event: any) => {
		setPassword(event.target.value);
	};

	const handlePasswordSubmit = (e: any) => {
		e.preventDefault();
		// 这里假设预设的密码是"password"
		console.log(password, originPassword)
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
				<div className="text-center">
					<form onSubmit={handlePasswordSubmit}>
						<input
							placeholder=' 请输入密码查看'
							type="password"
							value={password}
							onChange={handlePasswordInput}
							className="p-1 rounded bg-neutral-100 hover:bg-neutral-200 border-none outline-none transition duration-300"
						/>
						<button type="submit" className="p-2 bg-neutral-200 ml-1 rounded hover:bg-neutral-300 transition duration-300"><FcUnlock className='scale-125' /></button>
						{error && <p className="text-red-400">密码错误，请重新输入。</p>}
					</form>
				</div>
			)}

			{showContent && content}
		</div>
	);
};

export default PassWord;