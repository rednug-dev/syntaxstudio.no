import type {Metadata} from 'next';
import Header from '@/components/header';
import Footer from '@/components/footer';
import {Link} from '@/i18n/navigation';

export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{
 const {locale}=await params;
 return {title:'Syntax × Tokyo',robots:{index:false,follow:true},alternates:{canonical:locale==='no'?'/work/tokyo':'/en/work/tokyo'}};
}
export default async function Tokyo({params}:{params:Promise<{locale:string}>}){
 const {locale}=await params, no=locale==='no';
 return <div className="house-page"><Header/><main id="main-content" className="house-wrap house-holding"><h1>Syntax × Tokyo</h1><p>{no?'Film og fotografi fra Tokyo. Vi setter sammen historien.':'Film and photography from Tokyo. We are putting the story together.'}</p><Link className="house-text-link" href="/work">{no?'Se utvalgt arbeid':'View selected work'}</Link></main><Footer/></div>;
}
