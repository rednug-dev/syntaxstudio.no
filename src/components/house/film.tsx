'use client';
import {useEffect, useRef, useState} from 'react';
import Image from 'next/image';
import {Play} from 'lucide-react';
export default function Film({src,poster,label,className=''}:{src:string;poster:string;label:string;className?:string}) {
  const [active,setActive] = useState(false), [failed,setFailed] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  useEffect(()=>{
    if (!active || !video.current) return;
    const element = video.current;
    element.focus({preventScroll:true});
    const observer = new IntersectionObserver(entries=>{if(!entries[0].isIntersecting)element.pause();},{threshold:0.05});
    observer.observe(element);
    const pause = ()=>{if(document.hidden)element.pause();};
    document.addEventListener('visibilitychange',pause);
    return ()=>{observer.disconnect();document.removeEventListener('visibilitychange',pause);};
  },[active]);
  return <div className={`house-film ${className}`}>
    {!active?<><Image src={poster} alt="" fill sizes="(max-width: 700px) 100vw, 70vw"/><button type="button" className="house-film-play" onClick={()=>setActive(true)} aria-label={label}><span><Play fill="currentColor" size={22} aria-hidden="true"/></span><span>{label}</span></button></>:<video ref={video} src={src} poster={poster} controls playsInline autoPlay preload="metadata" tabIndex={0} aria-label={label} onError={()=>setFailed(true)} />}
    {failed&&<p className="house-film-error" role="status"><a href={src}>{label} · MP4</a></p>}
  </div>;
}
