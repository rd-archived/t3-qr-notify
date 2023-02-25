import { getServerUserId } from "~/utils/auth";
import Signin from "./signin";

export default async function Home() {
	const userId = await getServerUserId();

  return (
    <div>
			{userId ? <h1>Logged in as {userId}</h1> : null}
			{!userId && <Signin />}
      
    </div>
  );
}


