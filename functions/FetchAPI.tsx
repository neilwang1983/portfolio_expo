export async function FetchAPI(endpoint: string) {
  const URL = "https://mindfieldonline.com/user/api/" + endpoint;
  let response = await fetch(URL);

  if (response.ok) {
    return response.json();
  } else {
    throw new Error("HTTP Request Error: ");
  }
}
