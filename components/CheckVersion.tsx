import { Platform } from "react-native";
import checkVersion from "react-native-store-version";

export async function CheckVersion() {
  const pkg = require("@/app.json");
  let url_callback: string;
  const url_iOS = "https://apps.apple.com/us/app/mindfield-online/id1595137004";
  const url_android =
    "https://play.google.com/store/apps/details?id=com.mindfieldtech.mindfieldonline";

  switch (Platform.OS) {
    case "ios":
      url_callback = url_iOS;
      break;
    case "android":
      url_callback = url_android;
      break;
    default:
      url_callback = url_android;
      break;
  }

  try {
    const check = await checkVersion({
      version: pkg.expo.version ?? "1.2.2",
      iosStoreURL: url_iOS,
      androidStoreURL: url_android,
      country: "us",
    });

    if (check.result == "new") {
      return url_callback;
    }
    return false;
  } catch (e) {
    console.log(e);
  }
}
