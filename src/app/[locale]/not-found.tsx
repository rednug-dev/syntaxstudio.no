import {getLocale} from 'next-intl/server';
import Header from '@/components/header';
import Footer from '@/components/footer';
import {Link} from '@/i18n/navigation';

export default async function NotFound(){
 const no=(await getLocale())==='no';
 return <div className="house-page"><Header/><main className="house-wrap house-holding" id="main-content"><h1>{no?'Her mangler det noe.':'Something is missing.'}</h1><p>{no?'Vi finner ikke denne siden. Arbeidet vårt er et godt sted å fortsette.':'We can’t find this page. Our work is a good place to continue.'}</p><Link className="house-text-link" href="/work">{no?'Se utvalgt arbeid':'View selected work'}</Link></main><Footer/></div>;
}
