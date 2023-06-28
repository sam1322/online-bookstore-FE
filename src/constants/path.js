// export const baseUrl = "http://localhost:8080/";
// export const baseUrl = "https://df15-43-225-74-120.ngrok-free.app/";
export const baseUrl = "https://ee4f-43-225-74-120.ngrok-free.app/";
export const baseUrl_V1 = `${baseUrl}api/v1/`;

export const getTodoListURl = baseUrl_V1 + `todo`;
export const addTodoURl = baseUrl_V1 + `todo/add`;
export const updateTodoURl = baseUrl_V1 + `todo/update`;
export const deleteTodoURl = baseUrl_V1 + `todo/delete`;

export const chatUrl = baseUrl_V1 + `chat`;
