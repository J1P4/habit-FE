
const RestaurantComponent = () => {
  return (
    <div className=" mx-10 my-5 bg-gray-100 p-0 rounded-lg">
      <div className="mt-4 h-full">
        <img
          src="사진 URL"
          alt="식당 사진"
          className="h-227 rounded-lg"
        />
        <div className="bg-gray-300 rounded-t-none rounded-b-lg flex-1 p-4 m-0">
          <h3 className="leading-extra-loose text-base font-semibold">식당 이름</h3>
          <p className="leading-extra-loose text-xs font-semibold text-gray-600">서울특별시 강남구 식당로 123</p>
          <p className="leading-extra-loose  text-xs text-gray-600"> 추천 메뉴 </p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantComponent;