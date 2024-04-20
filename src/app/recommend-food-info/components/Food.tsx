import Link from 'next/link';

const FoodComponent = ({ food }) => {
  return (
    <div className="flex items-center bg-gray-100 mx-10 my-3 p-5 rounded-lg">
      <div className="flex-shrink-0 mr-4">
        <img
          className="w-20 h-20 object-cover rounded-lg"
          src="https://via.placeholder.com/150"
          alt="Food"
        />
      </div>
      <div className="flex flex-col flex-grow">
        <p className="text-sm text-[#6CB663]">350kcal</p>
        <h4 className="text-lg font-semibold">{food}</h4>
        <p className="text-sm text-gray-600">음식 주요 성분</p>
        <Link href="/restaurant-info">
          <button>추천 식당 보기</button>
        </Link>
      </div>
    </div>
  );
};

export default FoodComponent;