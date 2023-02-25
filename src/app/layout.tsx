import type {  ReactNode } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
		default: 'QR Notify',
		template: 'QR Notify | %s',
	},
	description: 'Get notified when someone scans your QR code',
};

import '~/styles/globals.css'

export default function RootLayout(  { children}: {
	children: ReactNode;
} ) {
  return (
    <html>
			<body>
				<main  className="">
					{children}
				</main>
			</body>
		</html>
  );
}


