import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div className="flex justify-center flex-col">
      <h1 className="text-6xl">Oops! Page Not Found</h1>
      <p>It seems we can't find the page you're looking for.</p>
      <p>But don't worry, you can always:</p>
      <ul>
        <li>Double-check the URL for typos.</li>
        <li>
          Head back to our
          <Link className="text-secondary-blue" href="/">
            homepage
          </Link>
          for more adventures.
        </li>
      </ul>
    </div>
  );
}
