import useGetUserInfo from "@hooks/query/useGetUserInfo";

export default function MyExp() {
  const { userInfo } = useGetUserInfo();
  const { totalExp: exp } = userInfo;

  return (
    <div className="flex flex-row gap-2 items-center justify-center ">
      <p className="min-w-max font-medium text-detail-1 mr-1 text-gray-700">
        지금까지 <span className="text-lime-600 text-body-2 font-bold">{exp}</span> 그린 포인트를
        모았어요!
      </p>
    </div>
  );
}
