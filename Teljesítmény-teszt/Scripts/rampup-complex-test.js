//add resource kérésnél, a post-response scripthez:
let responsedata =pm.response.json();
let id=responsedata.id;
pm.environment.set("komplextestResId",id);

//add DataSet első kérésnél a pre-request scripthez:
let resid=pm.environment.get("komplextestResId");
pm.environment.set("resourceId",resid);