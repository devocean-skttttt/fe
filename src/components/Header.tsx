function Header() {
  return (
    <div className="w-full h-[54px] flex justify-between items-center px-4">
      <div className="text-black text-[17px] font-['SF Pro'] leading-snug">
        Filter Recipe
      </div>
      <div className="flex gap-2">
        <div className="w-[25px] h-[13px] opacity-30 rounded border border-black" />
        <div className="w-[21px] h-[9px] bg-black rounded-sm" />
      </div>
    </div>
  );
};

export default Header;