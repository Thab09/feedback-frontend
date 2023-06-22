const getBoxFeedbacks = async (boxId) => {
  const response = await fetch(`/api/feedbacks${boxId}`);
  if (response.status == 204) {
    return response;
  }
  return response.json();
};

const createGuestFeedback = async (newFeedback) => {
  const response = await fetch("/api/feedbacks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newFeedback),
  });
  return response.json();
};

const getUserFeedbacks = async (userId) => {
  const response = await fetch(`/api/users/feedbacks/${userId}`);
  if (response.status == 204) {
    return response;
  }
  return response.json();
};

const createUserFeedback = async (newFeedback) => {
  const response = await fetch("/api/users/feedbacks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newFeedback),
  });
  return response.json();
};

const updateUserFeedback = async (updateFeedback) => {
  const response = await fetch("/api/users/feedbacks", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateFeedback),
  });
  return response.json();
};

const deleteUserFeedback = async (userId, feedbackId) => {
  const response = await fetch(
    `/api/users/feedbacks/?userId=${userId}&feedbackId=${feedbackId}`,
    {
      method: "DELETE",
    }
  );
  if (response.status == 204) {
    return response;
  }
  return response.json();
};

export {
  getBoxFeedbacks,
  createGuestFeedback,
  getUserFeedbacks,
  createUserFeedback,
  updateUserFeedback,
  deleteUserFeedback,
};
