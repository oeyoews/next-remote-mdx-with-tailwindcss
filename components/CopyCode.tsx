'use client'
import { useState, useEffect, useRef, cloneElement } from "react";
import type { RefObject, DetailedHTMLProps, HTMLAttributes, ReactElement } from "react";
import { HiOutlineClipboardList, HiOutlineClipboardCheck } from 'react-icons/hi'


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
		<div className="relative">
			<button onClick={onClick} className="bg-black p-2 rounded absolute top-0 right-0">
				{text}
			</button>
		</div>
	);
};

const Pre = (props: DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement>) => {
	const codeRef = useRef<HTMLElement>(null);

	return (
		<pre {...props}>
			<CopyToClipboardButton ctx={codeRef} />
			{cloneElement(props.children as ReactElement, { ref: codeRef })}
		</pre>
	);
};

export default Pre