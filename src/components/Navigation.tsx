import Link from "next/link";

export default function Navigation() {
  return (
    <div>
      <nav>
        <Link href={"/"}>메인</Link>
        <Link href={"/upload"}>업로드</Link>
        <Link href={"/mypage"}>마이페이지</Link>
      </nav>
      <form action="/result">
        <input name="search" type="text" placeholder="키워드 검색" required />
        <input type="submit" />
      </form>
    </div>
  );
}
