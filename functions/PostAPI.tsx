export async function PostAPI(endpoint: string, data: FormData) {
  const URL = "https://mindfieldonline.com/user/api/" + endpoint;
  let response = await fetch(URL, {
    method: "POST",
    headers: {
      Accept: "multipart/form-data",
    },
    body: data,
  });

  if (response.ok) {
    return response.json();
  } else {
    throw new Error("HTTP Request Error: ");
  }
}
