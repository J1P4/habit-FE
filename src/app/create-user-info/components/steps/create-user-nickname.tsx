'use client';
import Headline from '@/app/create-user-info/components/Headline';
import FixedBottomWrapper from '@/commons/components/FixedBottomWrapper';
import { Button } from '@/commons/components/ui/button';
import { useCarousel } from '@/app/create-user-info/hooks/useCarousel';

const CreateUserNickname = () => {
  const { setCarouselIndexNext } = useCarousel();

  const onClickNext = () => {
    console.log('다음');
    setCarouselIndexNext();
  };
  return (
    <div className="w-full">
      <Headline title={`정확한 확인을 위해\n신체정보를 입력해주세요`} />
      <FixedBottomWrapper>
        <Button className={`w-full`} onClick={onClickNext}>
          다음
        </Button>
      </FixedBottomWrapper>
    </div>
  );
};

export default CreateUserNickname;
