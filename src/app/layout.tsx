import Providers from "@/components/Providers";
import type { Metadata } from "next";
import '@aws-amplify/ui-react/styles.css';

export const metadata: Metadata = {
  title: "移譲の検証",
  description: "ソースコードの移譲の検証",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
