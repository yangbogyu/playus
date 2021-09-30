import { useEffect } from "react";
import BottomTabs from "../components/main/BottomTabs";
import Header from "../components/main/Header";

function Home() {
  const me = localStorage.getItem("LOGIN");
  const seeRoom = async (me) => {
    const list = await fetch(`http://localhost:5000/seeRooms/${me}`).then(
      (res) => res.json()
    );
    console.log(list);
    return list;
  };

  useEffect((me) => {
    seeRoom();
  }, []);
  return (
    <div>
      <Header />
      <BottomTabs />
    </div>
  );
}
export default Home;
