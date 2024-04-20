'use client';
import Headline from '@/app/create-user-info/components/Headline';
import FixedBottomWrapper from '@/commons/components/FixedBottomWrapper';
import { Button } from '@/commons/components/ui/button';
import { useCarousel } from '@/app/create-user-info/hooks/useCarousel';
import { useCreateUserInfoContext } from '@/app/create-user-info/context/create-user-info-context';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/commons/components/ui/select';
import useRegisterUser from '@/app/create-user-info/api/mutations/useRegisterUser';
import { useRouter } from 'next/navigation';
import { PATHS } from '@/commons/constants/paths';

const SelectUserGenderAgeRange = () => {
  const { setValue, getValues } = useCreateUserInfoContext();
  const { push } = useRouter();
  const { mutateAsync } = useRegisterUser();

  const onSelectGender = (value: string) => {
    setValue('gender', value);
  };

  const onSelectAge = (value: string) => {
    setValue('age', Number(value));
  };

  const onSubmit = async () => {
    const values = getValues();
    const { data } = await mutateAsync({
      ...values,
      age: Number(values.age),
    });
    // TODO accessToken 저장 방식 변경 필요 혹은 token 관련 localStorage 로직 추상화
    localStorage.setItem('accessToken', data.accessToken);
    console.log('data', data.accessToken);
    push(PATHS.메인);
  };
  return (
    <div className="w-full">
      <Headline title={`정확한 확인을 위해\n신체정보를 입력해주세요`} />
      <div className="px-6">
        <Select onValueChange={onSelectGender}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="성별을 선택 해주세요" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>성별</SelectLabel>
              {/*// TODO 성별 Type Enum으로 변경*/}
              <SelectItem value="MALE">남자</SelectItem>
              <SelectItem value="FEMALE">여자</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="mb-10" />
        <Select onValueChange={onSelectAge}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="연령대를 선택 해주세요" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>성별</SelectLabel>
              <SelectItem value="18">18세 이하</SelectItem>
              <SelectItem value="29">19~29세</SelectItem>
              <SelectItem value="49">30~49세</SelectItem>
              <SelectItem value="64">50~64세</SelectItem>
              <SelectItem value="74">65~74세</SelectItem>
              <SelectItem value="75">75세 이상</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <FixedBottomWrapper>
        <Button className={`w-full`} onClick={onSubmit}>
          다음
        </Button>
      </FixedBottomWrapper>
    </div>
  );
};
export default SelectUserGenderAgeRange;
