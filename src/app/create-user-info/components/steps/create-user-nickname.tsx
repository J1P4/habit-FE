'use client';
import Headline from '@/app/create-user-info/components/Headline';
import FixedBottomWrapper from '@/commons/components/FixedBottomWrapper';
import { Button } from '@/commons/components/ui/button';
import { useCarousel } from '@/app/create-user-info/hooks/useCarousel';
import { Input } from '@/commons/components/ui/input';
import { useState } from 'react';
import { useCreateUserInfoContext } from '@/app/create-user-info/context/create-user-info-context';

const CreateUserNickname = () => {
  const { setCarouselIndexNext } = useCarousel();
  // TODO validation 기획시 추가
  const [nickName, setNickName] = useState('');
  const { setValue } = useCreateUserInfoContext();
  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
  };
  const onClickNext = () => {
    setValue('nickname', nickName);
    setCarouselIndexNext();
  };
  return (
    <div className="w-full">
      <Headline title={`앞으로 사용할\n이름을 알려주세요`} />
      <div className="px-4">
        <Input type={`text`} placeholder={`닉네임을 입력해주세요`} onChange={onChangeName} />
      </div>
      <FixedBottomWrapper>
        <Button className={`w-full`} disabled={nickName.length === 0} onClick={onClickNext}>
          다음
        </Button>
      </FixedBottomWrapper>
    </div>
  );
};

export default CreateUserNickname;
