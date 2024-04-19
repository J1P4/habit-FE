'use client';
import Headline from '@/app/create-user-info/components/Headline';
import FixedBottomWrapper from '@/commons/components/FixedBottomWrapper';
import { Button } from '@/commons/components/ui/button';
import { useCarousel } from '@/app/create-user-info/hooks/useCarousel';
import { Input } from '@/commons/components/ui/input';
import { useState } from 'react';
import { useCreateUserInfoContext } from '@/app/create-user-info/context/create-user-info-context';

const SetWeightHeight = () => {
  const { setCarouselIndexNext } = useCarousel();
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const { setValue, getValues } = useCreateUserInfoContext();
  // TODO validation 기획시 추가
  const onClickNext = () => {
    setValue('height', Number(height));
    setValue('weight', Number(weight));
    setCarouselIndexNext();
  };
  console.log(getValues());
  const onChangeHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(getValues());
    setHeight(e.target.value);
  };
  const onChangeWeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(e.target.value);
  };
  return (
    <div className="w-full">
      <Headline title={`정확한 확인을 위해\n신체정보를 입력해주세요`} />
      <div className="px-4">
        <Input type={`text`} placeholder={`키를 입력해주세요.`} onChange={onChangeHeight} />
        <div className="pb-4" />
        <Input type={`text`} placeholder={`몸무게를 입력해주세요.`} onChange={onChangeWeight} />
      </div>
      <FixedBottomWrapper>
        <Button className={`w-full`} disabled={!height || !weight} onClick={onClickNext}>
          다음
        </Button>
      </FixedBottomWrapper>
    </div>
  );
};
export default SetWeightHeight;
