$(() => {
  $("input").keyup(() => {
    let empty = false;
    for (let input of $("input")) {
      if (input.value === "") {
        empty = true;
      }
      if (!empty) {
        $("#login-btn").removeAttr("disabled");
        $("#login-btn").addClass("enabled");
      } else {
        $("#login-btn").attr("disabled", "");
        $("#login-btn").removeClass("enabled");
      }
    }
  });
});
