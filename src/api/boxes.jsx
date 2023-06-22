const getAllBoxes = async () => {
  const response = await fetch("/api/boxes");
  if (response.status == 204) {
    return response;
  }
  return response.json();
};

const getAllPublicBoxes = async () => {
  const response = await fetch("/api/boxes/public");
  if (response.status == 204) {
    return response;
  }
  return response.json();
};

const getBox = async (boxId) => {
  const response = await fetch(`/api/boxes/${boxId}`);
  if (response.status == 204) {
    return response;
  }
  return response.json();
};

const getUserBoxes = async (userId) => {
  const response = await fetch(`/api/users/boxes/${userId}`);
  if (response.status == 204) {
    return response;
  }
  return response.json();
};

const createBox = async (newBox) => {
  const response = await fetch("/api/users/boxes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newBox),
  });
  return response.json();
};

const updateBox = async (updateBox) => {
  const response = await fetch("/api/users/boxes", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateBox),
  });
  return response.json();
};

const deleteBox = async (userId, boxId) => {
  const response = await fetch(
    `/api/users/boxes/delete?userId=${userId}&boxId=${boxId}`,
    {
      method: "PUT",
    }
  );
  return response.json();
};

export {
  getAllBoxes,
  getAllPublicBoxes,
  getBox,
  getUserBoxes,
  createBox,
  updateBox,
  deleteBox,
};
