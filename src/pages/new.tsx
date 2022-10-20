import { FC, useEffect, useRef, useState } from 'react';
import {
	ActionFunction,
	Form,
	RouteObject,
	useActionData,
	useNavigate
} from 'react-router-dom';
import RequireAuth from '@components/RequireAuth';
import Input from '@components/Input';
import Textarea from '@components/Textarea';
import appwrite from '@lib/appwrite';
import { Models } from 'appwrite';

const action: ActionFunction = async ({ request }) => {
	const fd = await request.formData();

	const title = (typeof fd.get('title') === 'string' ? fd.get('title') : '') as string;
	const content = (
		typeof fd.get('content') === 'string' ? fd.get('content') : ''
	) as string;
	const file = (fd.get('file') || null) as File | null;

	try {
		const postId = crypto.randomUUID();
		let media: Models.File | null = null;
		const user = await appwrite.account.get();
		if (file?.name) {
			media = await appwrite.storage.createFile('postmedia', postId, file, [
				appwrite.Permission.read(appwrite.Role.any()),
				appwrite.Permission.write(appwrite.Role.user(user.$id)),
				appwrite.Permission.update(appwrite.Role.user(user.$id)),
				appwrite.Permission.delete(appwrite.Role.user(user.$id))
			]);
		}
		await appwrite.db.createDocument(
			'instantgram',
			'posts',
			postId,
			{
				title: title.trim(),
				content: content.trim(),
				mediaType: file?.type?.startsWith('image')
					? 'image'
					: file?.type?.startsWith('video')
					? 'video'
					: 'none',
				mediaUrl: media
					? appwrite.storage.getFileDownload(media.bucketId, media.$id)
					: null,
				userId: user.$id
			},
			[
				appwrite.Permission.read(appwrite.Role.any()),
				appwrite.Permission.write(appwrite.Role.user(user.$id)),
				appwrite.Permission.update(appwrite.Role.user(user.$id)),
				appwrite.Permission.delete(appwrite.Role.user(user.$id))
			]
		);

		return { postId };
	} catch (e) {
		return { error: (e as any).message };
	}
};

const New: FC = () => {
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();
	const fileInput = useRef<HTMLInputElement>(null);
	const [fileButtonText, setFileButtonText] = useState('Select a file');
	const actionData = useActionData() as any;

	useEffect(() => {
		if (actionData?.error) {
			setError(actionData.error);
		}

		if (actionData?.postId) {
			navigate(`/post/${actionData.postId}`);
		}
	}, [actionData]);

	return (
		<>
			<div className="min-h-[100vh] bg-gray-100">
				<main className="flex flex-col items-center justify-center gap-2 pt-16 md:gap-4 md:pt-24 lg:pt-36">
					<h1 className="text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
						Create a new post
					</h1>
					<Form
						method="post"
						className="mt-8 flex flex-col rounded-lg border border-teal-600 bg-white px-4 py-4 text-lg shadow-md md:px-9 md:py-5"
						replace
						encType="multipart/form-data"
					>
						{error && (
							<div className="my-4 rounded-lg border border-red-500 bg-red-300 px-4 py-2 text-red-700">
								{error}
							</div>
						)}
						<div className="grid gap-y-4" style={{ gridTemplateColumns: '1fr 2fr' }}>
							<Input
								label="Title"
								placeholder="Post title"
								name="title"
								id="title"
								type="text"
								minLength={4}
								maxLength={128}
							/>
							<Textarea
								label="Content"
								placeholder="Post text. You can use some markdown features here."
								name="content"
								id="content"
								minLength={4}
								maxLength={4096}
								rows={4}
							/>
							<span className="mr-4 font-bold text-gray-700 md:mr-6 lg:mr-10">
								Image / Video
							</span>
							<div className="flex items-center gap-2">
								<button
									type="button"
									onClick={() => fileInput.current?.click()}
									className={`w-full cursor-pointer rounded-lg px-4 py-2 font-mono ${
										fileButtonText !== 'Select a file'
											? 'bg-green-600 text-white hover:bg-green-500'
											: 'bg-gray-300 text-black hover:bg-gray-200'
									}`}
								>
									{fileButtonText}
								</button>
								{fileButtonText !== 'Select a file' && (
									<button
										type="button"
										onClick={() => {
											if (fileInput.current?.files) {
												const dt = new DataTransfer();
												fileInput.current.files = dt.files;
											}
											setFileButtonText('Select a file');
										}}
										className="cursor-pointer rounded-lg bg-red-500 px-4 py-2 font-mono text-white hover:bg-red-400"
									>
										Remove
									</button>
								)}
							</div>
							<input
								type="file"
								className="hidden"
								onChange={() => {
									setFileButtonText(
										fileInput.current?.files?.length
											? fileInput.current.files[0].name
											: 'Select file'
									);
								}}
								ref={fileInput}
								accept="image/png,image/jpeg,image/svg,image/gif,.mp4,.webm"
								name="file"
							/>
						</div>
						<div className="mt-4 flex w-full items-center justify-between">
							<button
								type="button"
								onClick={() => navigate(-1)}
								className="cursor-pointer font-mono text-teal-600 hover:text-teal-500"
							>
								Go back
							</button>
							<button className="cursor-pointer rounded-lg bg-teal-600 px-4 py-2 font-mono text-white hover:bg-teal-500">
								Create post
							</button>
						</div>
					</Form>
				</main>
			</div>
		</>
	);
};

const routes: RouteObject = {
	path: '/new',
	element: (
		<RequireAuth>
			<New />
		</RequireAuth>
	),
	action
};

export default routes;
