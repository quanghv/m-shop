var data = {};
export default function(state = data, action) {
  switch (action.type) {
    case "Get_List":
      //   console.log(action);
      data = action.payload;
      return data;
    case "Error":
      return action.payload;
  }
  return data;
}
