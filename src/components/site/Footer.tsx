export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <span>© {year} Hassan Ahmed</span>
      <span>built with too much coffee</span>
    </footer>
  );
}
