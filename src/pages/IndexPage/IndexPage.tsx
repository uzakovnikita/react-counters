import AddBtn from "./components/AddBtn";
import { useAppSelector } from "../../hooks";
import CounterAutoIncrement from "./components/CounterAutoIncrement";
import CounterManualIncrement from "./components/CounterManualIncrement";

const IndexPage = () => {
  const counters = useAppSelector((state) => {
    return state.counters.ids.map((id) => {
      return {
        id,
        autoIncrement: state.counters.entities[id]?.autoIncrement,
      };
    });
  });

  return (
    <>
      <AddBtn />
      {counters.map(({ id, autoIncrement }) => {
        if (autoIncrement) {
          return <CounterAutoIncrement id={id} key={id} />;
        }

        return <CounterManualIncrement id={id} key={id} />;
      })}
    </>
  );
};

export default IndexPage;
