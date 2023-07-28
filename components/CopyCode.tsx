'use client';

import { cloneElement, useEffect, useRef, useState } from 'react';
import type {
  DetailedHTMLProps,
  HTMLAttributes,
  ReactElement,
  RefObject,
} from 'react';
import { BsTextCenter, BsTextWrap } from 'react-icons/bs';
import {
  HiOutlineClipboardCheck,
  HiOutlineClipboardList,
} from 'react-icons/hi';

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
    await navigator.clipboard.writeText(
      ctx.current?.textContent ?? 'Failed to copy',
    );
    setClick(true);
  }

  //  aria-label={text}
  const text = clicked ? (
    <HiOutlineClipboardCheck />
  ) : (
    <HiOutlineClipboardList />
  );
  return (
    <button
      onClick={onClick}
      className={`absolute right-2 top-2 scale-110 rounded bg-black p-2 transition duration-300`}
    >
      {text}
    </button>
  );
};

const Pre = (
  props: DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement>,
) => {
  const codeRef = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [wrapCode, setWrapCode] = useState(false);

  const WrapCodeButton = () => {
    function toggleWrapCode() {
      setWrapCode(!wrapCode);
    }
    // clicked
    return (
      <button
        onClick={toggleWrapCode}
        className="absolute right-12 top-2 rounded bg-black p-2"
      >
        {wrapCode ? <BsTextCenter /> : <BsTextWrap />}
      </button>
    );
  };

  return (
    // if this z-index less zero, this hover not worked
    // 这可能是因为当z-index的值为负数时，元素会被认为是堆叠顺序中的底部元素，导致鼠标事件无法正确触发。
    <div className="relative ">
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
