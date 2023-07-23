'use client'
import { useState, useEffect, useRef, cloneElement } from "react";
import type { RefObject, DetailedHTMLProps, HTMLAttributes, ReactElement } from "react";
import { HiOutlineClipboardList, HiOutlineClipboardCheck } from 'react-icons/hi'
import { BsTextWrap, BsTextCenter } from 'react-icons/bs'


// TODO add wrap button, add transition
const CopyToClipboardButton = ({ ctx }: { ctx: RefObject<HTMLElement> }) => {

	const [clicked, setClick] = useState(false);
	useEffect(() => {
		const timer = setTimeout(() => {
			setClick(false);
		}, 3000);
		return () => clearTimeout(timer);
	}, [clicked, setClick]);

	async function onClick() {
		// TODO: account for potential errors?
		await navigator.clipboard.writeText(ctx.current?.textContent ?? "Failed to copy");
		setClick(true);
	}

	//  aria-label={text}
	const text = clicked ? <HiOutlineClipboardCheck /> : <HiOutlineClipboardList />;
	return (
		<button
			onClick={onClick}
			className={`p-2 rounded absolute top-2 right-2 bg-black scale-110 transition duration-300`}>
			{text}
		</button>
	);
};


const Pre = (props: DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement>) => {
	const codeRef = useRef<HTMLElement>(null);
	const [isHovered, setIsHovered] = useState(false);
	const [wrapCode, setWrapCode] = useState(false);

	const WrapCodeButton = () => {
		function toggleWrapCode() {
			setWrapCode(!wrapCode);
		}
		// clicked
		return (
			<button onClick={toggleWrapCode} className="bg-black p-2 rounded absolute top-2 right-12">
				{wrapCode ? <BsTextCenter /> : <BsTextWrap />}
			</button>
		)
	}


	return (
		<div className="relative">
			<pre
				className={`overflow-hidden ${wrapCode ? 'whitespace-pre-wrap' : ''}`}
				{...props}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				{isHovered && <WrapCodeButton />}
				{isHovered && <CopyToClipboardButton ctx={codeRef} />}
				{cloneElement(props.children as ReactElement, { ref: codeRef })}
			</pre>
		</div>
	);
};

export default Pre;