const BASE_URL = "http://localhost:3005";

async function getPaws() {
  try {
    const allPaws = await fetch(`${BASE_URL}/paws`);
    return allPaws.json();
  } catch (error) {
    console.log(error);
  }
}

async function postPaws(data, token) {
  // We dont send the email yet

  try {
    const newPaws = await fetch(`${BASE_URL}/paws`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return newPaws.json();
  } catch (error) {
    console.log(error);
  }
}

async function deletePaws(id) {
  await fetch(`${BASE_URL}/paws/${id}`, {
    method: "DELETE",
  });
}

const ApiService = {
  getPaws,
  postPaws,
  deletePaws,
};

export default ApiService;
