export default function(state = null, action) {
  switch (action.type) {
    case "Get_Info":
      // console.log(action, "action");
      return action.payload;
  }
  return state;
}
