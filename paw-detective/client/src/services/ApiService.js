const BASE_URL = "http://localhost:3005";

async function getPaws() {
  try {
    const allPaws = await fetch(`${BASE_URL}/paws`);
    return await allPaws.json();
  } catch (error) {
    console.log(error);
  }
}

async function postPaws(body) {
  const {
    email,
    token,
    lostOrFound,
    picture,
    animal,
    description,
    location,
    lat,
    long,
  } = body;

  const pet = {
    lostOrFound,
    picture,
    animal,
    description,
    location,
    lat,
    long,
    email,
  };

  try {
    const newPaws = await fetch(`${BASE_URL}/paws`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pet),
    });
    return await newPaws.json();
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
