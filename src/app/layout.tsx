import type { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "QR Notify",
    template: "QR Notify | %s",
  },
  description: "Get notified when someone scans your QR code",
};

import "~/styles/globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html className="bg-base-300">
      <body>
        <main className="p-10">{children}</main>
      </body>
    </html>
  );
}
