import "../globals.css";
import { EditorHeader } from "@/components/layout/headers/editor-header";
import { BaseLayout } from "@/components/layout/base-layout";
import { generateCustomMetadata } from "@/components/seo/metadata"

export const metadata = generateCustomMetadata("Editor")

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <BaseLayout Header={EditorHeader}>
      {children}
    </BaseLayout>
  );
}
