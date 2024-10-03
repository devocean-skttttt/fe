'use client';
import React, { useState } from 'react';

function useUploadPageState() {
  const [beforeImage, setBeforeImage] = useState<File | null>(null);
  const [afterImage, setAfterImage] = useState<File | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return {
    beforeImage,
    setBeforeImage,
    afterImage,
    setAfterImage,
    inputValue,
    setInputValue,
    hashtags,
    setHashtags,
    title,
    setTitle,
    description,
    setDescription,
    isComposing,
    setIsComposing,
    error,
    setError,
  };
}

function handleHashtagKeyDown(
  e: React.KeyboardEvent<HTMLInputElement>,
  inputValue: string,
  isComposing: boolean,
  hashtags: string[],
  setHashtags: React.Dispatch<React.SetStateAction<string[]>>,
  setInputValue: React.Dispatch<React.SetStateAction<string>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>
) {
  const MAX_HASHTAG_LENGTH = 20;
  if (e.key === 'Enter' && !isComposing) {
    const trimmedValue = inputValue.trim();
    if (trimmedValue.length > MAX_HASHTAG_LENGTH) {
      setError(`해시태그는 최대 ${MAX_HASHTAG_LENGTH}자까지 입력 가능합니다.`);
    } else if (
      trimmedValue &&
      !hashtags.includes(trimmedValue) &&
      hashtags.length < 5
    ) {
      setHashtags([...hashtags, trimmedValue]);
      setInputValue('');
      setError(null);
    }
    e.preventDefault();
  }
}

function handleImageUpload(
  e: React.ChangeEvent<HTMLInputElement>,
  setImage: React.Dispatch<React.SetStateAction<File | null>>
) {
  if (e.target.files && e.target.files.length > 0) {
    setImage(e.target.files[0]);
  }
}

function handleSubmit(
  e: React.FormEvent<HTMLFormElement>,
  title: string,
  description: string,
  hashtags: string[],
  beforeImage: File | null,
  afterImage: File | null
) {
  e.preventDefault();

  const formData = new FormData();
  formData.append('title', title);
  formData.append('description', description);
  formData.append('hashtags', hashtags.join(','));
  formData.append('beforeImage', beforeImage as Blob);
  formData.append('afterImage', afterImage as Blob);

  console.log(
    'Form data:',
    formData.get('title'),
    formData.get('description'),
    formData.get('hashtags'),
    formData.get('beforeImage'),
    formData.get('afterImage')
  );
}

function ImageUpload({
  image,
  onImageUpload,
  label,
}: {
  image: File | null;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}) {
  return (
    <div className="relative w-[151px] h-[154px] bg-[#d9d9d9] rounded-[10px] shadow flex items-center justify-center">
      {image ? (
        <img
          src={URL.createObjectURL(image)}
          alt={label}
          className="w-full h-full object-cover rounded-[10px]"
        />
      ) : (
        <label className="text-center cursor-pointer">
          <span className="text-[#646262]">이미지 업로드</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onImageUpload}
          />
        </label>
      )}
    </div>
  );
}

function UploadPage() {
  const {
    beforeImage,
    setBeforeImage,
    afterImage,
    setAfterImage,
    inputValue,
    setInputValue,
    hashtags,
    setHashtags,
    title,
    setTitle,
    description,
    setDescription,
    isComposing,
    setIsComposing,
    error,
    setError,
  } = useUploadPageState();

  return (
    <div className="px-6 mt-6">
      <h1 className="text-black text-lg font-bold font-['Pretendard Variable'] text-center">
        나만의 보정법 등록하기
      </h1>

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
          onKeyDown={(e) =>
            handleHashtagKeyDown(
              e,
              inputValue,
              isComposing,
              hashtags,
              setHashtags,
              setInputValue,
              setError
            )
          }
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          className="w-full h-[50px] border-b border-[#c7c7c7] px-4 text-[15px] focus:outline-none focus:border-[#330218]"
          placeholder="해시태그를 입력해주세요 (최대 5개)"
        />
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        {hashtags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {hashtags.map((hashtag, index) => (
              <div
                key={hashtag}
                className="bg-[#330218]/10 text-[#330218] px-3 py-1 rounded-full text-[13px] flex items-center"
              >
                #{hashtag}
                <button
                  onClick={() =>
                    setHashtags(hashtags.filter((_, i) => i !== index))
                  }
                  className="ml-2 text-[#330218] font-bold"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mb-6">
        <label className="block text-[#646262] text-[15px] font-bold mb-2">
          사진 업로드
        </label>

        <div className="mt-2 flex justify-around">
          <div className="text-[#646262] text-[15px] font-bold">
            보정 전 사진
          </div>
          <div className="text-[#646262] text-[15px] font-bold">
            보정 후 사진
          </div>
        </div>
        <div className="mt-2 flex justify-around">
          <ImageUpload
            image={beforeImage}
            onImageUpload={(e) => handleImageUpload(e, setBeforeImage)}
            label="Before"
          />
          <ImageUpload
            image={afterImage}
            onImageUpload={(e) => handleImageUpload(e, setAfterImage)}
            label="After"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-[#646262] text-[15px] font-bold mb-2">
          보정 레시피
        </label>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          {[
            { name: '노출', min: -100, max: 100 },
            { name: '휘도', min: -100, max: 100 },
            { name: '하이라이트', min: -100, max: 100 },
            { name: '그림자', min: -100, max: 100 },
            { name: '대비', min: -100, max: 100 },
            { name: '밝기', min: -100, max: 100 },
            { name: '블랙포인트', min: -100, max: 100 },
            { name: '채도', min: -100, max: 100 },
            { name: '색 선명도', min: 0, max: 100 },
            { name: '따뜻함', min: -100, max: 100 },
            { name: '색조', min: -100, max: 100 },
            { name: '선명도', min: 0, max: 100 },
            { name: '명료도', min: 0, max: 100 },
            { name: '노이즈감소', min: 0, max: 100 },
            { name: '비네트', min: -100, max: 100 },
          ].map((item, index) => (
            <div
              key={index}
              data-index={index}
              className="flex flex-col items-center"
            >
              <label className="text-[#646262] text-sm font-semibold">
                {item.name}
              </label>
              <input
                type="number"
                min={item.min}
                max={item.max}
                className="w-[60px] h-[26.83px] bg-white border border-[#d9d9d9] rounded-[5px] shadow text-center"
                defaultValue={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault(); // 폼 제출 방지
                    const inputs = Array.from(
                      document.querySelectorAll('input')
                    );
                    const index = inputs.indexOf(e.target as HTMLInputElement);
                    if (index > -1 && index < inputs.length - 1) {
                      inputs[index + 1].focus();
                    } else {
                      alert('마지막 입력 필드입니다.');
                    }
                  }
                }}
                onChange={(e) => {
                  const value = e.target.value;
                  if (
                    value !== '' &&
                    (isNaN(Number(value)) || Number(value) < item.min)
                  ) {
                    e.target.value = item.min.toString();
                  } else if (Number(value) > item.max) {
                    e.target.value = item.max.toString();
                  }
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <button
          type="submit"
          className="px-6 py-2 bg-[#330218] text-white rounded-lg font-bold"
          onClick={(e) =>
            handleSubmit(
              e as unknown as React.FormEvent<HTMLFormElement>,
              title,
              description,
              hashtags,
              beforeImage,
              afterImage
            )
          }
        >
          제출하기
        </button>
      </div>
    </div>
  );
}

export default UploadPage;
