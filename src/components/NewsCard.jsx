import { Link } from 'react-router-dom';

export default function NewsCard({ news }) {
	return (
		<div className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-200 mx-5 mb-10">
			<img className="w-full opacity-95" src={news.main_image} alt={news.title} />
			<div className="px-6 py-4">
				<div className="font-bold text-xl text-center mb-2">
					<Link to={`/news/${news.id}`}>{news.title}</Link>
				</div>
				<p className="text-black text-base text-1xl">{news.short_description}</p>
			</div>
		</div>
	);
}
