'use client';

import { useState } from 'react';

function UploadPage() {
  const [beforeImage, setBeforeImage] = useState<File | null>(null);
  const [afterImage, setAfterImage] = useState<File | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleHashtagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const trimmedValue = inputValue.trim();
      if (
        trimmedValue &&
        !hashtags.includes(trimmedValue) &&
        hashtags.length < 5
      ) {
        setHashtags([...hashtags, trimmedValue]);
        setInputValue('');
      }
      e.preventDefault();
    }
  };

  const removeHashtag = (index: number) => {
    setHashtags(hashtags.filter((_, i) => i !== index));
  };
  const handleBeforeImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setBeforeImage(e.target.files[0]);
    }
  };

  const handleAfterImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAfterImage(e.target.files[0]);
    }
  };
  return (
    <div className="px-4">
      {/* Title Section */}
      <h1 className="text-black text-lg font-bold font-['Pretendard Variable'] text-center">
        나만의 보정법 등록하기
      </h1>

      {/* Title Input */}
      <div className="mb-6">
        <label
          className="block text-[#646262] text-[15px] font-bold mb-2"
          htmlFor="title"
        >
          제목
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full h-[50px] border-b border-[#c7c7c7] px-4 text-[15px] focus:outline-none focus:border-[#330218]"
          placeholder="제목을 입력해주세요"
        />
      </div>

      {/* Description Input */}
      <div className="mb-6">
        <label
          className="block text-[#646262] text-[15px] font-bold mb-2"
          htmlFor="description"
        >
          설명
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full h-[100px] border border-[#c7c7c7] px-4 text-[15px] focus:outline-none focus:border-[#330218]"
          placeholder="설명을 입력해주세요"
        />
      </div>

      {/* Hashtags Input */}
      <div className="mb-6">
        <label
          className="block text-[#646262] text-[15px] font-bold mb-2"
          htmlFor="hashtags"
        >
          해시태그
        </label>
        <input
          type="text"
          id="hashtags"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleHashtagKeyDown}
          className="w-full h-[50px] border-b border-[#c7c7c7] px-4 text-[15px] focus:outline-none focus:border-[#330218]"
          placeholder="해시태그를 입력해주세요 (최대 5개)"
        />
        {/* Display Hashtags */}
        {hashtags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {hashtags.map((hashtag, index) => (
              <div
                key={hashtag}
                className="bg-[#330218]/10 text-[#330218] px-3 py-1 rounded-full text-[13px] flex items-center"
              >
                #{hashtag}
                <button
                  onClick={() => removeHashtag(index)}
                  className="ml-2 text-[#330218] font-bold"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Image Upload Section */}
      <div className="mt-6 flex justify-between">
        <div className="text-[#646262] text-[15px] font-bold">보정 전 사진</div>
        <div className="text-[#646262] text-[15px] font-bold">보정 후 사진</div>
      </div>
      <div className="mt-2 flex justify-between">
        {/* Before Image Upload */}
        <div className="relative w-[151px] h-[154px] bg-[#d9d9d9] rounded-[10px] shadow flex items-center justify-center">
          {beforeImage ? (
            <img
              src={URL.createObjectURL(beforeImage)}
              alt="Before"
              className="w-full h-full object-cover rounded-[10px]"
            />
          ) : (
            <label className="text-center cursor-pointer">
              <span className="text-[#646262]">이미지 업로드</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleBeforeImageUpload}
              />
            </label>
          )}
        </div>

        {/* After Image Upload */}
        <div className="relative w-[151px] h-[154px] bg-[#d9d9d9] rounded-[10px] shadow flex items-center justify-center">
          {afterImage ? (
            <img
              src={URL.createObjectURL(afterImage)}
              alt="After"
              className="w-full h-full object-cover rounded-[10px]"
            />
          ) : (
            <label className="text-center cursor-pointer">
              <span className="text-[#646262]">이미지 업로드</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAfterImageUpload}
              />
            </label>
          )}
        </div>
      </div>

      {/* Adjustment Sliders (UI placeholders) */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        {/* Example of a slider placeholder */}
        <div className="flex flex-col items-center">
          <label
            htmlFor="exposure"
            className="text-[#646262] text-sm font-semibold"
          >
            노출
          </label>
          <div className="w-[60px] h-[26.83px] bg-white border border-[#d9d9d9] rounded-[5px] shadow"></div>
        </div>
        {/* Repeat similar slider controls for other adjustments */}
      </div>

      {/* Submit Button */}
      <div className="flex justify-center mt-6">
        <button
          type="submit"
          className="px-6 py-2 bg-[#330218] text-white rounded-lg font-bold"
        >
          제출하기
        </button>
      </div>
    </div>
  );
}

export default UploadPage;
