import AddBtn from "./components/AddBtn";
import { useAppSelector } from "../../hooks";
import CounterAutoIncrement from "./components/CounterAutoIncrement";
import CounterManualIncrement from "./components/CounterManualIncrement";

const IndexPage = () => {
  const counters = useAppSelector((state) => {
    return state.counters.ids.map((id) => {
      return {
        id,
        isAutoIncrement: state.counters.entities[id]?.isAutoIncrement,
      };
    });
  });

  return (
    <div>
      <AddBtn />
      {counters.map(({ id, isAutoIncrement }) => {
        if (isAutoIncrement) {
          return <CounterAutoIncrement id={id} key={id} />;
        }

        return <CounterManualIncrement id={id} key={id} />;
      })}
    </div>
  );
};

export default IndexPage;
