import "../globals.css";
import { LandingHeader } from "@/components/layout/headers/landing-header";
import { BaseLayout } from "@/components/layout/base-layout";
import { generateCustomMetadata } from "@/components/seo/metadata"

export const metadata = generateCustomMetadata("Changelog")

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const renderHeader = () => {
    return (
      <LandingHeader hasLogo />
    )
  }

  return (
    <BaseLayout Header={renderHeader} overflowHidden={false}>
      {children}
    </BaseLayout>
  );
}
