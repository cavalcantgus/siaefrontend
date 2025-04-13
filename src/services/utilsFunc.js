import axios from "@/services/axios.js";
const pendingUsers = [];

function getUser() {
  const data = JSON.parse(localStorage.getItem('user'))

  if (!data || !data.user || !data.user.id) {
    console.error("Usuário não encontrado no localStorage");
    return [];
  }

  return data
}

async function getNotificationsByUser() {
  const data = JSON.parse(localStorage.getItem("user"));
  
  if (!data || !data.user || !data.user.id) {
    console.error("Usuário não encontrado no localStorage");
    return [];
  }

  try {
    const response = await axios.get(`/public/notificacoes/${data.user.id}`);
    return response.data;  // Retorna os dados diretamente
  } catch (error) {
    console.error("Erro ao buscar notificações:", error);
    return []; // Retorna um array vazio em caso de erro
  }
}

function getRoleFromToken() {
  const token = localStorage.getItem("token");
  if (!token) {
    console.log("Token não encontrado");
    return null;
  }
  try {
    const base64payload = token.split(".")[1];
    if (!base64payload) {
      console.error("Formato inválido de token");
      return null;
    }

    const decodedPayload = atob(base64payload.replace(/-/g, "+").replace(/_/g, "/"));
    const payload = JSON.parse(decodedPayload);
    console.log("PAYLOAD", payload);
    return payload.role || "";
  } catch (error) {
    console.error("Erro ao decodificar o token:", error);
    return null;
  }
}

async function getUsers() {
  const response = await axios.get("public/users");
  console.log(response.data);
  return response.data;
}

async function getPendingUsers() {
  try {
    await axios
      .get("/admin/pending-users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        this.pendingUsers = response.data;
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  } catch (error) {
    console.log("Error: ", error);
  }

  return this.pendingUsers;
}

export default {
  getNotificationsByUser,
  getRoleFromToken,
  getUsers,
  getPendingUsers,
  getUser,
};
