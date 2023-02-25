import type {  ReactNode } from "react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
		default: 'QR Notify',
		template: 'QR Notify | %s',
	},
	description: 'Get notified when someone scans your QR code',
};

export default function RootLayout(  { children}: {
	children: ReactNode;
} ) {
  return (
    <html>
			<body className="xxx">
				<main  className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
					{children}
				</main>
			</body>
		</html>
  );
}


