function Header() {
  return (
    <>
      <div className="fixed top-0 w-full max-w-mobile h-[54px] flex justify-between items-center px-4 bg-white">
        <div className="text-black text-[17px] font-['SF Pro'] leading-snug">
          Filter Recipe
        </div>
        <div className="flex gap-2">
          <div className="w-[25px] h-[13px] opacity-30 rounded border border-black" />
          <div className="w-[21px] h-[9px] bg-black rounded-sm" />
        </div>
      </div>
      <div className="h-[54px]" />
    </>
  );
}

export default Header;
