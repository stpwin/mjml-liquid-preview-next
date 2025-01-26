import "../globals.css";
import { EditorHeader } from "@/components/layout/headers/editor-header";
import { BaseLayout } from "@/components/layout/base-layout";

export { metadata } from "@/components/seo/metadata"

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
