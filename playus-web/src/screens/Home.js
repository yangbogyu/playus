import { logUserout } from "../apollo";

function Home() {
  return (
    <div>
      <h1>Home</h1>

      <button onClick={() => logUserout()}>Log out now!</button>
    </div>
  );
}

export default Home;
