import {
	ClerkProvider,
	SignedIn,
	SignedOut,
	RedirectToSignIn,
	SignIn,
} from '@clerk/nextjs';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import '../styles/globals.css';
import { dark, neobrutalism } from '@clerk/themes';

//  List pages you want to be publicly accessible, or leave empty if
//  every page requires authentication. Use this naming strategy:
//   "/"              for pages/index.js
//   "/foo"           for pages/foo/index.js
//   "/foo/bar"       for pages/foo/bar.js
//   "/foo/[...bar]"  for pages/foo/[...bar].js
const publicPages: Array<string> = [];

function MyApp({ Component, pageProps }: AppProps) {
	// Get the pathname
	const { pathname } = useRouter();

	// Check if the current route matches a public page
	const isPublicPage = publicPages.includes(pathname);

	// If the current route is listed as public, render it directly
	// Otherwise, use Clerk to require authentication
	return (
		<ClerkProvider
			appearance={{
				baseTheme: neobrutalism,
			}}
			{...pageProps}
		>
			{isPublicPage ? (
				<Component {...pageProps} />
			) : (
				<>
					<SignedIn>
						<Component {...pageProps} />
					</SignedIn>
					<SignedOut>
						<div className='h-screen flex justify-center items-center bg-[#151515]'>
							<SignIn />
						</div>
					</SignedOut>
				</>
			)}
		</ClerkProvider>
	);
}

export default MyApp;
