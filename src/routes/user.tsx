import { Form } from "@/components/form";
import { useAuth } from "@/hooks/useAuth";
import { UserInfo } from "@/components/userInfo";

export function UserPage() {
  const { user } = useAuth();

  return (
    <div className="flex-1 min-h-screen pb-32">
      {user.name !== "guest" ? <UserInfo /> : <Form />}
    </div>
  );
}
