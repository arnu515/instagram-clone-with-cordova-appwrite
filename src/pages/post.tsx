import { FC, useEffect } from 'react';
import { LoaderFunction, RouteObject, useLoaderData } from 'react-router-dom';
import appwrite from '@lib/appwrite';
import getUser from '@lib/util/getUser';

const loader: LoaderFunction = async ({ params }) => {
	const post = await appwrite.db.getDocument('instantgram', 'posts', params.id!);
	const author = await getUser(post.userId);

	return { ...post, author };
};

const Post: FC = () => {
	const post = useLoaderData() as any;

	useEffect(() => console.log(post), [post]);

	return (
		<div className="min-h-[100vh] bg-gray-100">
			<main className="mx-auto flex w-[70%] min-w-[100px] max-w-[800px] pb-8 pt-16 md:gap-4 md:pt-24 lg:pt-36">
				<div className="w-full rounded-lg border border-gray-700 bg-white px-10 py-4">
					<h1 className="text-xl font-semibold sm:text-2xl lg:text-3xl">
						{post.title}
					</h1>
					<p className="my-2 flex items-center justify-between">
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
						<span className="text-gray-500">
							{Intl.DateTimeFormat('en-US', {}).format(new Date(post.$createdAt))}
						</span>
					</p>
					<header className="my-4 w-full overflow-hidden border border-gray-500">
						{post.mediaType === 'image' && (
							<img
								src={post.mediaUrl}
								alt={post.title}
								className="h-full w-full border border-transparent"
								style={{
									borderTopLeftRadius: '0.5rem',
									borderTopRightRadius: '0.5rem'
								}}
							/>
						)}
						{post.mediaType === 'video' && <video src={post.mediaUrl} controls loop />}
					</header>
					<p className="mt-4 text-lg sm:text-xl lg:text-xl">{post.content}</p>
				</div>
			</main>
		</div>
	);
};

const route: RouteObject = {
	path: '/post/:id',
	element: <Post />,
	loader
};

export default route;
