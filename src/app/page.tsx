import ManageTodos from "./components/ManageTodos";
import UserMenu from "./components/UserMenu";

export default function Home() {
  return (
    <>
      <UserMenu />
      <ManageTodos />
    </>
  );
}
