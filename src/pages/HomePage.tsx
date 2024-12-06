import Diary from "@components/home/Diary";
import Graph from "@components/home/Graph";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-15 p-10">
      <Graph />
      <Diary />
    </div>
  );
}
