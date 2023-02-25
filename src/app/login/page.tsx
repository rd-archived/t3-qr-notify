import { getServerUserId } from "~/utils/auth";

export default async function LoginPage() {
	const userId = await getServerUserId();
  

  return (
    <div>
			Login
      
    </div>
  );
}

