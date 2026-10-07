import api from "@/lib/api";

export const getmeetingParticipant = async (roomId) => {
  const response = await api.get(`/meeting/participants/${roomId}`);
  return response.data;
};
