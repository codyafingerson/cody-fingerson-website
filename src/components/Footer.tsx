export function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-800 p-6 text-center sticky bottom-0">
      <p className="text-slate-800 dark:text-white">
        &copy; {new Date().getFullYear()} Cody Fingerson. All rights reserved.
      </p>
    </footer>
  );
}
