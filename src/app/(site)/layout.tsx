import BlobCursor from "@/components/chrome/BlobCursor";

// Public-site shell. The blob cursor lives here (not in the root layout) so it
// never appears on the admin pages.
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BlobCursor />
      {children}
    </>
  );
}
