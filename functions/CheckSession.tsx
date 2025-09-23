import AsyncStorage from "@react-native-async-storage/async-storage";
import { FetchAPI } from "./FetchAPI";

interface session {
  status: number;
  username: string;
}

export async function CheckSession() {
  //console.log("Checking login status...");
  const session: session[] = await FetchAPI("login_check");
  if (session[0].status) session[0].username ? AsyncStorage.setItem("@username", session[0].username) : null;
  return { status: session[0].status, username: session[0].username };
}
