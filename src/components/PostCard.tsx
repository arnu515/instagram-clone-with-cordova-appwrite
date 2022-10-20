import { FC } from 'react';
import { Models } from 'appwrite';
import { useNavigate } from 'react-router-dom';
import { IUser } from '@lib/util/getUser';

interface Props {
	post: Models.Document & {
		title: string;
		content: string;
		mediaUrl?: string;
		mediaType: 'image' | 'video' | 'none';
		author: IUser;
	};
}

const PostCard: FC<Props> = ({ post }) => {
	const navigate = useNavigate();

	return (
		<article
			className="cursor-pointer rounded-lg border border-gray-500 bg-white hover:bg-gray-100 hover:shadow"
			onClick={() => {
				navigate('/post/' + post.$id);
			}}
		>
			{post.mediaType !== 'none' && post.mediaUrl && (
				<header className="max-h-64 w-full overflow-hidden border-b border-gray-500">
					{post.mediaType === 'image' && (
						<img
							src={post.mediaUrl}
							alt={post.title}
							className="h-full w-full border border-transparent"
							style={{ borderTopLeftRadius: '0.5rem', borderTopRightRadius: '0.5rem' }}
						/>
					)}
					{post.mediaType === 'video' && <video src={post.mediaUrl} controls loop />}
				</header>
			)}
			<section className="my-2 flex items-center justify-between px-2 text-sm">
				{post.author && (
					<span className="flex items-center gap-2 font-medium text-gray-500">
						{post.author.avatar && (
							<img
								src={post.author.avatar.toString()}
								alt={`${post.author.name}'s avatar`}
								className="h-6 w-6 rounded-full border border-gray-500"
							/>
						)}
						<span>{post.author.name}</span>
					</span>
				)}
				<span className="rounded px-2 py-1 uppercase text-gray-600">
					{Intl.DateTimeFormat('en-US', {}).format(new Date(post.$createdAt))}
				</span>
			</section>
			<section className="px-4 py-2">
				<h3 className="text-xl font-medium md:text-2xl">{post.title}</h3>
				<p className="text-lg md:text-xl">
					{post.content.length > 128
						? post.content.substring(0, 100) + '...'
						: post.content}
				</p>
			</section>
		</article>
	);
};

export default PostCard;
