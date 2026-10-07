import api from "@/lib/api";
export const getallMessage = async (roomId) => {
  try {
    const response = await api.get(`/chat/${roomId}`);

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
