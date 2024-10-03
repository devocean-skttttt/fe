import Link from 'next/link';

export default function Navigation() {
  return (
    <div>
      <form action="/result">
        <input name="search" type="text" placeholder="키워드 검색" required />
        <input type="submit" />
      </form>
    </div>
  );
}
