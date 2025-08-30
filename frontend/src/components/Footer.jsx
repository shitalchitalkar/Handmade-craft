export default function Footer() {
  return (
    <footer className="bg-dark text-light py-3 mt-5">
      <div className="container d-flex justify-content-between">
        <div>© {new Date().getFullYear()} HandmadeCraft</div>
        <div>Contact: support@handmadecraft.local</div>
      </div>
    </footer>
  );
}