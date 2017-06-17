var data = {};
export default function(state = data, action) {
  switch (action.type) {
    case "Get_List":
      //   console.log(action);
      data = action.payload;
      return data;
  }
  return data;
}
